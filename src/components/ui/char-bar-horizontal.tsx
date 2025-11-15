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

interface ChartData {
  project: string
  releases: number
}

const chartConfig = {
  releases: {
    label: 'Releases',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function ChartBarHorizontal({ chartData }: { chartData: ChartData[] }) {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Releases</CardTitle>
        <CardDescription>Top 10 releases from September 2025</CardDescription>
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
              dataKey="project"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={200}
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
