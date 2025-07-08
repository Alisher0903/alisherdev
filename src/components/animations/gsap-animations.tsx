import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animated Text Reveal Component
export const AnimatedTextReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const chars = text.innerText.split("");
    text.innerHTML = "";

    chars.forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      text.appendChild(span);
    });

    const spans = text.querySelectorAll("span");

    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,
      delay,
      ease: "back.out(1.7)",
    });

    return () => {
      gsap.killTweensOf(spans);
    };
  }, [delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

// Floating Icons Animation
export const FloatingIcon: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = "", intensity = 1 }) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(iconRef.current, {
      y: -10 * intensity,
      rotation: 5,
      duration: 2 + Math.random() * 2,
      ease: "power2.inOut",
    })
      .to(iconRef.current, {
        x: 5 * intensity,
        rotation: -3,
        duration: 1.5 + Math.random() * 1.5,
        ease: "power2.inOut",
      })
      .to(iconRef.current, {
        y: 5 * intensity,
        x: -3 * intensity,
        rotation: 2,
        duration: 2 + Math.random() * 2,
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [intensity]);

  return (
    <div ref={iconRef} className={className}>
      {children}
    </div>
  );
};

// Stagger Animation Hook
export const useStaggerAnimation = (
  triggerRef: React.RefObject<HTMLElement>,
  itemsSelector: string = ".stagger-item",
) => {
  useEffect(() => {
    if (!triggerRef.current) return;

    const items = triggerRef.current.querySelectorAll(itemsSelector);

    gsap.set(items, {
      opacity: 0,
      y: 30,
      scale: 0.9,
    });

    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [triggerRef, itemsSelector]);
};

// Magnetic Button Effect
export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className = "", strength = 0.3 }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    let xTo = gsap.quickTo(button, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    let yTo = gsap.quickTo(button, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <button ref={buttonRef} className={className}>
      {children}
    </button>
  );
};

// Scroll-triggered number counter
export const AnimatedCounter: React.FC<{
  endValue: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}> = ({ endValue, duration = 2, className = "", suffix = "", prefix = "" }) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const counter = { value: 0 };

    ScrollTrigger.create({
      trigger: counterRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(counter, {
          value: endValue,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent =
                prefix + Math.round(counter.value) + suffix;
            }
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [endValue, duration, suffix, prefix]);

  return (
    <span ref={counterRef} className={className}>
      0{suffix}
    </span>
  );
};

// Parallax effect component
export const ParallaxElement: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className = "" }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Morphing background blobs
export const MorphingBlob: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = "", color = "rgba(139, 92, 246, 0.1)" }) => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(blobRef.current, {
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      duration: 8,
      ease: "sine.inOut",
    })
      .to(blobRef.current, {
        borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
        duration: 6,
        ease: "sine.inOut",
      })
      .to(blobRef.current, {
        borderRadius: "50% 50% 50% 50%",
        duration: 4,
        ease: "sine.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className={`absolute ${className}`}
      style={{
        background: color,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

// Page transition hook
export const usePageTransition = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    // Page enter animation
    tl.from("main", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, []);
};

// Scroll progress indicator
export const ScrollProgress: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-accent origin-left z-50 ${className}`}
      style={{ transform: "scaleX(0)" }}
      ref={progressRef}
    />
  );
};
