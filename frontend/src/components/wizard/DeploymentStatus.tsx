import React from 'react'

interface DeploymentStatusProps {
  status: 'processing' | 'hosting' | 'completed' | 'error'
  progress?: number
  deploymentUrl?: string
  errorMessage?: string
}

const DeploymentStatus: React.FC<DeploymentStatusProps> = ({
  status,
  progress = 0,
  deploymentUrl,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
      {status === 'processing' && (
        <>
          <div className="relative w-24 h-24 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
                className="text-blue-600 transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
              {progress}%
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Processing your album</h3>
          <p className="text-gray-500 max-w-sm">
            AI is analyzing your photos and generating a customized layout based on your theme.
          </p>
        </>
      )}

      {status === 'hosting' && (
        <>
          <div className="mb-8">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Setting up your site</h3>
          <p className="text-gray-500 max-w-sm">
            Deploying your album to our high-performance global network.
          </p>
        </>
      )}

      {status === 'completed' && (
        <>
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your album is live!</h3>
          <p className="text-gray-500 mb-8 max-w-sm">
            The site is ready and accessible to everyone. Check it out using the link below.
          </p>
          <a
            href={deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Site
          </a>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-red-500 mb-4">{errorMessage || 'An unexpected error occurred during deployment.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 font-medium hover:text-blue-500"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  )
}

export default DeploymentStatus
