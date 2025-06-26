import { useState, useRef, useEffect } from "react"
import type { DateRange, DateRangePickerProps } from "../../types/types"



const DateRangePicker = ({ className = '', dropdownDirection = 'left' }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 5, 1),
    to: new Date(2025, 5, 17),
  })
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 1))
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  }

  const getDisplayText = () => {
    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
    }
    return "Select date range"
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const isDateInRange = (date: Date) => {
    if (!dateRange.from || !dateRange.to) return false
    return date >= dateRange.from && date <= dateRange.to
  }

  const isDateSelected = (date: Date) => {
    if (!dateRange.from || !dateRange.to) return false
    return date.getTime() === dateRange.from.getTime() || date.getTime() === dateRange.to.getTime()
  }

  const handleDateClick = (date: Date) => {
    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      setDateRange({ from: date, to: null })
    } else if (dateRange.from && !dateRange.to) {
      if (date < dateRange.from) {
        setDateRange({ from: date, to: dateRange.from })
      } else {
        setDateRange({ from: dateRange.from, to: date })
      }
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const renderCalendar = (monthOffset = 0) => {
    const displayMonth = new Date(currentMonth)
    displayMonth.setMonth(currentMonth.getMonth() + monthOffset)

    const daysInMonth = getDaysInMonth(displayMonth)
    const firstDay = getFirstDayOfMonth(displayMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day)
      const isInRange = isDateInRange(date)
      const isSelected = isDateSelected(date)

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={`w-8 h-8 text-sm rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ${
            isSelected ? "bg-black text-white" : isInRange ? "bg-gray-100" : ""
          }`}
        >
          {day}
        </button>,
      )
    }

    return (
      <div className="flex flex-col">
        <div className="text-sm font-medium text-center mb-4">{getMonthName(displayMonth)}</div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="w-8 h-8 text-xs text-gray-500 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-start w-[320px] px-3 py-1 text-left font-normal bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 ${className}`}
      >
        <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span className={dateRange.from && dateRange.to ? "text-gray-900" : "text-gray-500"}>{getDisplayText()}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-[500px] ${
            dropdownDirection === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="text-sm text-gray-500 mb-4 px-2">Select date range</div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
          <div className="flex gap-8">
            {renderCalendar(0)}
            {renderCalendar(1)}
          </div>
        </div>
      )}
    </div>
  )
}

export type { DateRangePickerProps };
export default DateRangePicker
