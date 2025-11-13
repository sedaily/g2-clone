"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUp, ChevronLeft, ChevronRight } from "lucide-react"
import { todayKST } from "@/lib/date-utils"
import { getArchiveStructure, GAME_TYPE_MAP, type ArchiveStructure } from "@/lib/games-data"
import { ArchiveCard } from "@/components/games/ArchiveCard"

export default function G3ArchivePage() {
  const router = useRouter()

  const [archiveData, setArchiveData] = useState<ArchiveStructure>({ years: [] })
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function loadArchive() {
      try {
        const data = await getArchiveStructure(GAME_TYPE_MAP.g3)
        setArchiveData(data)
      } catch (error) {
        console.error("[v0] Failed to load archive:", error)
      } finally {
        setLoading(false)
      }
    }
    loadArchive()
  }, [])

  const hasData = archiveData.years.length > 0

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 모든 날짜를 최신순으로 정렬
  const allDates: string[] = []
  for (const yearData of archiveData.years) {
    for (const monthData of yearData.months) {
      allDates.push(...monthData.dates)
    }
  }
  allDates.sort((a, b) => b.localeCompare(a)) // 최신순 정렬

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(allDates.length - 1, prev + 1))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const today = todayKST()

  // 로딩 중일 때 로딩 UI 표시
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-lg text-muted-foreground">로딩 중...</p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // 로딩 완료 후 데이터가 없을 때만 표시
  if (!hasData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">아카이브 데이터가 없습니다.</p>
            <Button onClick={() => router.back()}>돌아가기</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/backgrounds/g3-signal-waves.png')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#FFE7DD]/90 to-[#FFD8CC]/90" />

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-[#DB6B5E]/20">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#184E77] mb-2">ARCHIVE</h1>
            <p className="text-[#266D7E]">시그널 디코딩</p>
          </div>

          {/* 카운터 */}
          <div className="mb-6 text-center">
            <p className="text-[#266D7E]/80 text-sm">
              {currentIndex + 1} / {allDates.length}
            </p>
          </div>

          {/* 가로 스크롤 아카이브 */}
          <div className="relative">
            {/* 이전/다음 버튼 (데스크탑) */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 w-10 h-10 items-center justify-center bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed rounded-full backdrop-blur-sm transition-all"
              aria-label="이전"
            >
              <ChevronLeft className="w-6 h-6 text-[#184E77]" />
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex === allDates.length - 1}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 w-10 h-10 items-center justify-center bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed rounded-full backdrop-blur-sm transition-all"
              aria-label="다음"
            >
              <ChevronRight className="w-6 h-6 text-[#184E77]" />
            </button>

            {/* 스크롤 컨테이너 */}
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {allDates.map((date) => {
                  const isToday = date === today
                  const questionCount = 4
                  const shortDate = date.replace(/-/g, '')

                  return (
                    <div key={date} className="w-full shrink-0 snap-center px-1">
                      <ArchiveCard
                        gameType="g3"
                        date={date}
                        questionCount={questionCount}
                        isToday={isToday}
                        href={`/games/g3/${shortDate}`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 모바일 스와이프 힌트 */}
            <div className="md:hidden mt-4 text-center">
              <p className="text-[#266D7E]/60 text-xs">← 좌우로 스와이프하세요 →</p>
            </div>
          </div>

          {/* 이전/다음 버튼 (모바일) */}
          <div className="md:hidden flex justify-center gap-4 mt-6">
            <Button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              variant="outline"
              size="sm"
              className="bg-white/50 border-[#DB6B5E]/20 text-[#184E77] hover:bg-white/70 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              이전
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentIndex === allDates.length - 1}
              variant="outline"
              size="sm"
              className="bg-white/50 border-[#DB6B5E]/20 text-[#184E77] hover:bg-white/70 disabled:opacity-30"
            >
              다음
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Back to top button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-[#DB6B5E] hover:bg-[#C85B4E] text-white rounded-full shadow-lg transition-all z-50"
              aria-label="맨 위로 가기"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button size="lg" onClick={() => router.back()} className="bg-[#DB6B5E] hover:bg-[#C85B4E]">
              오늘의 퀴즈 하러가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
