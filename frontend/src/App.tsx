import { Routes, Route, useNavigate, useSearchParams } from 'react-router'
import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Wizard from './components/wizard/Wizard'
import QueryBuilder from './components/research/QueryBuilder'
import ResearchCharts from './components/research/ResearchCharts'
import ReportViewer from './components/research/ReportViewer'
import ThemeSelector from './components/wizard/ThemeSelector'
import MediaUploader from './components/wizard/MediaUploader'
import LivePreview from './components/wizard/LivePreview'
import DeploymentStatus from './components/wizard/DeploymentStatus'
import './App.css'

const WizardPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const workflowType = searchParams.get('type') || 'research'

  // Research State
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')

  // Album State
  const [selectedTheme, setSelectedTheme] = useState('minimal')
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])

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

  const themes = [
    { id: 'minimal', name: 'Minimalist', preview: '#ffffff' },
    { id: 'dark', name: 'Dark Mode', preview: '#1a1a1a' },
    { id: 'vibrant', name: 'Vibrant', preview: '#ff4400' },
  ]

  const researchSteps = [
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

  const albumSteps = [
    {
      title: 'Photography: Upload & Theme',
      content: (
        <div className="space-y-8">
          <section>
            <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">1. Select Theme</h4>
            <ThemeSelector themes={themes} selectedThemeId={selectedTheme} onSelect={setSelectedTheme} />
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">2. Upload Images</h4>
              <MediaUploader 
                onUpload={(files) => {
                  const newFiles = Array.from(files).map(f => ({ 
                    name: f.name, 
                    progress: 100, 
                    status: 'completed',
                    url: URL.createObjectURL(f) 
                  }))
                  setUploadedFiles([...uploadedFiles, ...newFiles])
                }} 
                uploadingFiles={uploadedFiles}
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">3. Live Preview</h4>
              <LivePreview themeId={selectedTheme} images={uploadedFiles.map(f => f.url)} />
            </div>
          </section>
        </div>
      ),
    },
    {
      title: 'Deployment Status',
      content: (
        <DeploymentStatus status="completed" deploymentUrl="https://example.com" />
      ),
    },
  ]

  return (
    <Wizard
      steps={workflowType === 'album' ? albumSteps : researchSteps}
      onComplete={() => {
        alert('Workflow completed successfully!')
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
