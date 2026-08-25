import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface SolarScrollytellingProps {
  totalFrames?: number;
  imageFolderPath?: string;
  imagePrefix?: string;
  imageExtension?: string;
  logoSrc?: string;
}

export default function SolarScrollytelling({
  totalFrames = 50,
  imageFolderPath = "/Panel Animation-2",
  imagePrefix = "ezgif-frame-",
  imageExtension = "webp",
  logoSrc = "/brandLogo.png",
}: SolarScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for zero-latency frame access in 60fps loop
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [frameCount, setFrameCount] = useState(totalFrames);

  // Smooth LERP frame scrubber references
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  // 1. Scroll-linked tracking via Framer Motion (220vh track)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Snappy fade out for Hero text, logo card, and "SCROLL TO EXPLORE" during initial scroll (0% to 20%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 0.5, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.20], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 0.20], [0, -30]);
  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.10], [1, 0]);

  // Map scroll progress (0 -> 1) dynamically across all detected frames
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(latest * frameCount))
    );
    targetFrameRef.current = rawIndex;
  });

  // 2. Instant First-Frame Loading + Progressive Background Streaming for Remaining Frames
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    const padZero = (num: number, size = 3) => {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };

    let globUrls: string[] = [];
    try {
      // @ts-ignore
      const globFiles = import.meta.glob("/src/assets/Panel Animation-2/*.webp", {
        eager: true,
        import: "default",
      });
      globUrls = Object.keys(globFiles)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
        .map((key) => globFiles[key] as string);
    } catch {
      globUrls = [];
    }

    const activeCount = globUrls.length > 0 ? globUrls.length : totalFrames;
    setFrameCount(activeCount);

    const loadSingleFrame = (i: number) => {
      const img = new Image();
      const frameString = padZero(i);
      const frameIndex = i - 1;

      if (globUrls.length > 0 && globUrls[frameIndex]) {
        img.src = globUrls[frameIndex];
      } else {
        img.src = `${imageFolderPath}/${imagePrefix}${frameString}.${imageExtension}`;
      }

      img.onload = async () => {
        if (!isMounted) return;
        try {
          if (img.decode) {
            await img.decode();
          }
        } catch {
          // Fallback
        }

        // Store directly into imagesRef for instantaneous 60fps availability
        imagesRef.current[frameIndex] = img;
        loadedCount++;

        // Trigger immediate hero display as soon as Frame 1 is ready
        if (frameIndex === 0) {
          setFirstFrameLoaded(true);
        }

        setLoadProgress(Math.round((loadedCount / activeCount) * 100));
      };

      img.onerror = () => {
        if (!isMounted) return;
        // Fallback to public folder path
        const altSrc = `/Panel Animation-2/${imagePrefix}${frameString}.${imageExtension}`;
        const retryImg = new Image();
        retryImg.src = altSrc;
        retryImg.onload = async () => {
          if (!isMounted) return;
          try {
            if (retryImg.decode) await retryImg.decode();
          } catch {}
          imagesRef.current[frameIndex] = retryImg;
          if (frameIndex === 0) {
            setFirstFrameLoaded(true);
          }
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / activeCount) * 100));
        };
      };
    };

    // Load Frame 1 first for immediate paint
    loadSingleFrame(1);

    // Load remaining frames in parallel
    for (let i = 2; i <= activeCount; i++) {
      loadSingleFrame(i);
    }

    return () => {
      isMounted = false;
    };
  }, [totalFrames, imageFolderPath, imagePrefix, imageExtension]);

  // 3. Instant First-Paint + Snappy 60/120fps Full-Bleed Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // Real-time scroll progress fallback to guarantee immediate sync
      const progress = scrollYProgress.get();
      const currentTarget = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(progress * frameCount))
      );
      targetFrameRef.current = currentTarget;

      // Snappy physics damping (LERP factor 0.30 for instant snappy response)
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.30;

      const activeIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      const targetWidth = Math.round(displayWidth * dpr);
      const targetHeight = Math.round(displayHeight * dpr);

      const sizeChanged = canvas.width !== targetWidth || canvas.height !== targetHeight;
      if (sizeChanged && targetWidth > 0 && targetHeight > 0) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      // Read from imagesRef (always up-to-date across all 50 frames without React state delay)
      const allImgs = imagesRef.current;
      let currentImg = allImgs[activeIndex];

      // If active frame isn't loaded yet, find closest loaded frame
      if (!currentImg || !currentImg.complete || currentImg.naturalWidth === 0) {
        for (let offset = 1; offset < frameCount; offset++) {
          const prev = allImgs[activeIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            currentImg = prev;
            break;
          }
          const next = allImgs[activeIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            currentImg = next;
            break;
          }
        }
      }

      // Ultimate fallback to frame 0
      if (!currentImg || !currentImg.complete || currentImg.naturalWidth === 0) {
        currentImg = allImgs[0];
      }

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        // Redraw when frame changes or on resize or on first mount
        if (sizeChanged || lastDrawnFrameRef.current !== activeIndex || lastDrawnFrameRef.current === -1) {
          lastDrawnFrameRef.current = activeIndex;

          ctx.save();
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          const imgRatio = currentImg.naturalWidth / currentImg.naturalHeight;
          const canvasRatio = displayWidth / displayHeight;

          let drawWidth: number;
          let drawHeight: number;
          let offsetX: number;
          let offsetY: number;

          if (imgRatio > canvasRatio) {
            drawHeight = displayHeight;
            drawWidth = drawHeight * imgRatio;
            offsetX = (displayWidth - drawWidth) / 2;
            offsetY = 0;
          } else {
            drawWidth = displayWidth;
            drawHeight = drawWidth / imgRatio;
            offsetX = 0;
            offsetY = (displayHeight - drawHeight) / 2;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          ctx.drawImage(
            currentImg,
            offsetX,
            offsetY,
            drawWidth,
            drawHeight
          );

          ctx.restore();
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [frameCount, scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh] select-none"
    >
      {/* 1. Preloader */}
      <AnimatePresence>
        {!firstFrameLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0d11] text-white"
          >
            <div className="relative flex flex-col items-center">
              <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#22c55e] border-b-transparent border-l-transparent"
                />
                <Zap className="w-8 h-8 text-[#22c55e] animate-pulse" />
              </div>

              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                SAHAJA SOLAR
              </span>
              <h2 className="text-2xl font-light tracking-tight text-white/95 mb-4 font-mono">
                {loadProgress}%
              </h2>

              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#22c55e]"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Sticky Fullscreen Viewport (100% Single Frame Edge-to-Edge) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* The Full-Bleed Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block relative z-0 filter contrast-[105%] brightness-[101%] saturate-[106%]"
        />

        {/* 3. Hero Text & Logo Overlay (Fades out smoothly on scroll) */}
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
          className="pointer-events-none absolute inset-0 z-20 flex min-h-screen w-full items-center"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col justify-between px-6 sm:px-12 md:flex-row md:items-center md:gap-10">
            
            {/* HERO TEXT (Clean, unblocked layout) */}
            <div className="pt-[88px] sm:pt-[95px] md:pt-0">
              
              {/* Mobile Only: Sleek Branded Badge at top so the animation below is 100% unobstructed */}
              <div className="md:hidden inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.12] border border-white/20 backdrop-blur-md mb-3.5 shadow-lg">
                <img
                  src={logoSrc}
                  alt="Sahaja Solar"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-xs font-bold text-white tracking-wider">
                  SAHAJA <span className="text-[#22c55e]">SOLAR</span>
                </span>
              </div>

              <h1 className="text-[36px] font-bold leading-[1.05] tracking-tight text-white sm:text-[44px] md:text-6xl lg:text-7xl drop-shadow-md">
                Use solar for a{" "}
                <span className="text-[#22c55e]">
                  Better future
                </span>
              </h1>

              <p className="mt-4 max-w-[440px] text-[14px] leading-[1.6] text-gray-200 sm:text-base md:text-lg drop-shadow">
                Transform your energy consumption with sustainable solar solutions.
                Save money while contributing to a cleaner, greener planet.
              </p>
            </div>

            {/* DESKTOP ONLY: Premium Frosted Glass Logo Card on the Right (Hidden on mobile so it never mixes/overlaps with the animation) */}
            <div className="hidden md:flex relative z-20 justify-end">
              <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/[0.10] p-10 shadow-2xl backdrop-blur-md">
                <div className="flex h-[300px] items-center justify-center">
                  <img
                    src={logoSrc}
                    alt="Sahaja Solar"
                    draggable={false}
                    className="block max-h-full max-w-[88%] object-contain"
                  />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 4. SCROLL TO EXPLORE Indicator */}
        <motion.div
          style={{ opacity: scrollTextOpacity }}
          className="pointer-events-none absolute bottom-5 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.28em] text-white/65 sm:bottom-6 sm:text-xs"
        >
          SCROLL TO EXPLORE
        </motion.div>
      </div>
    </div>
  );
}
