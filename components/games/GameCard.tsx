"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { GameMeta } from "@/lib/games-data"

interface GameCardProps {
  game: GameMeta
}

export function GameCard({ game }: GameCardProps) {
  const playHref = game.playUrl || `${game.slug}/2024-01-15`

  return (
    <article
      className="game-card mx-auto max-w-[460px] w-full flex flex-col rounded-2xl border-2 p-6 md:p-8 transition-all duration-200 hover:-translate-y-1 hover:rotate-[-1.5deg] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] relative"
      style={{ 
        backgroundColor: game.solidBgColor,
        borderColor: game.color 
      }}
    >
      <div 
        className="pointer-events-none absolute inset-2 rounded-2xl border opacity-30"
        style={{ borderColor: game.color }}
      ></div>

      {game.isNew && (
        <span 
          className="absolute left-1/2 -translate-x-1/2 -top-3 md:-top-3.5 rounded-full border-2 bg-white px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-semibold shadow-[2px_2px_0_rgba(0,0,0,0.2)] z-10 tracking-wide"
          style={{ borderColor: game.color, color: game.color }}
        >
          NEW
        </span>
      )}

      <div className="aspect-4/3 flex items-center justify-center mb-6 relative">
        {/* 용 뒤 하이라이트 원 */}
        <div 
          className="absolute w-[180px] h-[180px] md:w-[230px] md:h-[230px] rounded-full opacity-12"
          style={{ backgroundColor: '#00C2A8' }}
        ></div>
        <Image
          src={game.image || "/placeholder.svg"}
          alt={`${game.title} illustration`}
          width={400}
          height={300}
          className="object-contain w-full h-full p-8 md:p-10 lg:p-12 relative z-10"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        <h3
          className="text-2xl md:text-3xl font-title text-center tracking-[-0.01em] leading-tight mb-0 text-gray-900"
        >
          {game.title}
        </h3>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full rounded-xl bg-black text-white py-3.5 font-semibold shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
            aria-label={`Play ${game.title}`}
          >
            <Link 
              href={playHref}
              className="transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = game.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ''
              }}
            >
              Play
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl border-2 bg-white/50 py-3.5 font-semibold hover:bg-white transition-all hover:scale-[1.02]"
            style={{ borderColor: game.color, color: game.color }}
            aria-label={`View ${game.title} archive`}
          >
            <Link href={`${game.slug}/archive`}>Archive</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
