'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar } from 'lucide-react'

interface PlanSelectorProps {
  onPlanSelect: (planId: string) => void
}

export default function PlanSelector({ onPlanSelect }: PlanSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock plans data - replace with real DroneDeploy API call
  const mockPlans = [
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

  const filteredPlans = mockPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Select a Plan</h2>
        <p className="text-gray-300 mb-6">
          Choose a DroneDeploy plan to analyze and generate an AI-powered report
        </p>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search plans by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="grid gap-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => onPlanSelect(plan.id)}
              className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 cursor-pointer transition-colors border border-gray-600 hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2">{plan.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {plan.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {plan.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                    {plan.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No plans found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
} 