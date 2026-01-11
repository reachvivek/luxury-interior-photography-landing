"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Minimum display time in milliseconds (set to 0 for production, 2000 for testing)
    const MINIMUM_DISPLAY_TIME = 2000; // Change to 0 for production
    const startTime = Date.now();

    // Handle page load
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_DISPLAY_TIME - elapsedTime);

      // Wait for minimum display time before fading out
      setTimeout(() => {
        setIsLoaded(true);
        // Remove preloader from DOM after fade out animation completes
        setTimeout(() => {
          setShouldRender(false);
        }, 600); // Match the CSS transition duration
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
          {/* Animated logo */}
          <div className="preloader-logo">
            <Image
              src="/logo/LOGO-NASHRAY.png"
              alt="NASHRAY"
              width={320}
              height={320}
              priority
              className="preloader-image"
            />
          </div>

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
          animation: slideUpIn 0.6s ease-out forwards;
        }

        .preloader-fade-out {
          animation: slideUpOut 0.6s ease-out forwards;
        }

        .preloader-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preloader-logo {
          animation: preloaderPulse 0.8s ease-in-out;
          animation-fill-mode: both;
        }

        .preloader-image {
          width: auto;
          height: auto;
          max-width: 320px;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .preloader-image {
            max-width: 260px;
          }
        }

        @keyframes slideUpIn {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUpOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @keyframes preloaderPulse {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Fallback for older browsers that don't support animations */
        @supports not (animation: preloaderPulse 0.8s ease-in-out) {
          .preloader-logo {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Prevent body scroll when preloader is active */
        :global(body:has(.preloader-overlay:not(.preloader-fade-out))) {
          overflow: hidden;
        }

        /* Reduced motion support for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .preloader-overlay {
            transition: opacity 0.3s ease-out;
          }

          .preloader-logo {
            animation: none;
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
