import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  disableHover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  index = 0,
  className = "",
  disableHover = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={
        !disableHover
          ? {
              scale: 1.05,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            }
          : undefined
      }
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        scale: {
          duration: 0.15,
          ease: "easeOut",
        },
      }}
      className={`relative sheikah-border overflow-hidden ${className}`}
    >
      {/* Blurred background */}
      <div className="absolute inset-0 bg-slate-800/20 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative">{children}</div>
    </motion.div>
  );
};
