import React, { memo } from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

import { GithubIcon } from "@/components/icons";
import LazyImage from "./lazy-image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export interface ProjectCardProps {
  name: string;
  favicon: string;
  imageUrl: string[];
  description: string;
  sourceCodeHref: string;
  liveWebsiteHref?: string;
}

const LazyProjectCard: React.FC<ProjectCardProps> = memo(
  ({
    name,
    favicon,
    imageUrl,
    description,
    sourceCodeHref,
    liveWebsiteHref,
  }) => {
    const [ref, isInView] = useIntersectionObserver({
      threshold: 0.1,
      rootMargin: "100px",
    });

    const cardVariants = {
      hidden: { y: 50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring" as const,
          duration: 0.6,
          ease: "easeOut" as const,
        },
      },
    };

    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={cardVariants}
        whileHover={{
          y: -5,
          transition: { duration: 0.2 },
        }}
        className="flex min-h-[350px] w-full flex-col overflow-hidden rounded-lg border border-accent/20 bg-background shadow-md transition-shadow duration-150 hover:shadow-lg hover:shadow-accent/20 dark:bg-zinc-800"
      >
        {/* Lazy load carousel/images only when in view */}
        {isInView && (
          <div className="relative aspect-[2.1/1] overflow-hidden">
            {imageUrl.length > 0 && (
              <LazyImage
                src={imageUrl[0]}
                alt={`${name} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col p-3 text-foreground sm:p-4">
          <div className="flex items-center gap-3">
            <span className="relative h-5 w-5">
              {isInView && (
                <LazyImage
                  src={favicon}
                  alt={`${name} icon`}
                  fill
                  sizes="20px"
                />
              )}
            </span>
            <span className="text-sm font-semibold">{name}</span>
          </div>

          <div className="mt-3 flex-1">
            <p className="text-xs md:text-sm">{description}</p>
          </div>

          <div className="mt-auto flex items-center justify-end gap-6 pt-4">
            <a
              href={sourceCodeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs underline transition-colors hover:text-accent md:text-sm"
            >
              <GithubIcon className="h-5 w-5" />
              Source code
            </a>
            {liveWebsiteHref && (
              <a
                href={liveWebsiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs underline transition-colors hover:text-accent md:text-sm"
              >
                <FiExternalLink className="h-5 w-5" />
                Live
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);

LazyProjectCard.displayName = "LazyProjectCard";

export default LazyProjectCard;
