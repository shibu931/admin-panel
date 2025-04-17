"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// const chartData = [
//   { date: "2024-04-01", sales: 222, value: 150 },
//   { date: "2024-04-02", sales: 97, value: 180 },
//   { date: "2024-04-03", sales: 167, value: 120 },
//   { date: "2024-04-04", sales: 242, value: 260 },
//   { date: "2024-04-05", sales: 373, value: 290 },
//   { date: "2024-04-06", sales: 301, value: 340 },
//   { date: "2024-04-07", sales: 245, value: 180 },
//   { date: "2024-04-08", sales: 409, value: 320 },
//   { date: "2024-04-09", sales: 59, value: 110 },
//   { date: "2024-04-10", sales: 261, value: 190 },
//   { date: "2024-04-11", sales: 327, value: 350 },
//   { date: "2024-04-12", sales: 292, value: 210 },
//   { date: "2024-04-13", sales: 342, value: 380 },
//   { date: "2024-04-14", sales: 137, value: 220 },
//   { date: "2024-04-15", sales: 120, value: 170 },
//   { date: "2024-04-16", sales: 138, value: 190 },
//   { date: "2024-04-17", sales: 446, value: 360 },
//   { date: "2024-04-18", sales: 364, value: 410 },
//   { date: "2024-04-19", sales: 243, value: 180 },
//   { date: "2024-04-20", sales: 89, value: 150 },
//   { date: "2024-04-21", sales: 137, value: 200 },
//   { date: "2024-04-22", sales: 224, value: 170 },
//   { date: "2024-04-23", sales: 138, value: 230 },
//   { date: "2024-04-24", sales: 387, value: 290 },
//   { date: "2024-04-25", sales: 215, value: 250 },
//   { date: "2024-04-26", sales: 75, value: 130 },
//   { date: "2024-04-27", sales: 383, value: 420 },
//   { date: "2024-04-28", sales: 122, value: 180 },
//   { date: "2024-04-29", sales: 315, value: 240 },
//   { date: "2024-04-30", sales: 454, value: 380 },
//   { date: "2024-05-01", sales: 165, value: 220 },
//   { date: "2024-05-02", sales: 293, value: 310 },
//   { date: "2024-05-03", sales: 247, value: 190 },
//   { date: "2024-05-04", sales: 385, value: 420 },
//   { date: "2024-05-05", sales: 481, value: 390 },
//   { date: "2024-05-06", sales: 498, value: 520 },
//   { date: "2024-05-07", sales: 388, value: 300 },
//   { date: "2024-05-08", sales: 149, value: 210 },
//   { date: "2024-05-09", sales: 227, value: 180 },
//   { date: "2024-05-10", sales: 293, value: 330 },
//   { date: "2024-05-11", sales: 335, value: 270 },
//   { date: "2024-05-12", sales: 197, value: 240 },
//   { date: "2024-05-13", sales: 197, value: 160 },
//   { date: "2024-05-14", sales: 448, value: 490 },
//   { date: "2024-05-15", sales: 473, value: 380 },
//   { date: "2024-05-16", sales: 338, value: 400 },
//   { date: "2024-05-17", sales: 499, value: 420 },
//   { date: "2024-05-18", sales: 315, value: 350 },
//   { date: "2024-05-19", sales: 235, value: 180 },
//   { date: "2024-05-20", sales: 177, value: 230 },
//   { date: "2024-05-21", sales: 82, value: 140 },
//   { date: "2024-05-22", sales: 81, value: 120 },
//   { date: "2024-05-23", sales: 252, value: 290 },
//   { date: "2024-05-24", sales: 294, value: 220 },
//   { date: "2024-05-25", sales: 201, value: 250 },
//   { date: "2024-05-26", sales: 213, value: 170 },
//   { date: "2024-05-27", sales: 420, value: 460 },
//   { date: "2024-05-28", sales: 233, value: 190 },
//   { date: "2024-05-29", sales: 78, value: 130 },
//   { date: "2024-05-30", sales: 340, value: 280 },
//   { date: "2024-05-31", sales: 178, value: 230 },
//   { date: "2024-06-01", sales: 178, value: 200 },
//   { date: "2024-06-02", sales: 470, value: 410 },
//   { date: "2024-06-03", sales: 103, value: 160 },
//   { date: "2024-06-04", sales: 439, value: 380 },
//   { date: "2024-06-05", sales: 88, value: 140 },
//   { date: "2024-06-06", sales: 294, value: 250 },
//   { date: "2024-06-07", sales: 323, value: 370 },
//   { date: "2024-06-08", sales: 385, value: 320 },
//   { date: "2024-06-09", sales: 438, value: 480 },
//   { date: "2024-06-10", sales: 155, value: 200 },
//   { date: "2024-06-11", sales: 92, value: 150 },
//   { date: "2024-06-12", sales: 492, value: 420 },
//   { date: "2024-06-13", sales: 81, value: 130 },
//   { date: "2024-06-14", sales: 426, value: 380 },
//   { date: "2024-06-15", sales: 307, value: 350 },
//   { date: "2024-06-16", sales: 371, value: 310 },
//   { date: "2024-06-17", sales: 475, value: 520 },
//   { date: "2024-06-18", sales: 107, value: 170 },
//   { date: "2024-06-19", sales: 341, value: 290 },
//   { date: "2024-06-20", sales: 408, value: 450 },
//   { date: "2024-06-21", sales: 169, value: 210 },
//   { date: "2024-06-22", sales: 317, value: 270 },
//   { date: "2024-06-23", sales: 480, value: 530 },
//   { date: "2024-06-24", sales: 132, value: 180 },
//   { date: "2024-06-25", sales: 141, value: 190 },
//   { date: "2024-06-26", sales: 434, value: 380 },
//   { date: "2024-06-27", sales: 448, value: 490 },
//   { date: "2024-06-28", sales: 149, value: 200 },
//   { date: "2024-06-29", sales: 103, value: 160 },
//   { date: "2024-06-30", sales: 446, value: 400 },
// ]

const chartConfig = {
  visitors: {
    label: "Sales",
  },
  sales: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  value: {
    label: "Value",
    color: "hsl(var(--chart-2))",
  },
} 

export function Chart({chartData}) {
  const [timeRange, setTimeRange] = React.useState("90d")
 
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-3 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Orders - Chart</CardTitle>
          <CardDescription>
            Showing total sales for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillsales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillvalue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillsales)"
              stroke="var(--color-sales)"
              stackId="a"
            />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillsales)"
              stroke="var(--color-sales)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
