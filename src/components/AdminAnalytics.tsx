import React from 'react';
import { BarChart3, Users, TrendingUp, Database, Zap, Shield } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const metrics = [
    { label: 'Active Users', value: '12,847', change: '+12.5%', icon: Users, color: 'text-[#39FF14]' },
    { label: 'Recommendations', value: '847K', change: '+8.3%', icon: Zap, color: 'text-[#00D9FF]' },
    { label: 'Accuracy Score', value: '94.2%', change: '+2.1%', icon: BarChart3, color: 'text-yellow-400' },
    { label: 'Fairness Index', value: '98.7%', change: '+1.2%', icon: Shield, color: 'text-purple-400' }
  ];

  const systemStatus = [
    { service: 'Recommendation Engine', status: 'Online', uptime: '99.9%', color: 'bg-[#39FF14]' },
    { service: 'Fairness Detector', status: 'Online', uptime: '99.8%', color: 'bg-blue-500' },
    { service: 'User Analytics', status: 'Online', uptime: '99.7%', color: 'bg-[#00D9FF]' },
    { service: 'Content Database', status: 'Online', uptime: '100%', color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Database size={24} className="mr-3 text-[#00D9FF]" />
          Admin Analytics
        </h2>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
          <span className="text-gray-300">Live Data</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <metric.icon size={20} className={metric.color} />
              <span className={`text-xs px-2 py-1 rounded-full ${
                metric.change.startsWith('+') 
                  ? 'bg-[#39FF14]/20 text-[#39FF14]' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{metric.value}</div>
            <div className="text-sm text-gray-400">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemStatus.map((system, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${system.color} rounded-full`}></div>
                  <span className="font-medium">{system.service}</span>
                </div>
                <span className="text-sm text-[#39FF14]">{system.status}</span>
              </div>
              <div className="text-sm text-gray-400">
                Uptime: {system.uptime}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Model Performance */}
      <div className="mt-8 bg-gradient-to-r from-[#00D9FF]/10 to-[#39FF14]/10 border border-[#00D9FF]/30 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap size={20} className="mr-2 text-[#00D9FF]" />
          AI Model Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Recommendation Accuracy</div>
            <div className="text-xl font-bold text-[#39FF14]">94.2%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-[#39FF14] h-2 rounded-full" style={{width: '94.2%'}}></div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Bias Detection Rate</div>
            <div className="text-xl font-bold text-[#00D9FF]">98.7%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-[#00D9FF] h-2 rounded-full" style={{width: '98.7%'}}></div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">User Satisfaction</div>
            <div className="text-xl font-bold text-yellow-400">96.1%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{width: '96.1%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};