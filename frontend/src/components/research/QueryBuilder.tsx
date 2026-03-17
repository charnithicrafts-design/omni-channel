import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'

interface QueryBuilderProps {
  topic?: string
  audience?: string
  onTopicChange?: (value: string) => void
  onAudienceChange?: (value: string) => void
  onSubmit?: (data: { topic: string; audience: string }) => void
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({ 
  topic: propsTopic, 
  audience: propsAudience, 
  onTopicChange, 
  onAudienceChange,
  onSubmit 
}) => {
  const [internalTopic, setInternalTopic] = useState('')
  const [internalAudience, setInternalAudience] = useState('')
  const [errors, setErrors] = useState<{ topic?: string; audience?: string }>({})

  const topic = propsTopic ?? internalTopic
  const audience = propsAudience ?? internalAudience

  const handleTopicChange = (value: string) => {
    if (onTopicChange) onTopicChange(value)
    else setInternalTopic(value)
  }

  const handleAudienceChange = (value: string) => {
    if (onAudienceChange) onAudienceChange(value)
    else setInternalAudience(value)
  }

  const validate = () => {
    const newErrors: { topic?: string; audience?: string } = {}
    if (!topic?.trim()) newErrors.topic = 'Topic is required'
    if (!audience?.trim()) newErrors.audience = 'Audience is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate() && onSubmit) {
      onSubmit({ topic, audience })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Research Topic"
        placeholder="e.g., Renewable Energy Trends"
        value={topic}
        onChange={(e) => handleTopicChange(e.target.value)}
        error={errors.topic}
      />
      <Input
        label="Target Audience"
        placeholder="e.g., Policy makers in Europe"
        value={audience}
        onChange={(e) => handleAudienceChange(e.target.value)}
        error={errors.audience}
      />
      {onSubmit && (
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Submit Research
          </Button>
        </div>
      )}
    </form>
  )
}

export default QueryBuilder
