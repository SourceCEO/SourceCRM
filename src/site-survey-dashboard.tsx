interface Survey {
  id: number;
  address: string;
  customer: string;
  salesRep: string;
  contractor: string;
  requestedDate: string;
  confirmedDate?: string | null;
  status: string;
  notes: string;
}

import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, RotateCcw, Users, FileText } from 'lucide-react';

// Mock data - in a real implementation, this would come from your database
const initialSurveys = [
  { 
    id: 1, 
    address: "123 Main St, San Francisco, CA", 
    customer: "John Smith",
    salesRep: "Alex Johnson",
    contractor: "Bay Area Contractors",
    requestedDate: "2025-05-22",
    confirmedDate: "2025-05-22",
    status: "confirmed",
    notes: "Customer requested morning appointment. Has dogs that need to be secured."
  },
  { 
    id: 2, 
    address: "456 Oak Ave, Oakland, CA", 
    customer: "Sarah Williams",
    salesRep: "Taylor Martinez",
    contractor: "East Bay Surveys",
    requestedDate: "2025-05-20",
    confirmedDate: null,
    status: "requested",
    notes: "Complex property, estimate 2-3 hours for survey."
  },
  { 
    id: 3, 
    address: "789 Pine Rd, San Leandro, CA", 
    customer: "Michael Rodriguez",
    salesRep: "Jamie Lee",
    contractor: "Bay Area Contractors",
    requestedDate: "2025-05-18",
    confirmedDate: "2025-05-19",
    status: "reschedule",
    notes: "Customer had conflict with original date. Needs afternoon appointment."
  },
  { 
    id: 4, 
    address: "101 Redwood Blvd, San Jose, CA", 
    customer: "Lisa Chen",
    salesRep: "Pat Samuels",
    contractor: "South Bay Techs",
    requestedDate: "2025-05-15",
    confirmedDate: "2025-05-15",
    status: "completed",
    notes: "Survey completed. Property has good solar access, no shading issues."
  },
  { 
    id: 5, 
    address: "202 Spruce Ln, Richmond, CA", 
    customer: "David Wilson",
    salesRep: "Jamie Lee",
    contractor: "East Bay Surveys",
    requestedDate: "2025-05-24",
    confirmedDate: null,
    status: "requested",
    notes: "Large property, will need extra time."
  }
];

const SiteSurveyDashboard = () => {
  const [surveys, setSurveys] = useState(initialSurveys);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);
  const [role, setRole] = useState('admin'); // Could be 'admin', 'sales', 'contractor', or 'customer'
  
  // Filter surveys based on status
  const filteredSurveys = filter === 'all' 
    ? surveys 
    : surveys.filter(survey => survey.status === filter);
  
  const openSurveyModal = (survey: Survey) => {
    setCurrentSurvey(survey);
    setModalOpen(true);
  };
  
  const closeSurveyModal = () => {
    setModalOpen(false);
    setCurrentSurvey(null);
  };

  const updateSurveyStatus = (id: number, newStatus: string) => {
    setSurveys(surveys.map(survey => 
      survey.id === id ? {...survey, status: newStatus} : survey
    ));
    closeSurveyModal();
  };
  
  const confirmSurvey = (id: number, date: string) => {
    setSurveys(surveys.map(survey => 
      survey.id === id ? {...survey, status: 'confirmed', confirmedDate: date} : survey
    ));
    closeSurveyModal();
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'requested':
        return <Calendar className="text-blue-500" />;
      case 'confirmed':
        return <CheckCircle className="text-green-500" />;
      case 'reschedule':
        return <RotateCcw className="text-orange-500" />;
      case 'completed':
        return <FileText className="text-purple-500" />;
      default:
        return <AlertTriangle className="text-gray-500" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'requested':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'reschedule':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Site Survey Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Manage and track site survey scheduling</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              className="rounded-md border-gray-300 shadow-sm px-4 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">View as Admin</option>
              <option value="sales">View as Sales Rep</option>
              <option value="contractor">View as Contractor</option>
              <option value="customer">View as Customer</option>
            </select>
            <button 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              onClick={() => alert("This would open a form to add a new survey request")}
            >
              + New Survey
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setFilter('all')}
            >
              All Surveys
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${filter === 'requested' ? 'bg-blue-100 text-blue-800' : 'bg-white'}`}
              onClick={() => setFilter('requested')}
            >
              Requested
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${filter === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-white'}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${filter === 'reschedule' ? 'bg-orange-100 text-orange-800' : 'bg-white'}`}
              onClick={() => setFilter('reschedule')}
            >
              Needs Rescheduling
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-purple-100 text-purple-800' : 'bg-white'}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        
        {/* Survey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurveys.map(survey => (
            <div 
              key={survey.id} 
              className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openSurveyModal(survey)}
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold">{survey.address}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(survey.status)}`}>
                    {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Customer: {survey.customer}</p>
              </div>
              <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{survey.confirmedDate || survey.requestedDate}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{survey.contractor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredSurveys.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
              <Calendar className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No surveys found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No site surveys match your current filter.
            </p>
          </div>
        )}
      </main>
      
      {/* Survey Detail Modal */}
      {modalOpen && currentSurvey && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeSurveyModal}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Modal header */}
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  {getStatusIcon(currentSurvey.status)}
                  <span className="ml-2">Site Survey Details</span>
                </h3>
                <button onClick={closeSurveyModal} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal content */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Address</h4>
                        <p className="mt-1">{currentSurvey.address}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                          <p className="mt-1">{currentSurvey.customer}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Sales Rep</h4>
                          <p className="mt-1">{currentSurvey.salesRep}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Contractor</h4>
                          <p className="mt-1">{currentSurvey.contractor}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Status</h4>
                          <p className="mt-1">
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(currentSurvey.status)}`}>
                              {currentSurvey.status.charAt(0).toUpperCase() + currentSurvey.status.slice(1)}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Requested Date</h4>
                          <p className="mt-1">{currentSurvey.requestedDate}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Confirmed Date</h4>
                          <p className="mt-1">{currentSurvey.confirmedDate || 'Not confirmed'}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                        <p className="mt-1 text-sm text-gray-600">{currentSurvey.notes}</p>
                      </div>
                      
                      {/* Date confirmation section - only visible for certain roles and statuses */}
                      {(role === 'admin' || role === 'contractor') && 
                       (currentSurvey.status === 'requested' || currentSurvey.status === 'reschedule') && (
                        <div className="mt-4 border-t pt-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Confirm Survey Date</h4>
                          <div className="flex space-x-2">
                            <input 
                              type="date" 
                              className="rounded-md border-gray-300 shadow-sm flex-grow"
                              defaultValue={currentSurvey.requestedDate}
                            />
                            <button 
                              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                              onClick={() => confirmSurvey(currentSurvey.id, currentSurvey.requestedDate)}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal actions */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {currentSurvey.status === 'requested' && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => updateSurveyStatus(currentSurvey.id, 'confirmed')}
                  >
                    Confirm Survey
                  </button>
                )}
                
                {currentSurvey.status === 'confirmed' && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => updateSurveyStatus(currentSurvey.id, 'completed')}
                  >
                    Mark Complete
                  </button>
                )}
                
                {(currentSurvey.status === 'requested' || currentSurvey.status === 'confirmed') && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-orange-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-orange-700 hover:bg-orange-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => updateSurveyStatus(currentSurvey.id, 'reschedule')}
                  >
                    Needs Reschedule
                  </button>
                )}
                
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeSurveyModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteSurveyDashboard;