import React from 'react'
import Card from '../common/Card'
import Button from '../common/Button'

interface Report {
  title: string
  summary: string
  findings: string[]
}

interface ReportViewerProps {
  report: Report
  onExport?: (format: 'pdf') => void
  onShare?: () => void
}

const ReportViewer: React.FC<ReportViewerProps> = ({ report, onExport, onShare }) => {
  return (
    <Card title={report.title}>
      <div className="space-y-6">
        {/* Summary Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
          <p className="text-gray-700 leading-relaxed">{report.summary}</p>
        </section>

        {/* Key Findings Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Findings</h3>
          <ul className="list-disc pl-5 space-y-2">
            {report.findings.map((finding, index) => (
              <li key={index} className="text-gray-700">
                {finding}
              </li>
            ))}
          </ul>
        </section>

        {/* Actions Section */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
          <Button
            variant="primary"
            onClick={() => onExport?.('pdf')}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export to PDF
          </Button>
          <Button
            variant="secondary"
            onClick={onShare}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share Report
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ReportViewer
