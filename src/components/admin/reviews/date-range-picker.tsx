"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { type DateRange, DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calender"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  className?: string
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({ className, dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [month, setMonth] = React.useState<Date>(new Date())

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex items-center justify-between p-2">
            <Button
              variant="outline"
              className="h-7 w-7 bg-transparent p-0"
              onClick={() => setMonth(addDays(month, -30))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">{format(month, "MMMM yyyy")}</div>
            <Button
              variant="outline"
              className="h-7 w-7 bg-transparent p-0"
              onClick={() => setMonth(addDays(month, 30))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            month={month}
            onMonthChange={setMonth}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

