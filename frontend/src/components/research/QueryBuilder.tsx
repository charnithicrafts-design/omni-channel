import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'

interface QueryBuilderProps {
  onSubmit: (data: { topic: string; audience: string }) => void
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')
  const [errors, setErrors] = useState<{ topic?: string; audience?: string }>({})

  const validate = () => {
    const newErrors: { topic?: string; audience?: string } = {}
    if (!topic.trim()) newErrors.topic = 'Topic is required'
    if (!audience.trim()) newErrors.audience = 'Audience is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ topic, audience })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Research Topic"
        placeholder="e.g., Renewable Energy Trends"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        error={errors.topic}
      />
      <Input
        label="Target Audience"
        placeholder="e.g., Policy makers in Europe"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        error={errors.audience}
      />
      <div className="pt-4">
        <Button type="submit" className="w-full">
          Submit Research
        </Button>
      </div>
    </form>
  )
}

export default QueryBuilder
