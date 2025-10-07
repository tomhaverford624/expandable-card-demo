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
    const title = heading ?? 'Built for modern development teams'
    const body = paragraph ?? 'Our platform is designed with the needs of fast-moving teams in mind. We focus on delivering tools that create clarity and enable better decision-making at every level.'
    const label = ctaLabel ?? 'Learn more'
    const href = ctaHref ?? '/learn-more'

    const items: CardItem[] = (cards && cards.length > 0) ? cards.slice(0,3) : [
      { title: 'Actionable Insights', description: 'Surface what matters most' },
      { title: 'Structured Data', description: 'Consistent and reliable' },
      { title: 'Competitive Edge', description: 'Stay ahead of the curve' },
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
                          <p>Click any card to learn more about our platform capabilities and how we can help your team succeed.</p>
                        </div>
                      )}
                    </ExpandableCard>
                  ))}
                </div>
            </div>
        </section>
    )
}
