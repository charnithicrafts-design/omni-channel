import { Routes, Route } from 'react-router'
import './App.css'

const Dashboard = () => <div>Dashboard</div>
const Wizard = () => <div>Wizard</div>

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wizard" element={<Wizard />} />
      </Routes>
    </div>
  )
}

export default App
