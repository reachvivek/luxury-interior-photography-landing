"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TAGLINES = [
  "Capturing Spaces. Creating Stories.",
  "Where Light Meets Luxury.",
  "Elevating Interiors Through Imagery.",
  "Architecture in Focus. Detail in Frame.",
  "Transforming Spaces into Visual Poetry.",
  "Precision in Every Pixel.",
  "Crafting Visual Excellence.",
  "Your Space. Our Vision. Pure Artistry.",
];

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const [tagline, setTagline] = useState(TAGLINES[0]);

  useEffect(() => {
    // Set random tagline on client side only
    setTagline(TAGLINES[Math.floor(Math.random() * TAGLINES.length)]);

    // Minimum display time in milliseconds (set to 0 for production, 2000 for testing)
    const MINIMUM_DISPLAY_TIME = 2000; // Change to 0 for production
    const startTime = Date.now();

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, MINIMUM_DISPLAY_TIME / 50); // 50 steps to reach 100%

    // Handle page load
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_DISPLAY_TIME - elapsedTime);

      // Wait for minimum display time before fading out
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoaded(true);
          // Remove preloader from DOM after fade out animation completes
          setTimeout(() => {
            setShouldRender(false);
          }, 600); // Match the CSS transition duration
        }, 300);
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Fallback: Force remove preloader after 3 seconds to prevent infinite loading
    const fallbackTimeout = setTimeout(() => {
      handleLoad();
    }, 3000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearInterval(progressInterval);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  // Don't render if should not be visible
  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`preloader-overlay ${isLoaded ? "preloader-fade-out" : ""}`}
        aria-hidden="true"
      >
        <div className="preloader-content">
          {/* Logo and Brand in horizontal layout */}
          <div className="logo-brand-container">
            <div className="logo-wrapper">
              <Image
                src="/logo/LOGO-NASHRAY.png"
                alt="NASHRAY"
                width={120}
                height={120}
                priority
                className="logo-image"
              />
            </div>
            <div className="brand-text">
              <div className="preloader-brand">NASHRAY</div>
              <h1 className="preloader-headline">
                {tagline}
              </h1>
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <div className="progress-percentage">{progress}%</div>
          </div>

          {/* Enter button - fades in when loaded */}
          {progress === 100 && (
            <div className="enter-button">
              Explore Portfolio
            </div>
          )}

          {/* Fallback for no-JS or older browsers */}
          <noscript>
            <style>{`
              .preloader-overlay {
                display: none !important;
              }
            `}</style>
          </noscript>
        </div>
      </div>

      <style jsx>{`
        .preloader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.6s ease-out;
        }

        .preloader-fade-out {
          opacity: 0;
        }

        .preloader-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1000px;
          padding: 0 2rem;
          gap: 2rem;
        }

        .logo-brand-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          opacity: 0;
          animation: fadeIn 0.6s ease-out 0.2s forwards;
        }

        .logo-wrapper {
          flex-shrink: 0;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }

        .preloader-brand {
          color: #000000;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .preloader-headline {
          color: #000000;
          font-family: var(--font-serif, serif);
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 300;
          line-height: 1.4;
          text-align: left;
          letter-spacing: 0;
          margin: 0;
        }

        .progress-container {
          width: 100%;
          max-width: 600px;
          position: relative;
          opacity: 0;
          animation: fadeIn 0.6s ease-out 0.6s forwards;
        }

        .progress-bar {
          height: 1px;
          background-color: #000000;
          transition: width 0.1s linear;
        }

        .progress-percentage {
          color: #000000;
          font-size: 0.875rem;
          font-weight: 300;
          letter-spacing: 0.05em;
          margin-top: 0.75rem;
          text-align: left;
        }

        .enter-button {
          color: #000000;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.875rem 2rem;
          border: 1px solid rgba(0, 0, 0, 0.3);
          border-radius: 2px;
          background: transparent;
          cursor: pointer;
          opacity: 0;
          animation: fadeIn 0.4s ease-out 0.2s forwards;
          transition: all 0.3s ease;
        }

        .enter-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
          border-color: #000000;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Prevent body scroll when preloader is active */
        :global(body:has(.preloader-overlay:not(.preloader-fade-out))) {
          overflow: hidden;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .preloader-content {
            gap: 1.5rem;
            padding: 0 1.5rem;
          }

          .logo-brand-container {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .logo-wrapper {
            width: 100px;
            height: 100px;
          }

          .brand-text {
            text-align: center;
            align-items: center;
          }

          .preloader-brand {
            font-size: 0.625rem;
            letter-spacing: 0.3em;
          }

          .preloader-headline {
            text-align: center;
          }

          .enter-button {
            font-size: 0.7rem;
            padding: 0.75rem 1.75rem;
          }
        }

        /* Reduced motion support for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .preloader-overlay {
            transition: opacity 0.3s ease-out;
          }

          .preloader-brand,
          .preloader-headline,
          .progress-container,
          .enter-button {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
