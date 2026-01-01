"use client"

import { useState } from "react"
import { ChevronDown, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface AnalyticsData {
  date: string
  views_count: number
  unique_visitors: number
}

interface ViewsChartProps {
  data: AnalyticsData[]
}

export function ViewsChart({ data }: ViewsChartProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [metric, setMetric] = useState("المشاهدات")
  const [period, setPeriod] = useState("آخر 30 يوم")

  // Generate chart data from props or use sample data
  const chartData =
    data.length > 0
      ? data.map((item, index) => ({
          day: index + 1,
          value: metric === "المشاهدات" ? item.views_count : item.unique_visitors,
          date: new Date(item.date).toLocaleDateString("ar-EG", { month: "short", day: "numeric" }),
        }))
      : Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          value: Math.floor(Math.random() * 280) + 20,
          date: `${i + 1}`,
        }))

  const maxValue = Math.max(...chartData.map((d) => d.value), 300)
  const dotSize = 8
  const dotsPerColumn = 10

  const renderDots = (value: number, day: number) => {
    const normalizedValue = Math.min(value, maxValue)
    const filledDots = Math.round((normalizedValue / maxValue) * dotsPerColumn)
    const isSelected = selectedDay === day
    const isHovered = hoveredDay === day

    return (
      <div
        className="flex flex-col-reverse gap-[2px] cursor-pointer"
        onMouseEnter={() => setHoveredDay(day)}
        onMouseLeave={() => setHoveredDay(null)}
        onClick={() => setSelectedDay(day)}
      >
        {Array.from({ length: dotsPerColumn }).map((_, index) => (
          <div
            key={index}
            className="rounded-full transition-colors duration-200"
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: index < filledDots ? (isSelected || isHovered ? "#1c5b45" : "#86efac") : "transparent",
            }}
          />
        ))}
      </div>
    )
  }

  const targetValue = Math.round(maxValue * 0.7)

  return (
    <div className="w-full p-6 bg-card rounded-xl border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-lg text-foreground dark:text-white">إحصائيات الزيارات</h3>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-text-muted gap-1">
                {metric}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setMetric("المشاهدات")}>المشاهدات</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMetric("الزوار")}>الزوار</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-text-muted gap-1">
                {period}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPeriod("آخر 7 أيام")}>آخر 7 أيام</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("آخر 30 يوم")}>آخر 30 يوم</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("آخر 90 يوم")}>آخر 90 يوم</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="text-text-muted">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute right-0 top-0 bottom-8 flex flex-col justify-between text-sm text-text-muted">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.66)}</span>
          <span>{Math.round(maxValue * 0.33)}</span>
          <span>0</span>
        </div>

        {/* Target line with tooltip */}
        <div
          className="absolute right-12 left-0 flex items-center"
          style={{ top: `${((maxValue - targetValue) / maxValue) * 100}%` }}
        >
          <div className="bg-primary text-white text-xs px-2 py-1 rounded">{targetValue}</div>
          <div className="flex-1 border-t-2 border-dashed border-primary/40" style={{ marginRight: 8 }} />
        </div>

        {/* Dots Chart */}
        <div className="mr-12 flex items-end justify-between gap-1 overflow-x-auto" style={{ height: 200 }}>
          {chartData.map((item) => (
            <div key={item.day} className="flex flex-col items-center flex-shrink-0">
              {renderDots(item.value, item.day)}
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="mr-12 flex justify-between mt-4 text-sm text-text-muted">
          {chartData
            .filter((_, i) => i % 5 === 0)
            .map((item) => (
              <span
                key={item.day}
                className={`${selectedDay === item.day ? "bg-primary text-white px-2 py-0.5 rounded" : ""}`}
              >
                {item.date}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}
