'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const updateSize = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, { width }];
};

interface MasonryItem {
  id: string;
  img: string;
  height?: number;
  aspectRatio?: number;
  [key: string]: any;
}

interface MasonryProps {
  items: MasonryItem[];
  gap?: number;
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  onItemClick?: (item: MasonryItem) => void;
}

export default function Masonry({
  items = [],
  gap = 16,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  onItemClick,
}: MasonryProps) {
  const [containerRef, { width }] = useMeasure();
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  
  const { gridItems, containerHeight } = useMemo(() => {
    if (width === 0) return { gridItems: [], containerHeight: 0 };

    
    let cols = 3;
    if (width < 640) cols = 1;
    else if (width < 1024) cols = 2;
    else cols = 3;

    const colWidth = (width - gap * (cols - 1)) / cols;
    const colHeights = Array(cols).fill(0);

    const itemsWithPositions = items.map((item) => {
      const minColIndex = colHeights.indexOf(Math.min(...colHeights));
      const left = minColIndex * (colWidth + gap);
      const top = colHeights[minColIndex];

      
      const deterministicHeight = 240 + (parseInt(item.id || '0') % 5) * 50;
      const itemHeight = item.aspectRatio 
        ? (colWidth / item.aspectRatio) 
        : (item.height || deterministicHeight);
      colHeights[minColIndex] += itemHeight + gap;

      return {
        ...item,
        left,
        top,
        width: colWidth,
        height: itemHeight,
      };
    });

    return {
      gridItems: itemsWithPositions,
      containerHeight: Math.max(...colHeights),
    };
  }, [items, width, gap]);

  
  useEffect(() => {
    if (gridItems.length === 0) return;

    gridItems.forEach((item, i) => {
      const el = gridItemsRef.current[i];
      if (!el) return;

      if (!el.dataset.animated) {
        el.dataset.animated = 'true';

        
        const startX = animateFrom === 'left' ? item.left - 120 : (animateFrom === 'right' ? item.left + 120 : item.left);
        const startY = animateFrom === 'top' ? item.top - 120 : (animateFrom === 'bottom' ? item.top + 120 : item.top);

        gsap.set(el, {
          x: startX,
          y: startY,
          opacity: 0,
          width: item.width,
          height: item.height,
          filter: blurToFocus ? 'blur(10px)' : 'none',
        });

        gsap.to(el, {
          x: item.left,
          y: item.top,
          opacity: 1,
          filter: 'blur(0px)',
          duration: duration + 0.2,
          delay: i * stagger,
          ease: ease,
        });
      } else {
        
        gsap.to(el, {
          x: item.left,
          y: item.top,
          width: item.width,
          height: item.height,
          duration: duration,
          ease: ease,
        });
      }
    });
  }, [gridItems, duration, ease, stagger, animateFrom, blurToFocus]);

  
  useEffect(() => {
    gridItemsRef.current = gridItemsRef.current.slice(0, items.length);
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="masonry-container relative w-full"
      style={{ height: containerHeight }}
    >
      {gridItems.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => {
            gridItemsRef.current[idx] = el;
          }}
          className="masonry-item absolute overflow-visible"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: item.width || 300,
            height: item.height || 300,
          }}
        >
          <div
            className="masonry-item-inner w-full h-full cursor-pointer overflow-hidden rounded-3xl border border-card-border bg-card-bg shadow-sm transition-shadow duration-500 hover:shadow-xl hover:border-accent/30 dark:hover:border-accent/40"
            style={{
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (scaleOnHover) {
                e.currentTarget.style.transform = `scale(${hoverScale})`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={() => onItemClick?.(item)}
          >
            <img
              src={item.img}
              alt="Conference item"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              className="masonry-item-img"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
