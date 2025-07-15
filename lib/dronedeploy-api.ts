// DroneDeploy API service for fetching plan data
// This will be replaced with real API calls when you have access to DroneDeploy API

export interface DroneDeployPlan {
  id: string
  name: string
  date: string
  location: string
  status: string
}

export interface FlightLog {
  id: string
  date: string
  duration: string
  altitude: string
  coverage: string
}

export interface Measurement {
  id: string
  type: 'area' | 'volume' | 'distance'
  value: string
  coordinates: string
  description?: string
}

export interface Annotation {
  id: string
  type: 'marker' | 'polygon' | 'line'
  description: string
  coordinates: string
  properties?: Record<string, any>
}

export interface Imagery {
  id: string
  type: 'orthomosaic' | '3d_model' | 'point_cloud'
  resolution?: string
  quality?: string
  date: string
  url?: string
}

export interface PlanData {
  flightLogs: FlightLog[]
  measurements: Measurement[]
  annotations: Annotation[]
  imagery: Imagery[]
}

// Mock data for development
const mockPlans: DroneDeployPlan[] = [
  {
    id: 'plan_001',
    name: 'Downtown Construction Site',
    date: '2024-01-15',
    location: 'San Francisco, CA',
    status: 'completed'
  },
  {
    id: 'plan_002', 
    name: 'Residential Development',
    date: '2024-01-10',
    location: 'Austin, TX',
    status: 'completed'
  },
  {
    id: 'plan_003',
    name: 'Industrial Complex Survey',
    date: '2024-01-08',
    location: 'Chicago, IL',
    status: 'completed'
  }
]

const mockPlanData: Record<string, PlanData> = {
  'plan_001': {
    flightLogs: [
      { id: '1', date: '2024-01-15', duration: '45min', altitude: '120m', coverage: '100%' },
      { id: '2', date: '2024-01-10', duration: '38min', altitude: '110m', coverage: '95%' }
    ],
    measurements: [
      { id: '1', type: 'area', value: '2.5 acres', coordinates: '37.7749,-122.4194', description: 'Total site area' },
      { id: '2', type: 'volume', value: '1500 cubic meters', coordinates: '37.7749,-122.4194', description: 'Excavation volume' },
      { id: '3', type: 'distance', value: '250m', coordinates: '37.7749,-122.4194', description: 'Site perimeter' }
    ],
    annotations: [
      { id: '1', type: 'marker', description: 'Equipment location', coordinates: '37.7749,-122.4194' },
      { id: '2', type: 'polygon', description: 'Construction zone', coordinates: '37.7749,-122.4194' },
      { id: '3', type: 'line', description: 'Safety boundary', coordinates: '37.7749,-122.4194' }
    ],
    imagery: [
      { id: '1', type: 'orthomosaic', resolution: '2cm/pixel', date: '2024-01-15', url: 'https://example.com/ortho.jpg' },
      { id: '2', type: '3d_model', quality: 'high', date: '2024-01-15', url: 'https://example.com/3d-model.glb' }
    ]
  },
  'plan_002': {
    flightLogs: [
      { id: '1', date: '2024-01-10', duration: '52min', altitude: '100m', coverage: '100%' }
    ],
    measurements: [
      { id: '1', type: 'area', value: '1.8 acres', coordinates: '30.2672,-97.7431', description: 'Development area' }
    ],
    annotations: [
      { id: '1', type: 'marker', description: 'Foundation markers', coordinates: '30.2672,-97.7431' }
    ],
    imagery: [
      { id: '1', type: 'orthomosaic', resolution: '3cm/pixel', date: '2024-01-10', url: 'https://example.com/ortho2.jpg' }
    ]
  },
  'plan_003': {
    flightLogs: [
      { id: '1', date: '2024-01-08', duration: '40min', altitude: '90m', coverage: '100%' }
    ],
    measurements: [
      { id: '1', type: 'area', value: '5.2 acres', coordinates: '41.8781,-87.6298', description: 'Industrial complex area' },
      { id: '2', type: 'volume', value: '3000 cubic meters', coordinates: '41.8781,-87.6298', description: 'Storage capacity' }
    ],
    annotations: [
      { id: '1', type: 'polygon', description: 'Storage facility', coordinates: '41.8781,-87.6298' },
      { id: '2', type: 'marker', description: 'Loading dock', coordinates: '41.8781,-87.6298' }
    ],
    imagery: [
      { id: '1', type: 'orthomosaic', resolution: '2.5cm/pixel', date: '2024-01-08', url: 'https://example.com/ortho3.jpg' },
      { id: '2', type: 'point_cloud', quality: 'medium', date: '2024-01-08', url: 'https://example.com/pointcloud.las' }
    ]
  }
}

export class DroneDeployAPI {
  private baseUrl: string
  private apiKey?: string

  constructor(baseUrl?: string, apiKey?: string) {
    this.baseUrl = baseUrl || 'https://api.dronedeploy.com'
    this.apiKey = apiKey
  }

  // Get all available plans
  async getPlans(): Promise<DroneDeployPlan[]> {
    // TODO: Replace with real API call
    // const response = await fetch(`${this.baseUrl}/plans`, {
    //   headers: {
    //     'Authorization': `Bearer ${this.apiKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // return response.json()
    
    return mockPlans
  }

  // Get specific plan data
  async getPlanData(planId: string): Promise<PlanData> {
    // TODO: Replace with real API call
    // const response = await fetch(`${this.baseUrl}/plans/${planId}/data`, {
    //   headers: {
    //     'Authorization': `Bearer ${this.apiKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // return response.json()
    
    const data = mockPlanData[planId]
    if (!data) {
      throw new Error(`Plan data not found for plan ID: ${planId}`)
    }
    
    return data
  }

  // Get flight logs for a plan
  async getFlightLogs(planId: string): Promise<FlightLog[]> {
    const data = await this.getPlanData(planId)
    return data.flightLogs
  }

  // Get measurements for a plan
  async getMeasurements(planId: string): Promise<Measurement[]> {
    const data = await this.getPlanData(planId)
    return data.measurements
  }

  // Get annotations for a plan
  async getAnnotations(planId: string): Promise<Annotation[]> {
    const data = await this.getPlanData(planId)
    return data.annotations
  }

  // Get imagery for a plan
  async getImagery(planId: string): Promise<Imagery[]> {
    const data = await this.getPlanData(planId)
    return data.imagery
  }
}

// Export a default instance
export const dronedeployAPI = new DroneDeployAPI() 