import React, { useState } from 'react'
import Button from '../common/Button'
import Card from '../common/Card'

export interface WizardStep {
  title: string
  content: React.ReactNode
}

interface WizardProps {
  steps: WizardStep[]
  onComplete: () => void
  onCancel: () => void
}

const Wizard: React.FC<WizardProps> = ({ steps, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const footer = (
    <div className="flex justify-between items-center w-full">
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <div className="space-x-3">
        {!isFirstStep && (
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button onClick={handleNext}>
          {isLastStep ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Progress Indicator */}
      <div className="mb-8 px-4">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-colors ${
                  index <= currentStep ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span className={`mt-2 text-[10px] sm:text-sm font-medium hidden sm:block ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.title}
              </span>
            </div>
          ))}
          {/* Progress Bar Line */}
          <div className="absolute top-4 sm:top-5 left-0 h-0.5 bg-gray-200 w-full -z-0"></div>
          <div 
            className="absolute top-4 sm:top-5 left-0 h-0.5 bg-blue-600 transition-all duration-300 -z-0"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        {/* Mobile-only Step Title */}
        <div className="text-center mt-4 sm:hidden font-semibold text-blue-600">
          Step {currentStep + 1}: {steps[currentStep].title}
        </div>
      </div>

      <Card 
        title={steps[currentStep].title}
        footer={footer}
      >
        <div className="min-h-[300px]">
          {steps[currentStep].content}
        </div>
      </Card>
    </div>
  )
}

export default Wizard
