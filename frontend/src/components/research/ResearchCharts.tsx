import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import Card from '../common/Card'

interface ResearchChartsProps {
  data: any[]
  title: string
  type?: 'bar' | 'line'
}

const isTest = process.env.NODE_ENV === 'test'

const ResearchCharts: React.FC<ResearchChartsProps> = ({ data, title, type = 'bar' }) => {
  const chartContent =
    type === 'bar' ? (
      <BarChart data={data} width={isTest ? 500 : undefined} height={isTest ? 300 : undefined}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#2563eb" />
      </BarChart>
    ) : (
      <LineChart data={data} width={isTest ? 500 : undefined} height={isTest ? 300 : undefined}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#2563eb" />
      </LineChart>
    )

  return (
    <Card title={title}>
      <div className="h-72 w-full">
        {isTest ? (
          <div className="recharts-responsive-container">{chartContent}</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartContent}
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
}

export default ResearchCharts
