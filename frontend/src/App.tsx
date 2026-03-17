import { Routes, Route, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Wizard from './components/wizard/Wizard'
import QueryBuilder from './components/research/QueryBuilder'
import ResearchCharts from './components/research/ResearchCharts'
import ReportViewer from './components/research/ReportViewer'
import MediaUploader from './components/wizard/MediaUploader'
import ThemeSelector from './components/wizard/ThemeSelector'
import LivePreview from './components/wizard/LivePreview'
import DeploymentStatus from './components/wizard/DeploymentStatus'
import Card from './components/common/Card'
import Button from './components/common/Button'
import { useWorkflowStore } from './store/workflowStore'
import './App.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const setWorkflowType = useWorkflowStore((state) => state.setWorkflowType)

  const handleStartWorkflow = (type: 'research' | 'album') => {
    setWorkflowType(type)
    navigate('/wizard')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Omni-Channel Portal</h2>
        <p className="mt-3 text-lg text-gray-600">Select a workflow to automate your AI pipelines.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Market Research" className="hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Automate data gathering, audience analysis, and generated reports for any market segment.
            </p>
            <Button onClick={() => handleStartWorkflow('research')} fullWidth>
              Start Research Wizard
            </Button>
          </div>
        </Card>

        <Card title="Photography Album" className="hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Create a professional, hosted website for your photography clients in just one click.
            </p>
            <Button onClick={() => handleStartWorkflow('album')} fullWidth>
              Start Album Wizard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Wrapper to handle deployment simulation
const DeploymentContainer = () => {
  const [status, setStatus] = useState<'processing' | 'hosting' | 'completed'>('processing')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStatus('hosting')
            return 100
          }
          return prev + 5
        })
      }, 200)
      return () => clearInterval(interval)
    } else if (status === 'hosting') {
      const timer = setTimeout(() => {
        setStatus('completed')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  return (
    <DeploymentStatus 
      status={status} 
      progress={progress}
      deploymentUrl="https://album.omni-channel.app/client-gallery-123"
    />
  )
}

const WizardPage = () => {
  const navigate = useNavigate()
  const workflowType = useWorkflowStore((state) => state.workflowType)
  
  // Redirect if no workflow type selected
  useEffect(() => {
    if (!workflowType) {
      navigate('/')
    }
  }, [workflowType, navigate])

  // Research State
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')

  // Album State
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [selectedTheme, setSelectedTheme] = useState('minimal')

  const themes = [
    { id: 'minimal', name: 'Minimalist', preview: '#f8fafc' },
    { id: 'dark', name: 'Dark Elegance', preview: '#1e293b' },
    { id: 'vibrant', name: 'Vibrant Portfolio', preview: '#ef4444' },
  ]

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
      title: 'Upload Media',
      content: (
        <MediaUploader 
          onUpload={(files) => {
            const fileList = Array.from(files)
            const newFiles = fileList.map(f => ({ name: f.name, progress: 100, status: 'completed' as const }))
            const newUrls = fileList.map(f => URL.createObjectURL(f))
            setUploadedFiles(newFiles)
            setImageUrls(prev => [...prev, ...newUrls])
          }}
          uploadingFiles={uploadedFiles}
        />
      ),
    },
    {
      title: 'Select Theme',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ThemeSelector 
            themes={themes}
            selectedThemeId={selectedTheme} 
            onSelect={setSelectedTheme} 
          />
          <LivePreview 
            themeId={selectedTheme} 
            images={imageUrls} 
          />
        </div>
      ),
    },
    {
      title: 'Preview & Deploy',
      content: <DeploymentContainer />,
    },
  ]

  const handleComplete = () => {
    alert('Workflow started successfully!')
    navigate('/')
  }

  if (!workflowType) {
    return null
  }

  return (
    <Wizard
      steps={workflowType === 'research' ? researchSteps : albumSteps}
      onComplete={handleComplete}
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
