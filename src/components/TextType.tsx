'use client';

import React, { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

interface TextTypeProps {
  text: string | string[];
  as?: React.ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  [key: string]: any;
}

interface CharObject {
  char: string;
  type: 'normal' | 'gradient' | 'linebreak';
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  as: Component = 'div',
  typingSpeed = 20,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed = { min: 12, max: 32 }, 
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  
  const characters = useMemo<CharObject[]>(() => {
    const fullText = textArray[0] || '';
    if (fullText === "Liczą się efekty, nie deklaracje.") {
      return [
        ...("Liczą się ".split("").map(c => ({ char: c, type: "normal" as const }))),
        ...("efekty".split("").map(c => ({ char: c, type: "gradient" as const }))),
        { char: ",", type: "normal" as const },
        { char: "\n", type: "linebreak" as const },
        ...(" nie deklaracje.".split("").map(c => ({ char: c, type: "normal" as const })))
      ];
    }
    
    return fullText.split("").map(c => ({ char: c, type: "normal" as const }));
  }, [textArray]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'inherit';
    return textColors[0 % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    const isFinished = currentCharIndex >= characters.length;

    if (isFinished) {
      
      gsap.killTweensOf(cursorRef.current);
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    } else {
      
      gsap.killTweensOf(cursorRef.current);
      gsap.set(cursorRef.current, { opacity: 1 });
    }

    return () => {
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
      }
    };
  }, [showCursor, currentCharIndex, characters.length, cursorBlinkDuration]);

  
  useEffect(() => {
    if (!isVisible) return;

    let timeout: NodeJS.Timeout;

    const executeTypingAnimation = () => {
      if (currentCharIndex < characters.length) {
        
        let nextSpeed = variableSpeed ? getRandomSpeed() : typingSpeed;
        
        const currentCharObj = characters[currentCharIndex];
        const nextChar = currentCharObj?.char;
        const prevChar = currentCharIndex > 0 ? characters[currentCharIndex - 1]?.char : '';

        
        if (nextChar === ",") {
          nextSpeed = 200;
        } else if (nextChar === ".") {
          nextSpeed = 280;
        } else if (nextChar === "\n") {
          nextSpeed = 150;
        } else if (nextChar === " ") {
          
          nextSpeed = 80;
        }

        
        if (prevChar === " " || prevChar === "\n") {
          nextSpeed += Math.random() * 20 + 10; 
        }

        timeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, nextSpeed);
      } else {
        if (onSentenceComplete) {
          onSentenceComplete(textArray[0], 0);
        }
      }
    };

    if (currentCharIndex === 0) {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    characters,
    typingSpeed,
    initialDelay,
    isVisible,
    variableSpeed,
    getRandomSpeed,
    onSentenceComplete,
    textArray
  ]);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props
    },
    <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>
      
      {currentCharIndex === 0 && showCursor && (
        <span
          ref={cursorRef}
          className={`text-type__cursor ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}

      {characters.map((item, idx) => {
        const isVisible = idx < currentCharIndex;
        const isGradient = item.type === 'gradient';
        
        
        let charClass = "typed-char";
        if (isGradient) {
          charClass += " bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent font-extrabold";
        }
        if (isVisible) {
          charClass += " is-visible";
        }

        const isLastVisible = idx === currentCharIndex - 1;

        if (item.type === 'linebreak') {
          return (
            <React.Fragment key={idx}>
              <br className="hidden md:inline" />
              {isLastVisible && showCursor && (
                <span
                  ref={cursorRef}
                  className={`text-type__cursor ${cursorClassName}`}
                >
                  {cursorCharacter}
                </span>
              )}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={idx}>
            <span 
              className={charClass}
              style={{ 
                display: item.char === ' ' ? 'inline' : 'inline-block' 
              }}
            >
              {item.char}
            </span>
            {isLastVisible && showCursor && (
              <span
                ref={cursorRef}
                className={`text-type__cursor ${cursorClassName}`}
              >
                {cursorCharacter}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default TextType;

