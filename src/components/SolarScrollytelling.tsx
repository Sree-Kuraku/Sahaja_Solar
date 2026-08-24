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
  totalFrames = 40,
  imageFolderPath = "/Panel Animation-1",
  imagePrefix = "ezgif-frame-",
  imageExtension = "png",
  logoSrc = "/brandLogo.png",
}: SolarScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sequence and Preloader States
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [firstFrame, setFirstFrame] = useState<HTMLImageElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [frameCount, setFrameCount] = useState(totalFrames);

  // Smooth LERP frame scrubber references
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  // 1. Scroll-linked tracking via Framer Motion (Optimized 220vh track for fast, snappy pacing)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 -> 1) dynamically across all detected frames
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(latest * (frameCount - 1)))
    );
    targetFrameRef.current = rawIndex;
  });

  // Snappy fade out for Hero text, logo card, and "SCROLL TO EXPLORE" during initial scroll (0% to 15%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 0.5, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.20], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 0.20], [0, -30]);
  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.10], [1, 0]);

  // 2. Instant First-Frame Loading + Background Preload for Remaining Frames
  useEffect(() => {
    let isMounted = true;
    const loadedImgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    const padZero = (num: number, size = 3) => {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };

    let globUrls: string[] = [];
    try {
      // @ts-ignore
      const globFiles = import.meta.glob("/src/assets/Panel Animation-1/*.{png,jpg,jpeg,webp}", {
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

    for (let i = 1; i <= activeCount; i++) {
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

        loadedImgs[frameIndex] = img;
        loadedCount++;

        // Instantly display Frame 1 as soon as it loads so the hero is NEVER black
        if (frameIndex === 0) {
          setFirstFrame(img);
          setImages([...loadedImgs]);
        }

        setLoadProgress(Math.round((loadedCount / activeCount) * 100));

        if (loadedCount === activeCount) {
          setImages([...loadedImgs]);
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        const altSrc = `/panel-animation-1/${imagePrefix}${frameString}.${imageExtension}`;
        const retryImg = new Image();
        retryImg.src = altSrc;
        retryImg.onload = async () => {
          if (!isMounted) return;
          try {
            if (retryImg.decode) await retryImg.decode();
          } catch {}
          loadedImgs[frameIndex] = retryImg;
          if (frameIndex === 0) {
            setFirstFrame(retryImg);
            setImages([...loadedImgs]);
          }
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / activeCount) * 100));
          if (loadedCount === activeCount) {
            setImages([...loadedImgs]);
            setImagesLoaded(true);
          }
        };
      };
    }

    return () => {
      isMounted = false;
    };
  }, [totalFrames, imageFolderPath, imagePrefix, imageExtension]);

  // 3. Mobile-Responsive & Desktop Full-Bleed Canvas Render Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // Snappy physics damping (LERP factor 0.24 for instant response without hanging)
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.24;

      const activeIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.75) : 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      const targetWidth = Math.round(displayWidth * dpr);
      const targetHeight = Math.round(displayHeight * dpr);

      const sizeChanged = canvas.width !== targetWidth || canvas.height !== targetHeight;
      if (sizeChanged) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      // Always fallback to firstFrame or images[0] so the hero is NEVER blank/black on initial load!
      const currentImg = images[activeIndex] || images[0] || firstFrame;

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        // Redraw when frame changes or on size change or on first frame mount
        if (sizeChanged || lastDrawnFrameRef.current !== activeIndex || lastDrawnFrameRef.current === -1) {
          lastDrawnFrameRef.current = activeIndex;

          ctx.save();
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          // Clear background with dark slate matching 3D studio
          ctx.fillStyle = "#0e131d";
          ctx.fillRect(0, 0, displayWidth, displayHeight);

          const imgRatio = currentImg.naturalWidth / currentImg.naturalHeight;
          const canvasRatio = displayWidth / displayHeight;
          const isMobile = displayWidth < 768;

          let drawWidth: number;
          let drawHeight: number;
          let offsetX: number;
          let offsetY: number;

          if (isMobile) {
            // Responsive mobile view: entire solar panel is 100% visible and centered in the upper-middle area
            drawWidth = displayWidth * 0.94;
            drawHeight = drawWidth / imgRatio;
            offsetX = (displayWidth - drawWidth) / 2;
            offsetY = (displayHeight - drawHeight) * 0.40; // Positioned cleanly between top text and bottom logo
          } else {
            // Desktop Full-Bleed Cover
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
  }, [images, firstFrame, frameCount]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh] bg-[#0e131d] select-none"
    >
      {/* 1. Preloader */}
      <AnimatePresence>
        {!imagesLoaded && (
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

      {/* 2. Sticky Fullscreen Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#0e131d]">
        {/* The Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block relative z-0 filter contrast-[105%] brightness-[101%] saturate-[106%]"
        />

        {/* 3. Hero Text & Logo Overlay (Fades out smoothly on scroll) */}
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
          className="pointer-events-none absolute inset-0 z-20 flex h-full w-full flex-col justify-between"
        >
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-5 sm:px-10 md:flex-row md:items-center md:gap-10">
            
            {/* HERO TEXT (Top on mobile, Left on desktop) */}
            <div className="pt-20 sm:pt-24 md:pt-0">
              <h1 className="text-[32px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px] md:text-6xl lg:text-7xl">
                Use solar for a{" "}
                <span className="text-[#22c55e]">
                  Better future
                </span>
              </h1>

              <p className="mt-3 max-w-[440px] text-[13px] leading-[1.6] text-gray-200 sm:text-base md:text-lg">
                Transform your energy consumption with sustainable solar solutions.
                Save money while contributing to a cleaner, greener planet.
              </p>
            </div>

            {/* SAHAJA SOLAR LOGO CARD:
                - On Mobile: Sits nicely in the lower open area (red circled zone) below the solar panel
                - On Desktop: Sits on the right side as a sleek frosted card
            */}
            <div className="relative z-20 pb-16 sm:pb-20 md:pb-0 flex justify-center md:justify-end">
              <div className="w-[62%] max-w-[220px] rounded-[20px] border border-white/20 bg-white/[0.12] p-3.5 shadow-2xl backdrop-blur-md sm:w-[68%] sm:max-w-[280px] sm:p-5 md:w-full md:max-w-md md:rounded-3xl md:p-10">
                <div className="flex h-[95px] items-center justify-center sm:h-[140px] md:h-[300px]">
                  <img
                    src={logoSrc}
                    alt="Sahaja Solar"
                    draggable={false}
                    className="block max-h-full max-w-[85%] object-contain"
                  />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 4. SCROLL TO EXPLORE Indicator */}
        <motion.div
          style={{ opacity: scrollTextOpacity }}
          className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.28em] text-white/60 sm:bottom-6 sm:text-xs"
        >
          SCROLL TO EXPLORE
        </motion.div>
      </div>
    </div>
  );
}
