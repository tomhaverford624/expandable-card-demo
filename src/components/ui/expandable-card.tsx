"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useOutsideClick } from "@/hooks/use-outside-click";

export type ExpandableCardProps = {
  title: string;
  description?: string;
  src?: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  ctaText?: string;
};

export function ExpandableCard({
  title,
  description,
  src,
  children,
  className,
  classNameExpanded,
  ctaText = "Open"
}: ExpandableCardProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const modalRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => setOpen(false), open);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const image = src ?? "https://picsum.photos/800/500";

  return (
    <>
      {/* Collapsed Card */}
      <motion.button
        layoutId={`card-${id}`}
        className={cn(
          "group relative w-full overflow-hidden rounded-xl border border-black/10 bg-white text-left shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow md:rounded-2xl dark:bg-zinc-900 dark:border-white/10",
          className
        )}
        onClick={() => setOpen(true)}
      >
        {/* Image layer */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <motion.img
            layoutId={`image-${id}`}
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          {/* Bottom gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-white text-lg font-semibold drop-shadow md:text-xl">
              {title}
            </h3>
            <Plus className="h-4 w-4 shrink-0 text-white/90 transition-transform group-hover:rotate-90" />
          </div>
          {description ? (
            <p className="mt-1 line-clamp-2 text-sm text-white/90 drop-shadow">
              {description}
            </p>
          ) : null}
          <span className="mt-3 inline-flex items-center text-xs font-medium text-white/90 opacity-90">
            {ctaText}
          </span>
        </div>
      </motion.button>

      {/* Expanded Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal container */}
            <div className="absolute inset-0 grid place-items-center p-4 md:p-8">
              <motion.div
                ref={modalRef}
                layoutId={`card-${id}`}
                className={cn(
                  "relative w-full max-w-3xl overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl md:rounded-2xl dark:bg-zinc-950 dark:border-white/10",
                  classNameExpanded
                )}
              >
                {/* Header image */}
                <div className="relative h-56 w-full overflow-hidden md:h-72">
                  <motion.img
                    layoutId={`image-${id}`}
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  {/* Close button */}
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white shadow hover:bg-black/70 focus:outline-none"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold md:text-xl">{title}</h3>
                  {description ? (
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {description}
                    </p>
                  ) : null}
                  <div className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                    {children ?? (
                      <p>
                        Replace this content by passing <code>children</code> to{" "}
                        <code>{"<ExpandableCard />"}</code>. The image and layout
                        are shared between collapsed and expanded states using Motion v11{" "}
                        <code>layoutId</code>.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
