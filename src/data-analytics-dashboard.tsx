import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Sun, Users, Clock, TrendingUp } from 'lucide-react';

// Mock data for analytics
const mockData = {
  revenue: {
    total: 1250000,
    monthly: [
      { month: 'Jan', amount: 85000 },
      { month: 'Feb', amount: 92000 },
      { month: 'Mar', amount: 105000 },
      { month: 'Apr', amount: 115000 },
      { month: 'May', amount: 125000 },
      { month: 'Jun', amount: 135000 }
    ]
  },
  installations: {
    total: 450,
    monthly: [
      { month: 'Jan', count: 35 },
      { month: 'Feb', count: 42 },
      { month: 'Mar', count: 48 },
      { month: 'Apr', count: 52 },
      { month: 'May', count: 58 },
      { month: 'Jun', count: 65 }
    ]
  },
  capacity: {
    total: 2250, // kW
    monthly: [
      { month: 'Jan', kw: 175 },
      { month: 'Feb', kw: 210 },
      { month: 'Mar', kw: 240 },
      { month: 'Apr', kw: 260 },
      { month: 'May', kw: 290 },
      { month: 'Jun', kw: 325 }
    ]
  },
  pipeline: {
    leads: 120,
    proposals: 45,
    surveys: 30,
    installations: 25
  },
  journeyMetrics: {
    leadToProposal: 14, // days
    proposalToSurvey: 7,
    surveyToInstall: 21,
    totalJourney: 42
  }
};

// Color scheme for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface KPICardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  trend?: number;
  color: string;
}

const DataAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | 'all'>('6m');
  const [selectedMetric, setSelectedMetric] = useState<string>('revenue');

  // KPI Cards Component
  const KPICard = ({ title, value, icon, trend, color }: KPICardProps) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="ml-2 text-sm text-gray-500">vs last period</span>
        </div>
      )}
    </div>
  );

  // Pipeline Status Component
  const PipelineStatus: React.FC = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Pipeline</h3>
      <div className="space-y-4">
        {Object.entries(mockData.pipeline).map(([stage, count], index) => (
          <div key={stage} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${COLORS[index]}`} />
              <span className="ml-2 text-sm font-medium text-gray-600 capitalize">{stage}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Journey Metrics Component
  const JourneyMetrics: React.FC = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Journey Metrics</h3>
      <div className="space-y-4">
        {Object.entries(mockData.journeyMetrics).map(([stage, days], index) => (
          <div key={stage} className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="ml-2 text-sm font-medium text-gray-600">
                {stage.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{days} days</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your business performance and key metrics
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex space-x-4">
          {(['6m', '1y', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeRange === range
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {range === '6m' ? '6 Months' : range === '1y' ? '1 Year' : 'All Time'}
            </button>
          ))}
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={`$${(mockData.revenue.total / 1000).toFixed(1)}k`}
            icon={<DollarSign className="w-6 h-6 text-green-600" />}
            trend={12.5}
            color="bg-green-100"
          />
          <KPICard
            title="Total Installations"
            value={mockData.installations.total}
            icon={<Sun className="w-6 h-6 text-blue-600" />}
            trend={8.3}
            color="bg-blue-100"
          />
          <KPICard
            title="Total Capacity"
            value={`${mockData.capacity.total} kW`}
            icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
            trend={15.2}
            color="bg-purple-100"
          />
          <KPICard
            title="Active Projects"
            value={mockData.pipeline.installations}
            icon={<Users className="w-6 h-6 text-indigo-600" />}
            trend={5.7}
            color="bg-indigo-100"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.revenue.monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Installation Capacity Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Installation Capacity</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.capacity.monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="kw" fill="#82ca9d" name="Capacity (kW)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PipelineStatus />
          <JourneyMetrics />
        </div>
      </div>
    </div>
  );
};

export default DataAnalyticsDashboard; 