'use client'

import { useState } from 'react'
import { ArrowLeft, FileText, MapPin, Camera, Ruler, CheckCircle } from 'lucide-react'

interface DataExplorerProps {
  data: any
  onGenerateReport: () => void
  onBack: () => void
}

export default function DataExplorer({ data, onGenerateReport, onBack }: DataExplorerProps) {
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([])

  const dataTypes = [
    {
      id: 'flightLogs',
      name: 'Flight Logs',
      icon: FileText,
      count: data.flightLogs?.length || 0,
      description: 'Flight data including duration, altitude, and coverage'
    },
    {
      id: 'measurements',
      name: 'Measurements',
      icon: Ruler,
      count: data.measurements?.length || 0,
      description: 'Area, volume, and distance calculations'
    },
    {
      id: 'annotations',
      name: 'Annotations',
      icon: MapPin,
      count: data.annotations?.length || 0,
      description: 'Markers, polygons, and site annotations'
    },
    {
      id: 'imagery',
      name: 'Imagery',
      icon: Camera,
      count: data.imagery?.length || 0,
      description: 'Orthomosaics, 3D models, and high-res imagery'
    }
  ]

  const toggleDataType = (typeId: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    )
  }

  const handleGenerateReport = () => {
    // If no specific types selected, include all available data
    const typesToInclude = selectedDataTypes.length > 0 ? selectedDataTypes : dataTypes.map(t => t.id)
    onGenerateReport()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-white mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h2 className="text-2xl font-semibold">Available Data</h2>
        </div>

        <p className="text-gray-300 mb-6">
          Review the available data for this plan. Select specific data types to include in your AI report, or include all data for a comprehensive analysis.
        </p>

        <div className="grid gap-4 mb-8">
          {dataTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedDataTypes.includes(type.id) || selectedDataTypes.length === 0
            
            return (
              <div
                key={type.id}
                className={`bg-gray-700 rounded-lg p-4 border-2 transition-colors cursor-pointer ${
                  isSelected 
                    ? 'border-primary bg-gray-600' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => toggleDataType(type.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-4 ${
                      isSelected ? 'bg-primary' : 'bg-gray-600'
                    }`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">{type.name}</h3>
                      <p className="text-sm text-gray-300">{type.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-300">
                      {type.count} {type.count === 1 ? 'item' : 'items'}
                    </span>
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-white mb-2">Data Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-300">Flight Logs:</span>
              <span className="text-white ml-2">{data.flightLogs?.length || 0}</span>
            </div>
            <div>
              <span className="text-gray-300">Measurements:</span>
              <span className="text-white ml-2">{data.measurements?.length || 0}</span>
            </div>
            <div>
              <span className="text-gray-300">Annotations:</span>
              <span className="text-white ml-2">{data.annotations?.length || 0}</span>
            </div>
            <div>
              <span className="text-gray-300">Imagery:</span>
              <span className="text-white ml-2">{data.imagery?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerateReport}
            className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <FileText className="h-5 w-5 mr-2" />
            Generate AI Report
          </button>
        </div>
      </div>
    </div>
  )
} 