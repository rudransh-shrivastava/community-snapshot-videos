'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A horizontal bar chart'

const chartData = [
  { month: 'Project 1', releases: 12 },
  { month: 'Project 2', releases: 5 },
  { month: 'Project 3', releases: 23 },
  { month: 'Project 4', releases: 3 },
  { month: 'Project 5', releases: 29 },
  { month: 'Project 6', releases: 21 },
  { month: 'project 7', releases: 23 },
  { month: 'Project 8', releases: 3 },
  { month: 'Project 9', releases: 19 },
  { month: 'Project 10', releases: 1 },
  { month: 'Project 11', releases: 7 },
  { month: 'Project 12', releases: 8 },
  { month: 'Project 14', releases: 21 },
]

const chartConfig = {
  releases: {
    label: 'Releases',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function ChartBarHorizontal() {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Releases</CardTitle>
        <CardDescription>September 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            className=""
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="releases" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100}
              tickFormatter={(value) => value.slice(0)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="releases" fill="var(--color-releases)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
