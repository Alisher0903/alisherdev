import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Animated background particles
export const FloatingParticles: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 50, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = `absolute w-1 h-1 bg-accent/20 rounded-full`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 2 + 0.5,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: index * 0.1,
      });
    });

    return () => {
      particles.forEach((particle) => {
        gsap.killTweensOf(particle);
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
    />
  );
};

// Glowing orbs that follow mouse
export const InteractiveOrbs: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const orbs: HTMLDivElement[] = [];

    // Create orbs
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement("div");
      orb.className = `absolute w-32 h-32 rounded-full blur-3xl opacity-20`;
      orb.style.background = `radial-gradient(circle, hsl(${240 + i * 60}, 70%, 60%) 0%, transparent 70%)`;
      orb.style.left = `${20 + i * 30}%`;
      orb.style.top = `${20 + i * 20}%`;
      container.appendChild(orb);
      orbs.push(orb);
    }

    orbsRef.current = orbs;

    // Mouse follow animation
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      orbs.forEach((orb, index) => {
        const speed = 0.1 + index * 0.05;
        const x = (clientX / innerWidth) * 100;
        const y = (clientY / innerHeight) * 100;

        gsap.to(orb, {
          left: `${x + index * 10}%`,
          top: `${y + index * 15}%`,
          duration: 2 - speed,
          ease: "power2.out",
        });
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      orbs.forEach((orb) => {
        gsap.killTweensOf(orb);
        if (orb.parentNode) {
          orb.parentNode.removeChild(orb);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
    />
  );
};

// Animated gradient background
export const AnimatedGradient: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(gradientRef.current, {
      background:
        "radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 40% 80%, rgba(120, 255, 198, 0.1) 0%, transparent 50%)",
      duration: 8,
      ease: "none",
    })
      .to(gradientRef.current, {
        background:
          "radial-gradient(ellipse at 60% 30%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(120, 255, 198, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
        duration: 8,
        ease: "none",
      })
      .to(gradientRef.current, {
        background:
          "radial-gradient(ellipse at 80% 70%, rgba(120, 255, 198, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 40% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 20% 50%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
        duration: 8,
        ease: "none",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(120, 255, 198, 0.1) 0%, transparent 50%)",
      }}
    />
  );
};

// Geometric shapes animation
export const AnimatedShapes: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const shapes: HTMLDivElement[] = [];

    const shapeConfigs = [
      { size: "w-8 h-8", shape: "rounded-full", color: "bg-accent/10" },
      {
        size: "w-6 h-6",
        shape: "rounded-none rotate-45",
        color: "bg-blue-500/10",
      },
      { size: "w-10 h-4", shape: "rounded-full", color: "bg-green-500/10" },
      { size: "w-4 h-10", shape: "rounded-sm", color: "bg-purple-500/10" },
    ];

    // Create shapes
    for (let i = 0; i < 15; i++) {
      const config =
        shapeConfigs[Math.floor(Math.random() * shapeConfigs.length)];
      const shape = document.createElement("div");
      shape.className = `absolute ${config.size} ${config.shape} ${config.color}`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      container.appendChild(shape);
      shapes.push(shape);
    }

    // Animate shapes
    shapes.forEach((shape, index) => {
      const tl = gsap.timeline({ repeat: -1, delay: index * 0.2 });

      tl.to(shape, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 15 + 10,
        ease: "none",
      }).to(shape, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 15 + 10,
        ease: "none",
      });
    });

    return () => {
      shapes.forEach((shape) => {
        gsap.killTweensOf(shape);
        if (shape.parentNode) {
          shape.parentNode.removeChild(shape);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
    />
  );
};

// Combined creative background
export const CreativeBackground: React.FC<{
  variant?: "particles" | "orbs" | "gradient" | "shapes" | "all";
  className?: string;
}> = ({ variant = "all", className = "" }) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      {(variant === "particles" || variant === "all") && <FloatingParticles />}
      {(variant === "orbs" || variant === "all") && <InteractiveOrbs />}
      {(variant === "gradient" || variant === "all") && <AnimatedGradient />}
      {(variant === "shapes" || variant === "all") && <AnimatedShapes />}
    </div>
  );
};
