"use client";

import Link from "next/link";
import { ExpandableCard } from "@/components/ui/expandable-card";

type CardItem = {
  title: string;
  description: string;
  src?: string;
};

type Props = {
  heading?: string;
  paragraph?: string;
  ctaLabel?: string;
  ctaHref?: string;
  cards?: CardItem[];
};

export default function ContentSection({
  heading,
  paragraph,
  ctaLabel,
  ctaHref,
  cards,
}: Props) {
  const items: CardItem[] =
    cards && cards.length > 0
      ? cards.slice(0, 3)
      : [
          {
            title: "Actionable Signals",
            description:
              "Surface leading indicators with high signal-to-noise.",
            src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
          },
          {
            title: "Structured Depth",
            description:
              "Layered analysis that stays consistent across updates.",
            src: "https://images.unsplash.com/photo-1477337819265-12f546b3c052?q=80&w=1600&auto=format&fit=crop",
          },
          {
            title: "Competitive Edge",
            description: "Get to conviction faster than consensus.",
            src: "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1600&auto=format&fit=crop",
          },
        ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-col items-start gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              {heading ?? "Built to inform real capital decisions"}
            </h2>
            <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-300">
              {paragraph ??
                "We focus on signals that matter and insights that create an edge before consensus."}
            </p>
          </div>
          <Link
            href={ctaHref ?? "/research"}
            className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {ctaLabel ?? "See the research"}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <ExpandableCard
              key={item.title}
              title={item.title}
              description={item.description}
              src={item.src}
              ctaText="Open"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
