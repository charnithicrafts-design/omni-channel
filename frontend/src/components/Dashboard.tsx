import React from 'react'
import { Link } from 'react-router'

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Create <span className="text-blue-600">Something Amazing</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Start a new workflow to generate insights or beautiful content.
        </p>
      </div>

      {/* Workflow Selection Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
        {/* Market Research Card */}
        <Link
          to="/wizard?type=research"
          className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="px-8 py-10 relative z-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Start Market Research
            </h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Analyze trends, identify target audiences, and generate comprehensive reports with AI-powered insights.
            </p>
            <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              Launch Wizard <span className="ml-2">→</span>
            </span>
          </div>
        </Link>

        {/* Photography Album Card */}
        <Link
          to="/wizard?type=album"
          className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="px-8 py-10 relative z-10">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
              Create Photo Album
            </h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Upload your best shots, choose a stunning theme, and deploy a professional photography portfolio in minutes.
            </p>
            <span className="inline-flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
              Launch Wizard <span className="ml-2">→</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Recent Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500">View all</button>
        </div>
        
        {/* Placeholder for Recent Projects List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {[
              { title: 'Organic Coffee Market Analysis', type: 'Research', date: '2 hours ago', status: 'Completed', color: 'blue' },
              { title: 'Summer 2026 Collection', type: 'Album', date: 'Yesterday', status: 'Draft', color: 'purple' },
              { title: 'Tech Startups in EU', type: 'Research', date: '3 days ago', status: 'Processing', color: 'blue' },
            ].map((project, index) => (
              <li key={index}>
                <a href="#" className="block hover:bg-gray-50 transition-colors">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">{project.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${project.color === 'blue' ? 'green' : 'yellow'}-100 text-${project.color === 'blue' ? 'green' : 'yellow'}-800`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {project.type}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Last updated {project.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
