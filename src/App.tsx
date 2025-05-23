import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Calendar, BarChart2, ClipboardList, FileText, Home } from 'lucide-react';
import CalendarComponent from './calendar-component';
import DataAnalyticsDashboard from './data-analytics-dashboard';
import ProjectManagementDashboard from './project-management-dashboard';

const Sidebar = () => (
  <div className="w-64 h-screen bg-white border-r flex flex-col">
    <div className="p-6 border-b">
      <span className="text-2xl font-bold text-green-600 flex items-center">
        <Home className="mr-2" /> Solar CRM
      </span>
    </div>
    <nav className="flex-1 p-4 space-y-2">
      <Link to="/calendar" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
        <Calendar className="mr-3" /> Calendar
      </Link>
      <Link to="/analytics" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
        <BarChart2 className="mr-3" /> Analytics
      </Link>
      <Link to="/projects" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
        <ClipboardList className="mr-3" /> Projects
      </Link>
      <Link to="/project-details" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
        <FileText className="mr-3" /> Project Details
      </Link>
      {/* Add more links as you build more features */}
    </nav>
    <div className="p-4 border-t text-xs text-gray-400">&copy; 2024 Solar CRM</div>
  </div>
);

const ProjectDetailsPlaceholder = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Project Details</h2>
    <p>This is a placeholder for the Project Details component. More features coming soon!</p>
  </div>
);

const App = () => (
  <Router>
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/calendar" />} />
          <Route path="/calendar" element={<CalendarComponent />} />
          <Route path="/analytics" element={<DataAnalyticsDashboard />} />
          <Route path="/projects" element={<ProjectManagementDashboard />} />
          <Route path="/project-details" element={<ProjectDetailsPlaceholder />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App; 