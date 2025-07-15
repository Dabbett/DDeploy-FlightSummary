'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Share2, Copy, Check } from 'lucide-react'

interface ReportViewerProps {
  report: string
  onBack: () => void
}

export default function ReportViewer({ report, onBack }: ReportViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy report:', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-report-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Report Generator',
        text: 'Check out this AI-generated site report from DroneDeploy',
        url: window.location.href
      })
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center text-gray-300 hover:text-white mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </button>
            <h2 className="text-2xl font-semibold">AI Generated Report</h2>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 mr-1" />
              ) : (
                <Copy className="h-4 w-4 mr-1" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center px-3 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200 font-mono">
              {report}
            </pre>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-2">Report Features</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• AI-powered analysis of site data</li>
            <li>• Comprehensive flight and measurement summaries</li>
            <li>• Actionable recommendations based on site conditions</li>
            <li>• Exportable in multiple formats</li>
            <li>• Mobile-friendly design for field use</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 