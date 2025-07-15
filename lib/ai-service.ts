// AI service for generating reports using Groq API
import { PlanData } from './dronedeploy-api'

export interface AIReportRequest {
  planId: string
  planName: string
  data: PlanData
  selectedDataTypes?: string[]
}

export interface AIReportResponse {
  report: string
  summary: string
  recommendations: string[]
}

export class AIService {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || ''
    this.baseUrl = 'https://api.groq.com/openai/v1'
  }

  private async makeRequest(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GROQ_API_KEY is required')
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: `You are an expert drone surveying and construction site analyst. 
              Generate comprehensive, professional reports based on DroneDeploy site data. 
              Focus on actionable insights, safety considerations, and progress tracking. 
              Use clear, technical language appropriate for construction professionals.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      })

      if (!response.ok) {
        throw new Error(`AI API request failed: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || 'Failed to generate report'
    } catch (error) {
      console.error('AI service error:', error)
      throw error
    }
  }

  private formatDataForPrompt(data: PlanData, selectedDataTypes?: string[]): string {
    const sections: string[] = []

    // Flight Logs
    if (!selectedDataTypes || selectedDataTypes.includes('flightLogs')) {
      if (data.flightLogs.length > 0) {
        sections.push(`## Flight Data
${data.flightLogs.map(log => 
  `- Flight ${log.id}: ${log.date}, Duration: ${log.duration}, Altitude: ${log.altitude}, Coverage: ${log.coverage}`
).join('\n')}`)
      }
    }

    // Measurements
    if (!selectedDataTypes || selectedDataTypes.includes('measurements')) {
      if (data.measurements.length > 0) {
        sections.push(`## Measurements
${data.measurements.map(measure => 
  `- ${measure.type.toUpperCase()}: ${measure.value}${measure.description ? ` (${measure.description})` : ''}`
).join('\n')}`)
      }
    }

    // Annotations
    if (!selectedDataTypes || selectedDataTypes.includes('annotations')) {
      if (data.annotations.length > 0) {
        sections.push(`## Annotations
${data.annotations.map(annotation => 
  `- ${annotation.type.toUpperCase()}: ${annotation.description}`
).join('\n')}`)
      }
    }

    // Imagery
    if (!selectedDataTypes || selectedDataTypes.includes('imagery')) {
      if (data.imagery.length > 0) {
        sections.push(`## Imagery
${data.imagery.map(img => 
  `- ${img.type.toUpperCase()}: ${img.resolution || img.quality || 'Standard quality'} (${img.date})`
).join('\n')}`)
      }
    }

    return sections.join('\n\n')
  }

  async generateReport(request: AIReportRequest): Promise<AIReportResponse> {
    const dataSummary = this.formatDataForPrompt(request.data, request.selectedDataTypes)
    
    const prompt = `Generate a comprehensive site report for DroneDeploy plan: ${request.planName} (ID: ${request.planId})

Available site data:
${dataSummary}

Please create a professional report with the following structure:
1. Executive Summary
2. Flight Data Analysis
3. Key Measurements & Findings
4. Site Annotations & Markers
5. Imagery Quality Assessment
6. Recommendations & Next Steps

Focus on:
- Safety observations and recommendations
- Progress tracking and measurements
- Quality of data collection
- Actionable insights for the project team
- Technical accuracy and professional tone

Format the report in Markdown with clear headings and bullet points.`

    const report = await this.makeRequest(prompt)
    
    // Generate summary and recommendations
    const summaryPrompt = `Based on this report, provide a 2-3 sentence executive summary and 3-5 key recommendations as a JSON object with "summary" and "recommendations" fields.`
    
    const summaryResponse = await this.makeRequest(summaryPrompt)
    
    // Try to parse JSON, fallback to simple extraction
    let summary = ''
    let recommendations: string[] = []
    
    try {
      const parsed = JSON.parse(summaryResponse)
      summary = parsed.summary || ''
      recommendations = parsed.recommendations || []
    } catch {
      // Fallback parsing
      const lines = summaryResponse.split('\n')
      summary = lines[0] || ''
      recommendations = lines.filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
        .map(line => line.replace(/^[-•]\s*/, '').trim())
        .filter(line => line.length > 0)
    }

    return {
      report,
      summary,
      recommendations
    }
  }

  // Mock method for development when API is not available
  async generateMockReport(request: AIReportRequest): Promise<AIReportResponse> {
    const report = `# Site Report for ${request.planName}

## Executive Summary
This report provides a comprehensive analysis of the site data collected for ${request.planName}. The site shows active construction activity with well-documented measurements and annotations.

## Flight Data Analysis
- **Total Flights**: ${request.data.flightLogs.length} flights completed
- **Coverage**: 100% of target area achieved
- **Average Altitude**: ${request.data.flightLogs.reduce((acc, log) => {
    const alt = parseInt(log.altitude.replace('m', ''))
    return acc + alt
  }, 0) / request.data.flightLogs.length}m
- **Total Flight Time**: ${request.data.flightLogs.reduce((acc, log) => {
    const duration = parseInt(log.duration.replace('min', ''))
    return acc + duration
  }, 0)} minutes

## Key Measurements & Findings
${request.data.measurements.map(measure => 
  `- **${measure.type.toUpperCase()}**: ${measure.value}${measure.description ? ` - ${measure.description}` : ''}`
).join('\n')}

## Site Annotations & Markers
${request.data.annotations.map(annotation => 
  `- **${annotation.type.toUpperCase()}**: ${annotation.description}`
).join('\n')}

## Imagery Quality Assessment
${request.data.imagery.map(img => 
  `- **${img.type.toUpperCase()}**: ${img.resolution || img.quality || 'Standard quality'} - ${img.date}`
).join('\n')}

## Recommendations
1. Continue monitoring construction progress weekly
2. Consider additional flights for detailed 3D modeling
3. Update safety protocols based on current site conditions
4. Document all measurements for future reference
5. Maintain regular quality checks on imagery data

*Report generated on ${new Date().toLocaleDateString()}*`

    return {
      report,
      summary: `Comprehensive analysis of ${request.planName} showing ${request.data.flightLogs.length} flights, ${request.data.measurements.length} measurements, and ${request.data.annotations.length} annotations.`,
      recommendations: [
        'Continue monitoring construction progress weekly',
        'Consider additional flights for detailed 3D modeling',
        'Update safety protocols based on current site conditions'
      ]
    }
  }
}

// Export a default instance
export const aiService = new AIService() 