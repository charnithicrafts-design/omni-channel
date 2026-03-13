import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import './App.css'

const Dashboard = () => (
  <div>
    <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
    <p className="mt-4 text-gray-600">Welcome to your Omni-Channel portal.</p>
  </div>
)

const Wizard = () => (
  <div>
    <h2 className="text-3xl font-semibold text-gray-800">Wizard</h2>
    <p className="mt-4 text-gray-600">Follow the steps to configure your workflow.</p>
  </div>
)

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wizard" element={<Wizard />} />
      </Routes>
    </Layout>
  )
}

export default App
