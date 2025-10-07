import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { ExpandableCard } from "@/components/ui/expandable-card"

type CardItem = { title?: string; description?: string; imageUrl?: string; content?: string }

type Props = {
  heading?: string
  paragraph?: string
  ctaLabel?: string
  ctaHref?: string
  cards?: CardItem[]
}

export default function ContentSection({ heading, paragraph, ctaLabel, ctaHref, cards }: Props) {
    const title = heading ?? 'Built to inform real capital decisions'
    const body = paragraph ?? 'Alea Research is shaped by the discipline allocators demand. We focus on signals that matter, and insights that create an edge before consensus. The goal is to deliver research that informs real capital deployment.'
    const label = ctaLabel ?? 'See the research'
    const href = ctaHref ?? '/research'

    const items: CardItem[] = (cards && cards.length > 0) ? cards.slice(0,3) : [
      { title: 'Purpose-built for product development', description: '' },
      { title: 'Designed to move fast', description: '' },
      { title: 'Crafted to perfection', description: '' },
    ]

    return (
        <section className="bg-transparent py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6 md:px-8">
                <div className="grid items-start gap-10 md:grid-cols-2 md:gap-20">
                    <h2 className="text-balance text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.015em] md:tracking-[-0.032em] font-semibold max-w-[20ch]">
                      {title}
                    </h2>
                    <div className="max-w-prose text-muted-foreground md:pt-2">
                        <p className="text-base/7">
                          {body}{' '}
                          <Link href={href} className="inline-flex items-center gap-1 font-medium text-foreground hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background rounded-sm">
                            {label}
                            <ChevronRight className="size-4" aria-hidden="true" />
                          </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {items.map((c, i) => (
                    <ExpandableCard key={i} title={c.title || ''} description={c.description || ''} src={c.imageUrl || ''}>
                      {c.content ? (
                        <div className="space-y-4 text-left">
                          {c.content.split(/\n\n+/).map((para, idx) => (
                            <p key={idx}>{para}</p>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4 text-left">
                          <p>Expand to learn more about how we build for allocators.</p>
                        </div>
                      )}
                    </ExpandableCard>
                  ))}
                </div>
            </div>
        </section>
    )
}
