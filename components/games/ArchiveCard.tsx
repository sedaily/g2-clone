import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface ArchiveCardProps {
  gameType: "g1" | "g2" | "g3"
  date: string // YYYY-MM-DD format
  questionCount: number
  isToday: boolean
  href: string
}

const GAME_CONFIG = {
  g1: {
    image: "/images/g1-woodcut-removed.png",
    cardBg: "#F0F6FF", // 블랙스완: 연한 하늘색 (메인 카드와 동일)
    listBg: "bg-[rgba(240,246,255,0.8)]", // 연한 하늘색 배경
    textColor: "text-gray-900", // 글자 진한 회색
    textSecondary: "text-gray-700", // 보조 텍스트
    badgeText: "!text-[#5FA8FF]", // 포인트 색상
    badgeBg: "!bg-[#5FA8FF]/10", // 포인트 색상 배경
    badgeBorder: "!border-[#5FA8FF]/30", // 포인트 색상 테두리
    focusColor: "#5FA8FF", // 메인 카드와 동일한 포인트 색상
    borderColor: "#5FA8FF", // 메인 카드와 동일한 테두리 색상
    borderOpacity: "border-[#5FA8FF]",
    shadow: "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    hoverShadow: "hover:shadow-[0_10px_28px_rgba(0,0,0,0.16)]",
  },
  g2: {
    image: "/images/g2-woodcut-removed.png",
    cardBg: "#F9F3E8", // 죄수의 딜레마: 연한 크림색 (메인 카드와 동일)
    listBg: "bg-[rgba(249,243,232,0.8)]", // 연한 크림색 배경
    textColor: "text-gray-900",
    textSecondary: "text-gray-700",
    badgeText: "!text-[#C2A878]", // 포인트 색상
    badgeBg: "!bg-[#C2A878]/10", // 포인트 색상 배경
    badgeBorder: "!border-[#C2A878]/30", // 포인트 색상 테두리
    focusColor: "#C2A878",
    borderColor: "#C2A878",
    borderOpacity: "border-[#C2A878]",
    shadow: "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    hoverShadow: "hover:shadow-[0_10px_28px_rgba(0,0,0,0.16)]",
  },
  g3: {
    image: "/images/g3-woodcut-removed.png",
    cardBg: "#FDE9E8", // 시그널 디코딩: 연한 살구색 (메인 카드와 동일)
    listBg: "bg-[rgba(253,233,232,0.8)]", // 연한 살구색 배경
    textColor: "text-gray-900",
    textSecondary: "text-gray-700",
    badgeText: "!text-[#F0735A]", // 포인트 색상
    badgeBg: "!bg-[#F0735A]/10", // 포인트 색상 배경
    badgeBorder: "!border-[#F0735A]/30", // 포인트 색상 테두리
    focusColor: "#F0735A",
    borderColor: "#F0735A",
    borderOpacity: "border-[#F0735A]",
    shadow: "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    hoverShadow: "hover:shadow-[0_10px_28px_rgba(0,0,0,0.16)]",
  },
}

export function ArchiveCard({ gameType, date, questionCount, isToday, href }: ArchiveCardProps) {
  const config = GAME_CONFIG[gameType]

  const dateObj = new Date(date + "T00:00:00")
  
  // 한글 날짜 포맷
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const koreanDate = `${year}년 ${month}월 ${day}일`

  return (
    <Link
      href={href}
      className={`group block rounded-2xl border ${config.borderOpacity} ${config.listBg} backdrop-blur-[2px] ${config.shadow} ${config.hoverShadow} hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-offset-2`}
      style={{ outlineColor: config.focusColor }}
    >
      <div className="flex items-center gap-4 md:gap-5 p-5 md:p-6 min-h-[120px] md:min-h-[130px]">
        <div
          className="shrink-0 relative w-18 h-24 md:w-22 md:h-28 rounded-xl overflow-hidden border border-black/25 shadow-sm woodcut-texture flex items-center justify-center"
          style={{ backgroundColor: config.cardBg }}
        >
          {/* 초록색 원 하이라이트 */}
          <div 
            className="absolute w-16 h-16 md:w-18 md:h-18 rounded-full"
            style={{ backgroundColor: '#E2F4EE' }}
          />
          <Image
            src={config.image || "/placeholder.svg"}
            alt={`${gameType} woodcut thumbnail`}
            fill
            className="object-contain p-2 relative z-10"
            sizes="(max-width: 768px) 72px, 88px"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          {isToday ? (
            <Badge
              className={`mb-2.5 text-[11px] md:text-xs px-2.5 py-1 rounded-full ${config.badgeText} ${config.badgeBg} ${config.badgeBorder} font-sans`}
            >
              오늘의 퀴즈
            </Badge>
          ) : (
            <Badge
              className={`mb-2.5 text-[11px] md:text-xs px-2.5 py-1 rounded-full border ${config.badgeText} ${config.badgeBg} ${config.badgeBorder} font-sans`}
            >
              {questionCount}문제
            </Badge>
          )}

          <h3
            className={`text-lg md:text-xl font-title font-semibold ${config.textColor} leading-tight tracking-[-0.01em]`}
          >
            {koreanDate}
          </h3>
        </div>
      </div>
    </Link>
  )
}
