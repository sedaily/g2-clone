import type { Metadata } from "next"
import { GameHubGrid } from "@/components/games/GameHubGrid"
import Image from "next/image"

export const metadata: Metadata = {
  title: "게임 허브 | 서울경제 게임",
  description: "모든 퍼즐을 무료로 플레이하세요. 오늘의 경제 퀴즈, 뉴스 성향 테스트, 뉴스 단어 맞추기",
  openGraph: {
    title: "게임 허브 | 서울경제 게임",
    description: "모든 퍼즐을 무료로 플레이하세요",
  },
}

export default function GamesPage() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1240px] py-10 md:py-14">
      <div className="grid grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center mb-16 md:mb-20 lg:mb-24">
        {/* Left: Illustration */}
        <div className="col-span-12 md:col-span-6 flex justify-center md:justify-start">
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px] aspect-square group">
            {/* 뒤쪽 배경 원 (입체감) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full bg-white/40 blur-2xl" />
            </div>
            {/* 이미지 컨테이너 */}
            <div className="relative w-full h-full rounded-xl overflow-hidden p-1.5 sm:p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_44px_rgba(0,0,0,0.1)] md:hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 bg-white/30 backdrop-blur-sm border border-white/50">
              <Image
                src="/games/hero-main.png"
                alt="Seoul Economic News Games - Three interlocking gears representing Black Swan, Prisoner's Dilemma, and Signal Decoding"
                fill
                className="object-contain mx-auto opacity-95 brightness-95 contrast-95"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div className="col-span-12 md:col-span-6 md:pl-4 lg:pl-8 lg:max-w-[600px] mx-auto md:mx-0">
          <h1
            className="text-3xl lg:text-4xl font-title uppercase mb-4 md:mb-5 text-center md:text-left"
            style={{ 
              color: "#132333",
              lineHeight: "1.3",
              letterSpacing: "-0.015em"
            }}
          >
            Seoul Economic News Games
          </h1>
          <p
            className="mt-4 text-[15px] font-sans text-center md:text-left opacity-90"
            style={{ 
              color: "#2A3A45",
              lineHeight: "1.7",
              letterSpacing: "-0.005em"
            }}
          >
            <span className="font-bold">하루 5분</span>, 기사로 문해력과 판단력을 단련하고
            <br />
            지성을 다듬는 실전형 뉴스 퀴즈.
          </p>
        </div>
      </div>

      {/* Games grid - unchanged */}
      <GameHubGrid />
    </section>
  )
}
