import { useEffect, useRef } from "react";

/* ============================================================
   LOAD YOUR EXISTING 50 IMAGES
   DO NOT CHANGE IMAGE NAMES
   ============================================================ */

const panelFrames = Object.entries(
  import.meta.glob("../assets/Panel Animation/ezgif-frame-*.jpg", {
    eager: true,
    import: "default",
    query: "?url",
  })
)
  .sort(([a], [b]) => {
    const frameA = Number(
      a.match(/ezgif-frame-(\d+)\.jpg/)?.[1] ?? 0
    );

    const frameB = Number(
      b.match(/ezgif-frame-(\d+)\.jpg/)?.[1] ?? 0
    );

    return frameA - frameB;
  })
  .map(([, url]) => url as string);


type HeroSectionProps = {
  logoSrc?: string;
};


export default function HeroSection({
  logoSrc = "/brandLogo.png",
}: HeroSectionProps) {

  const heroRef = useRef<HTMLDivElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);

  const currentFrameRef = useRef(0);

  const targetFrameRef = useRef(0);

  const animationRunningRef = useRef(false);

  const resizeObserverRef =
    useRef<ResizeObserver | null>(null);


  /* ==========================================================
     DRAW FRAME TO CANVAS
     ========================================================== */

  const drawFrame = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement
  ) => {

    const ctx = canvas.getContext("2d", {
      alpha: false,
    });

    if (!ctx || !image.complete) return;


    const rect = canvas.getBoundingClientRect();

    const cssWidth = rect.width;

    const cssHeight = rect.height;


    if (cssWidth <= 0 || cssHeight <= 0) return;


    /*
      High-DPI rendering.

      This makes the canvas itself sharper on
      mobile/Retina/high-DPI screens.
    */

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );


    const width = Math.round(cssWidth * dpr);

    const height = Math.round(cssHeight * dpr);


    if (
      canvas.width !== width ||
      canvas.height !== height
    ) {

      canvas.width = width;

      canvas.height = height;

    }


    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );


    /*
      Clear previous frame.
    */

    ctx.clearRect(
      0,
      0,
      cssWidth,
      cssHeight
    );


    /*
      Calculate COVER scaling.

      The image fills the complete Hero.
    */

    const imageRatio =
      image.naturalWidth /
      image.naturalHeight;

    const canvasRatio =
      cssWidth /
      cssHeight;


    let drawWidth: number;

    let drawHeight: number;

    let offsetX: number;

    let offsetY: number;


    if (imageRatio > canvasRatio) {

      /*
        Image is wider than screen.
      */

      drawHeight = cssHeight;

      drawWidth =
        drawHeight * imageRatio;

      offsetX =
        (cssWidth - drawWidth) / 2;

      offsetY = 0;

    } else {

      /*
        Image is taller than screen.
      */

      drawWidth = cssWidth;

      drawHeight =
        drawWidth / imageRatio;

      offsetX = 0;

      offsetY =
        (cssHeight - drawHeight) / 2;

    }


    /*
      High-quality image interpolation.
    */

    ctx.imageSmoothingEnabled = true;

    ctx.imageSmoothingQuality = "high";


    ctx.drawImage(
      image,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );

  };


  /* ==========================================================
     PRELOAD ALL 50 FRAMES
     ========================================================== */

  useEffect(() => {

    let cancelled = false;


    const loadImages = async () => {

      const loadedImages =
        await Promise.all(

          panelFrames.map(
            (src) =>
              new Promise<HTMLImageElement>(
                (resolve) => {

                  const image =
                    new Image();

                  image.src = src;

                  image.onload = async () => {

                    /*
                      Decode before using the frame.

                      This is important for preventing
                      blinking during scrolling.
                    */

                    try {

                      if (image.decode) {
                        await image.decode();
                      }

                    } catch {
                      // Browser may already have decoded it.
                    }

                    resolve(image);

                  };


                  image.onerror = () => {

                    resolve(image);

                  };

                }
              )
          )

        );


      if (cancelled) return;


      imagesRef.current =
        loadedImages;


      const canvas =
        canvasRef.current;


      if (!canvas) return;


      /*
        Draw first frame immediately.
      */

      if (loadedImages[0]) {

        drawFrame(
          loadedImages[0],
          canvas
        );

      }

    };


    loadImages();


    return () => {

      cancelled = true;

    };

  }, []);


  /* ==========================================================
     RESIZE CANVAS
     ========================================================== */

  useEffect(() => {

    const canvas =
      canvasRef.current;


    if (!canvas) return;


    const resize = () => {

      const images =
        imagesRef.current;


      const current =
        images[
          currentFrameRef.current
        ];


      if (current) {

        drawFrame(
          current,
          canvas
        );

      }

    };


    resize();


    window.addEventListener(
      "resize",
      resize
    );


    resizeObserverRef.current =
      new ResizeObserver(resize);


    resizeObserverRef.current.observe(
      canvas
    );


    return () => {

      window.removeEventListener(
        "resize",
        resize
      );


      resizeObserverRef.current?.disconnect();

    };

  }, []);


  /* ==========================================================
     SMOOTH FRAME TRANSITION
     ========================================================== */

  const animateToTargetFrame = () => {

    const images =
      imagesRef.current;


    const canvas =
      canvasRef.current;


    if (
      !canvas ||
      images.length === 0
    ) {

      animationRunningRef.current =
        false;

      return;

    }


    const current =
      currentFrameRef.current;


    const target =
      targetFrameRef.current;


    if (current === target) {

      animationRunningRef.current =
        false;

      return;

    }


    /*
      Move one frame at a time.

      This is much smoother than replacing
      the <img> element.
    */

    const difference =
      target - current;


    const step =
      Math.sign(difference) *
      Math.max(
        1,
        Math.ceil(
          Math.abs(difference) / 3
        )
      );


    let next =
      current + step;


    if (
      step > 0 &&
      next > target
    ) {

      next = target;

    }


    if (
      step < 0 &&
      next < target
    ) {

      next = target;

    }


    currentFrameRef.current =
      next;


    const image =
      images[next];


    if (image) {

      drawFrame(
        image,
        canvas
      );

    }


    requestAnimationFrame(
      animateToTargetFrame
    );

  };


  /* ==========================================================
     SCROLL CONTROL
     ========================================================== */

  useEffect(() => {

    const hero =
      heroRef.current;


    if (!hero) return;


    let scrollTicking = false;


    const updateScroll = () => {

      const rect =
        hero.getBoundingClientRect();


      /*
        Total scrollable Hero distance.
      */

      const totalDistance =
        hero.offsetHeight -
        window.innerHeight;


      if (totalDistance <= 0) {

        scrollTicking = false;

        return;

      }


      /*
        How far the Hero has been scrolled.
      */

      const travelled =
        Math.min(
          Math.max(-rect.top, 0),
          totalDistance
        );


      /*
        Convert scroll position
        into 0 → 1.
      */

      const progress =
        travelled /
        totalDistance;


      /*
        Convert 0 → 1 into
        frame 0 → frame 49.
      */

      const target =
        Math.round(
          progress *
          (panelFrames.length - 1)
        );


      targetFrameRef.current =
        Math.max(
          0,
          Math.min(
            panelFrames.length - 1,
            target
          )
        );


      /*
        Start animation only if
        it isn't already running.
      */

      if (
        !animationRunningRef.current
      ) {

        animationRunningRef.current =
          true;

        requestAnimationFrame(
          animateToTargetFrame
        );

      }


      scrollTicking = false;

    };


    const handleScroll = () => {

      if (!scrollTicking) {

        requestAnimationFrame(
          updateScroll
        );

        scrollTicking = true;

      }

    };


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );


    /*
      Initial position.
    */

    updateScroll();


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);


  /* ==========================================================
     UI
     ========================================================== */

  return (

    <section
      ref={heroRef}
      id="home"
      className="
        relative
        h-[300svh]
        bg-[#0f172a]
      "
    >

      {/* ======================================================
          STICKY HERO
          ====================================================== */}

      <div
        className="
          sticky
          top-0

          h-[100svh]

          min-h-[620px]

          overflow-hidden

          bg-[#0f172a]
        "
      >


        {/* ====================================================
            CANVAS

            ONE CANVAS IS USED FOR ALL 50 FRAMES.
            NO IMG SRC SWITCHING.
            ==================================================== */}

        <canvas
          ref={canvasRef}
          className="
            absolute
            inset-0
            z-0

            h-full
            w-full

            block
          "
        />


        {/* ====================================================
            DARK OVERLAY
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]

            bg-[#0f172a]/30
          "
        />


        {/* ====================================================
            MOBILE GRADIENT
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]

            bg-gradient-to-b
            from-[#020617]/70
            via-transparent
            to-[#020617]/75

            md:hidden
          "
        />


        {/* ====================================================
            DESKTOP GRADIENT
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]

            hidden

            bg-gradient-to-r
            from-[#020617]/75
            via-[#020617]/30
            to-transparent

            md:block
          "
        />


        {/* ====================================================
            CONTENT
            ==================================================== */}

        <div
          className="
            relative
            z-10

            mx-auto

            h-full

            w-full

            max-w-7xl

            px-5

            sm:px-6

            md:px-8
          "
        >

          <div
            className="
              flex
              h-full
              flex-col

              md:grid
              md:grid-cols-2
              md:items-center
              md:gap-10
            "
          >


            {/* =================================================
                TEXT
                ================================================= */}

            <div
              className="
                pt-[88px]

                sm:pt-[95px]

                md:pt-0
              "
            >

              <h1
                className="
                  text-[38px]

                  font-bold

                  leading-[1.04]

                  tracking-tight

                  text-white

                  sm:text-[44px]

                  md:text-6xl

                  lg:text-7xl
                "
              >

                Use solar for a{" "}

                <span
                  className="
                    text-[#22c55e]
                  "
                >
                  Better future
                </span>

              </h1>


              <p
                className="
                  mt-5

                  max-w-[440px]

                  text-[15px]

                  leading-[1.65]

                  text-gray-200

                  sm:text-base

                  md:text-lg
                "
              >

                Transform your energy consumption
                with sustainable solar solutions.
                Save money while contributing to a
                cleaner, greener planet.

              </p>

            </div>


            {/* =================================================
                LOGO
                ================================================= */}

            <div
              className="
                relative
                z-20

                mt-auto

                mb-[74px]

                flex

                justify-center

                md:mt-0

                md:mb-0

                md:justify-end
              "
            >

              <div
                className="
                  w-[72%]

                  max-w-[300px]

                  rounded-[26px]

                  border
                  border-white/20

                  bg-white/[0.10]

                  p-4

                  shadow-2xl

                  backdrop-blur-md

                  sm:w-[70%]

                  sm:max-w-[330px]

                  sm:p-6

                  md:w-full

                  md:max-w-md

                  md:rounded-3xl

                  md:p-10
                "
              >

                <div
                  className="
                    flex

                    h-[155px]

                    items-center

                    justify-center

                    sm:h-[190px]

                    md:h-[300px]
                  "
                >

                  <img
                    src={logoSrc}
                    alt="Sahaja Solar"

                    draggable={false}

                    className="
                      block

                      max-h-full

                      max-w-[88%]

                      object-contain
                    "
                  />

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            SCROLL TEXT
            ==================================================== */}

        <div
          className="
            pointer-events-none

            absolute

            bottom-5

            left-1/2

            z-30

            -translate-x-1/2

            whitespace-nowrap

            text-[10px]

            font-medium

            uppercase

            tracking-[0.28em]

            text-white/65

            sm:bottom-6

            sm:text-xs
          "
        >

          SCROLL TO EXPLORE

        </div>

      </div>

    </section>

  );
}