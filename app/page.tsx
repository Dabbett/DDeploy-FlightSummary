'use client'

import { useState } from 'react'
import { Search, FileText, Download, Share2, Loader2 } from 'lucide-react'
import PlanSelector from '@/components/PlanSelector'
import DataExplorer from '@/components/DataExplorer'
import ReportGenerator from '@/components/ReportGenerator'
import ReportViewer from '@/components/ReportViewer'

export default function Home() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('')
  const [availableData, setAvailableData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedReport, setGeneratedReport] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<'select' | 'explore' | 'generate' | 'view'>('select')

  const handlePlanSelect = async (planId: string) => {
    setSelectedPlanId(planId)
    setIsLoading(true)
    setCurrentStep('explore')
    
    try {
      // TODO: Implement DroneDeploy API call to get available data
      // For now, using mock data
      const mockData = {
        flightLogs: [
          { id: '1', date: '2024-01-15', duration: '45min', altitude: '120m' },
          { id: '2', date: '2024-01-10', duration: '38min', altitude: '110m' }
        ],
        measurements: [
          { id: '1', type: 'area', value: '2.5 acres', coordinates: 'lat,lon' },
          { id: '2', type: 'volume', value: '1500 cubic meters', coordinates: 'lat,lon' }
        ],
        annotations: [
          { id: '1', type: 'marker', description: 'Equipment location', coordinates: 'lat,lon' },
          { id: '2', type: 'polygon', description: 'Construction zone', coordinates: 'lat,lon' }
        ],
        imagery: [
          { id: '1', type: 'orthomosaic', resolution: '2cm/pixel', date: '2024-01-15' },
          { id: '2', type: '3d_model', quality: 'high', date: '2024-01-15' }
        ]
      }
      
      setAvailableData(mockData)
    } catch (error) {
      console.error('Error fetching plan data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateReport = async () => {
    setIsLoading(true)
    setCurrentStep('generate')
    
    try {
      // TODO: Implement AI report generation
      // For now, using mock report
      const mockReport = `# Site Report for Plan ${selectedPlanId}

## Executive Summary
This report provides a comprehensive analysis of the site data collected on January 15, 2024. The site covers approximately 2.5 acres with significant construction activity observed.

## Flight Data
- **Total Flights**: 2 flights completed
- **Coverage**: 100% of target area
- **Average Altitude**: 115m
- **Total Flight Time**: 83 minutes

## Key Measurements
- **Site Area**: 2.5 acres
- **Volume Calculations**: 1500 cubic meters of material
- **Equipment Locations**: 3 pieces of heavy machinery identified

## Annotations & Markers
- Construction zone clearly demarcated
- Equipment staging areas identified
- Safety zones properly marked

## Recommendations
1. Continue monitoring construction progress weekly
2. Consider additional flights for detailed 3D modeling
3. Update safety protocols based on current site conditions

*Report generated on ${new Date().toLocaleDateString()}*`
      
      setGeneratedReport(mockReport)
      setCurrentStep('view')
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Report Generator</h1>
          <p className="text-gray-300">Generate intelligent reports from your DroneDeploy site data</p>
        </header>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
            <span className="ml-2">Loading...</span>
          </div>
        )}

        {!isLoading && (
          <div className="space-y-8">
            {currentStep === 'select' && (
              <PlanSelector onPlanSelect={handlePlanSelect} />
            )}

            {currentStep === 'explore' && availableData && (
              <DataExplorer 
                data={availableData} 
                onGenerateReport={handleGenerateReport}
                onBack={() => setCurrentStep('select')}
              />
            )}

            {currentStep === 'view' && generatedReport && (
              <ReportViewer 
                report={generatedReport}
                onBack={() => setCurrentStep('explore')}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
} 