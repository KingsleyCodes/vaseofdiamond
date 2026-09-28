"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const VIDEOS = ["/v11.mp4", "/v31.mp4", "/v1.mp4"];

// Switch this many seconds before the active clip ends.
// Kept generous because the actual "is it ready" work now happens
// much earlier (see primeVideo), so this is just a safety window.
const TRANSITION_LEAD = 0.35;

export default function Hero({
  eyebrow = "CURATED SPACES",
  title = "Where architecture meets exceptional living.",
  description = "Discover spaces designed around the way modern life should feel.",
  ctaText = "Explore Collection",
  ctaHref = "#collection",
}) {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const posterRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const videos = videoRefs.current.filter(Boolean);
    const poster = posterRef.current;

    if (!container || videos.length !== VIDEOS.length) {
      return;
    }

    let isMounted = true;
    let activeIndex = 0;
    let isTransitioning = false;
    let rafId = null;
    let cinematicTween = null;
    const primedIndices = new Set();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /*
     * ============================================================
     * WAIT UNTIL A VIDEO HAS ENOUGH DATA TO DISPLAY
     * ============================================================
     */
    const waitUntilReady = (video) => {
      if (video.readyState >= 2) {
        return Promise.resolve(true);
      }

      return new Promise((resolve) => {
        let finished = false;

        const cleanup = () => {
          video.removeEventListener("loadeddata", handleReady);
          video.removeEventListener("canplay", handleReady);
          video.removeEventListener("error", handleError);
          video.removeEventListener("abort", handleError);
        };

        const finish = (value) => {
          if (finished) return;

          finished = true;
          cleanup();
          resolve(value);
        };

        const handleReady = () => {
          finish(video.readyState >= 2);
        };

        const handleError = () => {
          finish(false);
        };

        video.addEventListener("loadeddata", handleReady);
        video.addEventListener("canplay", handleReady);
        video.addEventListener("error", handleError);
        video.addEventListener("abort", handleError);

        if (video.readyState >= 2) {
          finish(true);
        }
      });
    };

    /*
     * ============================================================
     * WAIT UNTIL THE BROWSER HAS ACTUALLY PRESENTED A VIDEO FRAME
     * ============================================================
     */
    const waitForPaintedFrame = (video) => {
      if (typeof video.requestVideoFrameCallback === "function") {
        return new Promise((resolve) => {
          video.requestVideoFrameCallback(() => {
            resolve();
          });
        });
      }

      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });
    };

    /*
     * ============================================================
     * PRIME AN UPCOMING VIDEO WELL AHEAD OF TIME
     *
     * Instead of only checking readiness in the ~0.35s window
     * before a cut, we proactively play-then-immediately-pause
     * the *next* video as soon as its predecessor becomes active.
     * That forces the browser to decode and paint a real first
     * frame far in advance, so by the time switchTo() actually
     * needs it, there is nothing left to wait for -> no black
     * frame, no flash.
     * ============================================================
     */
    const primeVideo = async (video, index) => {
      if (!isMounted || !video || primedIndices.has(index)) {
        return;
      }

      primedIndices.add(index);

      try {
        const ready = await waitUntilReady(video);

        if (!isMounted || !ready) {
          primedIndices.delete(index);
          return;
        }

        video.currentTime = 0;
        await video.play();

        if (!isMounted) return;

        await waitForPaintedFrame(video);

        if (!isMounted) return;

        video.pause();
        video.currentTime = 0;
      } catch (error) {
        // If priming fails for any reason, un-mark it so switchTo's
        // own readiness check gets a chance to do the full job later.
        primedIndices.delete(index);
      }
    };

    /*
     * ============================================================
     * CONTINUOUS CINEMATIC CAMERA MOVEMENT
     *
     * Uses sine/cosine so the end of the loop mathematically matches
     * the beginning. There is no visible stop or snap.
     * ============================================================
     */
    const startKenBurns = (video) => {
      if (cinematicTween) {
        cinematicTween.kill();
        cinematicTween = null;
      }

      if (prefersReducedMotion) {
        gsap.set(video, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
        });

        return;
      }

      const motion = {
        t: 0,
      };

      gsap.set(video, {
        scale: 1.025,
        xPercent: 0,
        yPercent: 0,
      });

      cinematicTween = gsap.to(motion, {
        t: Math.PI * 2,
        duration: 22,
        ease: "none",
        repeat: -1,

        onUpdate: () => {
          if (!isMounted) return;

          const t = motion.t;

          gsap.set(video, {
            scale: 1.035 + Math.sin(t) * 0.0125,
            xPercent: Math.sin(t) * 0.38,
            yPercent: Math.cos(t) * 0.18,
          });
        },
      });
    };

    /*
     * ============================================================
     * SWITCH TO NEXT VIDEO
     *
     * Important:
     * - Current video remains visible while next video loads.
     * - Next video starts playing while still hidden.
     * - We wait for an actual painted frame (usually instant now,
     *   because primeVideo already warmed it up ahead of time).
     * - Only then do we perform the instant hard cut.
     * - Old video is reset afterwards.
     * ============================================================
     */
    const switchTo = async (nextIndex) => {
      if (!isMounted || isTransitioning) {
        return;
      }

      const currentIndex = activeIndex;

      if (nextIndex === currentIndex) {
        return;
      }

      const currentVideo = videos[currentIndex];
      const nextVideo = videos[nextIndex];

      if (!currentVideo || !nextVideo) {
        return;
      }

      isTransitioning = true;

      /*
       * Keep the current frame visible while we prepare the next one.
       */
      const nextReady = await waitUntilReady(nextVideo);

      if (!isMounted) {
        return;
      }

      if (!nextReady) {
        isTransitioning = false;
        return;
      }

      /*
       * Always restart the next clip from its first frame.
       */
      try {
        nextVideo.pause();
        nextVideo.currentTime = 0;
      } catch (error) {
        // Safe fallback; browser may reject a seek during media updates.
      }

      /*
       * Start next video BEFORE revealing it.
       */
      try {
        await nextVideo.play();
      } catch (error) {
        isTransitioning = false;
        return;
      }

      if (!isMounted) {
        return;
      }

      /*
       * Make sure the browser has actually painted a frame.
       * Thanks to primeVideo(), this almost always resolves on the
       * very next frame instead of introducing a stall.
       */
      await waitForPaintedFrame(nextVideo);

      if (!isMounted) {
        return;
      }

      /*
       * ========================================================
       * INSTANT HARD CUT
       * ========================================================
       */
      gsap.set(nextVideo, {
        opacity: 1,
        zIndex: 20,
      });

      gsap.set(currentVideo, {
        opacity: 0,
        zIndex: 10,
      });

      /*
       * Reset old video only after it is hidden.
       */
      try {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      } catch (error) {
        // Safe to ignore.
      }

      gsap.set(currentVideo, {
        scale: prefersReducedMotion ? 1 : 1.025,
        xPercent: 0,
        yPercent: 0,
      });

      activeIndex = nextIndex;
      isTransitioning = false;

      // The clip we just left is now free to be primed again next
      // time it comes around in the loop.
      primedIndices.delete(currentIndex);

      startKenBurns(nextVideo);

      /*
       * Immediately begin warming up the clip AFTER this one, so it
       * has the entire duration of the newly-active clip to decode
       * a frame in the background instead of only ~0.35s.
       */
      const upcomingIndex = (nextIndex + 1) % VIDEOS.length;
      primeVideo(videos[upcomingIndex], upcomingIndex);
    };

    /*
     * ============================================================
     * MAIN VIDEO SEQUENCE DRIVER
     *
     * No fixed 5-second timer.
     * Each clip determines when the transition happens from its
     * own duration. An 'ended' listener on every video acts as a
     * hard fallback: if the rAF loop is ever throttled (e.g. a
     * backgrounded tab) and misses the lead window, the clip
     * reaching its true end still forces an immediate cut instead
     * of freezing on a black/last frame.
     * ============================================================
     */
    const tick = () => {
      if (!isMounted) {
        return;
      }

      const activeVideo = videos[activeIndex];

      if (
        activeVideo &&
        !isTransitioning &&
        Number.isFinite(activeVideo.duration) &&
        activeVideo.duration > 0.5
      ) {
        const remaining =
          activeVideo.duration - activeVideo.currentTime;

        /*
         * Start switching shortly before the current clip reaches
         * its natural end. Because the next clip was already primed
         * far earlier, this is now just a formality.
         */
        if (remaining <= TRANSITION_LEAD) {
          const nextIndex = (activeIndex + 1) % VIDEOS.length;

          switchTo(nextIndex);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const handleEndedFallback = (index) => {
      if (!isMounted || isTransitioning || index !== activeIndex) {
        return;
      }

      const nextIndex = (index + 1) % VIDEOS.length;
      switchTo(nextIndex);
    };

    /*
     * ============================================================
     * START HERO
     * ============================================================
     */
    const startShow = async () => {
      const firstVideo = videos[0];

      if (!firstVideo || !isMounted) {
        return;
      }

      const firstReady = await waitUntilReady(firstVideo);

      if (!isMounted || !firstReady) {
        return;
      }

      try {
        firstVideo.pause();
        firstVideo.currentTime = 0;

        await firstVideo.play();
      } catch (error) {
        /*
         * If autoplay is blocked, keep the poster visible.
         */
        return;
      }

      if (!isMounted) {
        return;
      }

      /*
       * Wait until the first actual frame is painted.
       */
      await waitForPaintedFrame(firstVideo);

      if (!isMounted) {
        return;
      }

      gsap.set(firstVideo, {
        opacity: 1,
        zIndex: 20,
      });

      /*
       * Fade poster away only after video is genuinely visible.
       */
      if (poster) {
        gsap.to(poster, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            if (poster) {
              poster.style.visibility = "hidden";
            }
          },
        });
      }

      startKenBurns(firstVideo);

      // Start warming up video index 1 right away, well ahead of
      // when it will actually be needed.
      primeVideo(videos[1], 1);

      /*
       * Begin monitoring the active clip.
       */
      rafId = requestAnimationFrame(tick);
    };

    /*
     * ============================================================
     * INITIALISE ALL THREE VIDEOS
     * ============================================================
     */
    const gsapContext = gsap.context(() => {
      videos.forEach((video, index) => {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.loop = false;

        video.addEventListener("ended", () => handleEndedFallback(index));

        gsap.set(video, {
          opacity: index === 0 ? 1 : 0,
          zIndex: index === 0 ? 20 : 10,
          scale: prefersReducedMotion ? 1 : 1.025,
          xPercent: 0,
          yPercent: 0,
        });

        /*
         * Each video has its own fixed src from JSX.
         *
         * There is NO runtime src switching.
         * This eliminates the source-loading race that caused the
         * previous three-video implementation to get stuck.
         */
        video.load();
      });

      /*
       * ========================================================
       * TEXT ENTRANCE
       * ========================================================
       */
      if (textContainerRef.current) {
        gsap.fromTo(
          Array.from(textContainerRef.current.children),
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }
    }, container);

    startShow();

    /*
     * ============================================================
     * CLEANUP
     * ============================================================
     */
    return () => {
      isMounted = false;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (cinematicTween) {
        cinematicTween.kill();
        cinematicTween = null;
      }

      videos.forEach((video) => {
        try {
          video.pause();
        } catch (error) {
          // Ignore cleanup errors.
        }
      });

      gsapContext.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
        h-[75vh]
        sm:h-[78vh]
        min-h-[500px]
        max-h-[850px]
        overflow-hidden
        bg-[#0a0a0a]
      "
      aria-label="Hero Section"
    >
      {/* =========================================================
          POSTER / FALLBACK
          This stays underneath the videos so there is never an
          exposed black background during media decoding.
      ========================================================== */}
      <div
        ref={posterRef}
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          h-full
          w-full
          overflow-hidden
        "
        aria-hidden="true"
      >
        <img
          src="/hero.webp"
          alt=""
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        />
      </div>

      {/* =========================================================
          THREE VIDEO LAYERS
          Each video permanently owns its own source.
      ========================================================== */}
      {VIDEOS.map((src, index) => (
        <video
          key={src}
          ref={(element) => {
            videoRefs.current[index] = element;
          }}
          src={src}
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            h-full
            w-full
            object-cover
            object-center
            will-change-transform
          "
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      ))}

      {/* =========================================================
          CINEMATIC GRADIENT
      ========================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
        "
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0) 70%)",
        }}
      />

      {/* =========================================================
          BOTTOM-LEFT TEXT
      ========================================================== */}
      <div
        ref={textContainerRef}
        className="
          absolute
          bottom-[8%]
          left-[6%]
          z-40
          w-[88%]
          max-w-xl
          pr-6
          text-white
          md:left-[8%]
        "
      >
        <span
          className="
            mb-3
            inline-block
            text-[10px]
            font-medium
            uppercase
            tracking-[0.25em]
            text-[#a3dcf3]
            md:text-xs
          "
        >
          {eyebrow}
        </span>

        <h1
          className="
            mb-3
            text-2xl
            font-light
            leading-[1.08]
            tracking-tight
            text-white
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
          "
        >
          {title}
        </h1>

        <p
          className="
            mb-5
            max-w-md
            text-xs
            font-light
            leading-relaxed
            text-gray-300
            sm:text-sm
            md:text-base
          "
        >
          {description}
        </p>

        <a
          href={ctaHref}
          className="
            group
            inline-flex
            items-center
            gap-3
            text-xs
            font-medium
            uppercase
            tracking-wider
            text-white
            transition-opacity
            duration-300
            hover:opacity-80
            md:text-sm
          "
        >
          <span>{ctaText}</span>

          <span
            className="
              inline-block
              transition-transform
              duration-300
              group-hover:translate-x-1.5
            "
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}