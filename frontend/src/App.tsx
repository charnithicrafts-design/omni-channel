import { Routes, Route, useNavigate } from 'react-router'
import { useState } from 'react'
import Layout from './components/Layout'
import Wizard from './components/wizard/Wizard'
import QueryBuilder from './components/research/QueryBuilder'
import ResearchCharts from './components/research/ResearchCharts'
import ReportViewer from './components/research/ReportViewer'
import './App.css'

const Dashboard = () => (
  <div>
    <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
    <p className="mt-4 text-gray-600">Welcome to your Omni-Channel portal.</p>
  </div>
)

const WizardPage = () => {
  const navigate = useNavigate()
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')

  const sampleData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ]

  const mockReport = {
    title: `Market Analysis: ${topic || 'Organic Coffee'}`,
    summary: `The market for ${topic || 'Organic Coffee'} is seeing significant growth in urban areas among ${audience || 'millennials'}.`,
    findings: [
      'Increased demand for sustainable packaging.',
      'Rise in home-brewing popularity.',
      'Growth in subscription-based services.',
    ],
  }

  const steps = [
    {
      title: 'Configure Research',
      content: (
        <QueryBuilder
          topic={topic}
          audience={audience}
          onTopicChange={setTopic}
          onAudienceChange={setAudience}
        />
      ),
    },
    {
      title: 'Visual Insights',
      content: (
        <div className="space-y-6">
          <ResearchCharts data={sampleData} title="Monthly Growth Trend" type="line" />
          <ResearchCharts data={sampleData} title="Category Performance" type="bar" />
        </div>
      ),
    },
    {
      title: 'Final Report',
      content: (
        <ReportViewer
          report={mockReport}
          onExport={(format) => alert(`Exporting as ${format}...`)}
          onShare={() => alert('Link copied to clipboard!')}
        />
      ),
    },
  ]

  return (
    <Wizard
      steps={steps}
      onComplete={() => {
        alert('Workflow started successfully!')
        navigate('/')
      }}
      onCancel={() => navigate('/')}
    />
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wizard" element={<WizardPage />} />
      </Routes>
    </Layout>
  )
}

export default App
