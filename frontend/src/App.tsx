import { Routes, Route, useNavigate } from 'react-router'
import Layout from './components/Layout'
import Wizard from './components/wizard/Wizard'
import './App.css'

const Dashboard = () => (
  <div>
    <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
    <p className="mt-4 text-gray-600">Welcome to your Omni-Channel portal.</p>
  </div>
)

const WizardPage = () => {
  const navigate = useNavigate()
  
  const steps = [
    { title: 'Select Workflow', content: <div className="p-4 text-gray-700">Choose between Market Research or Photography Album.</div> },
    { title: 'Configure', content: <div className="p-4 text-gray-700">Set up your parameters and target audience.</div> },
    { title: 'Review & Run', content: <div className="p-4 text-gray-700">Verify your settings and start the AI pipeline.</div> },
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
