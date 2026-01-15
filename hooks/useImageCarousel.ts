import { useState, useEffect, useCallback } from "react";

interface UseImageCarouselOptions {
  totalImages: number;
  autoRotateInterval?: number; // ms, default 3000
  transitionDuration?: number; // ms, default 900
  enableKeyboardNav?: boolean;
}

interface UseImageCarouselReturn {
  currentImageIndex: number;
  previousImageIndex: number;
  slideDirection: 'up' | 'down';
  isTransitioning: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  handleThumbnailClick: (index: number) => void;
  setCurrentImageIndex: (index: number) => void;
}

/**
 * Custom hook to manage image carousel state and navigation
 * Consolidates carousel logic used across CategoryHero, ServiceGalleryHero, and CategoryPageLayout
 */
export function useImageCarousel({
  totalImages,
  autoRotateInterval = 3000,
  transitionDuration = 900,
  enableKeyboardNav = false,
}: UseImageCarouselOptions): UseImageCarouselReturn {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setSlideDirection('down');
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
      setTimeout(() => setIsTransitioning(false), transitionDuration);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [currentImageIndex, totalImages, autoRotateInterval, transitionDuration]);

  // Navigate to previous image
  const handlePrevious = useCallback(() => {
    setPreviousImageIndex(currentImageIndex);
    setSlideDirection('up');
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [currentImageIndex, totalImages, transitionDuration]);

  // Navigate to next image
  const handleNext = useCallback(() => {
    setPreviousImageIndex(currentImageIndex);
    setSlideDirection('down');
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [currentImageIndex, totalImages, transitionDuration]);

  // Navigate to specific image via thumbnail click
  const handleThumbnailClick = useCallback((index: number) => {
    if (index === currentImageIndex) return;

    setPreviousImageIndex(currentImageIndex);
    setSlideDirection(index > currentImageIndex ? 'down' : 'up');
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [currentImageIndex, transitionDuration]);

  // Keyboard navigation (optional)
  useEffect(() => {
    if (!enableKeyboardNav) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardNav, handlePrevious, handleNext]);

  return {
    currentImageIndex,
    previousImageIndex,
    slideDirection,
    isTransitioning,
    handlePrevious,
    handleNext,
    handleThumbnailClick,
    setCurrentImageIndex,
  };
}
