"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";
import { cn } from "utils/cn";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "relative h-[40rem] flex items-center bg-white dark:bg-black justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" />
      <motion.div
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          pointerEvents: "none",
          backgroundColor: "var(--dot-thick-indigo-500)", // replace with an actual color if needed
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        position: "relative",
        display: "inline-block",
        paddingBottom: "0.25rem", // Tailwind's `pb-1`
        paddingLeft: "0.25rem",   // Tailwind's `px-1` (left)
        paddingRight: "0.25rem",  // Tailwind's `px-1` (right)
        borderRadius: "0.375rem", // Tailwind's `rounded-lg`
        backgroundImage: "linear-gradient(to right, #c3dafe, #d6bcfa)", // Replace with your gradient colors
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
      }}
    >
      {children}
    </motion.span>
  );
};
