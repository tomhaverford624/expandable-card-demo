"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/cn"
import { useOutsideClick } from "@/hooks/use-outside-click"

export type ExpandableCardProps = {
  title: string
  src?: string
  description?: string
  children?: React.ReactNode
  className?: string
  classNameExpanded?: string
  ctaText?: string
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ctaText = "+",
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false)
  const id = React.useId()
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    if (active) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [active])

  // Handle clicks outside the modal
  useOutsideClick(ref, () => setActive(false), active)

  return (
    <>
      {/* Card */}
      <motion.div
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "flex flex-col h-96 rounded-3xl cursor-pointer relative overflow-hidden group",
          "bg-neutral-900/50 border border-neutral-800/60 hover:border-neutral-700/80 hover:bg-neutral-900/70",
          "transition-all duration-200 ease-out",
          className,
        )}
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Full background image */}
        {src && (
          <motion.div
            layoutId={`image-${title}-${id}`}
            className="absolute inset-0 z-0"
          >
            <img
              width={300}
              height={320}
              src={src}
              alt={title}
              className="w-full h-full object-cover object-center bg-neutral-800"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
          </motion.div>
        )}

        {/* If no image, show gradient background */}
        {!src && (
          <motion.div
            layoutId={`image-${title}-${id}`}
            className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-800 to-neutral-900"
          />
        )}

        {/* Bottom bar with title and button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between z-10 bg-gradient-to-t from-neutral-900 via-neutral-900/90 to-transparent">
          <div className="flex-1 min-w-0">
            <motion.h3
              layoutId={`title-${title}-${id}`}
              className="font-medium text-white text-xl leading-tight truncate"
            >
              {title}
            </motion.h3>
            {description && (
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="text-neutral-400 text-xs truncate"
              >
                {description}
              </motion.p>
            )}
          </div>

          <motion.button
            layoutId={`button-${title}-${id}`}
            className="w-8 h-8 rounded-full bg-neutral-700/80 hover:bg-neutral-600 text-white flex items-center justify-center text-lg font-light transition-colors ml-3 flex-shrink-0 backdrop-blur-sm"
            whileHover={{
              scale: 1.05,
              rotate: 45,
              backgroundColor: "rgb(82, 82, 82)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {ctaText}
          </motion.button>
        </div>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
            onClick={() => setActive(false)}
          />
        )}
      </AnimatePresence>

      {/* Expanded Modal - Linear Style */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`close-${title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-[101]"
              onClick={() => setActive(false)}
            >
              <X className="h-4 w-4" />
            </motion.button>

            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={ref}
              style={{ backgroundColor: '#0f1011' }}
              className={cn(
                "w-full max-w-5xl h-full md:h-fit md:max-h-[90%]",
                "flex flex-col border border-neutral-800/40",
                "sm:rounded-3xl overflow-hidden",
                classNameExpanded,
              )}
            >
              {/* Image section */}
              <motion.div layoutId={`image-${title}-${id}`}>
                {src ? (
                  <img
                    width={200}
                    height={200}
                    src={src}
                    alt={title}
                    className="w-full h-[32rem] sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center bg-neutral-800"
                  />
                ) : (
                  <div className="w-full h-[32rem] sm:rounded-tr-lg sm:rounded-tl-lg bg-gradient-to-br from-neutral-800 to-neutral-900" />
                )}
              </motion.div>

              <div className="overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                <div className="max-w-3xl mx-auto">
                  {/* Header with title and close button */}
                  <div className="flex justify-between items-start p-8">
                  <div>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-semibold text-white text-3xl md:text-4xl tracking-tight leading-tight"
                    >
                      {title}
                    </motion.h3>
                    {description && (
                      <motion.p
                        layoutId={`description-${description}-${id}`}
                        className="text-neutral-400 text-base mt-2"
                      >
                        {description}
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    layoutId={`button-${title}-${id}`}
                    onClick={() => setActive(false)}
                    className="w-8 h-8 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white flex items-center justify-center text-lg font-light transition-colors flex-shrink-0 ml-4"
                  >
                    ×
                  </motion.button>
                </div>

                  {/* Content */}
                  <div className="px-8 pb-8">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-300 text-base md:text-lg flex flex-col items-start gap-6"
                    >
                      {children}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
