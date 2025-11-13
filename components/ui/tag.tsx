import type React from "react"
import { cn } from "@/lib/utils"

interface TagProps {
  children: React.ReactNode
  variant?: "default" | "other" | "g1" | "g2" | "g3"
  className?: string
}

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium font-sans",
        variant === "default" && "bg-[#5FA8FF] text-white border border-[#5FA8FF]",
        variant === "g1" && "bg-[#5FA8FF] text-white border border-[#5FA8FF]",
        variant === "g2" && "bg-[#C2A878] text-white border border-[#C2A878]",
        variant === "g3" && "bg-[#F0735A] text-white border border-[#F0735A]",
        variant === "other" && "bg-gray-600 text-white border border-gray-700",
        className,
      )}
    >
      {children}
    </span>
  )
}
