// Add at the very top of src/calendar-component.tsx

interface Project {
  id: number;
  customer: string;
  address: string;
  stage: string;
}

type EventTypeKey = 'sales' | 'site-survey' | 'proposal' | 'engineering' | 'permitting' | 'installation' | 'inspection';

interface CalendarEvent {
  id: number;
  title: string;
  type: EventTypeKey;
  start: string;
  end: string;
  project: Project;
  assignee: string;
  notes: string;
  complete: boolean;
}

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Users, FileText, Wrench, CheckCircle, Sun, Search, Plus, Clock } from 'lucide-react';

// Mock data for events
const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Site Survey - Smith Residence",
    type: "site-survey",
    start: "2025-05-22T10:00:00",
    end: "2025-05-22T12:00:00",
    project: {
      id: 1,
      customer: "John Smith",
      address: "123 Main St, San Francisco, CA",
      stage: "site-survey"
    },
    assignee: "Mike Rodriguez",
    notes: "Customer requested morning appointment. Has dogs that need to be secured.",
    complete: false
  },
  {
    id: 2,
    title: "Sales Consultation - Anderson",
    type: "sales",
    start: "2025-05-21T15:00:00",
    end: "2025-05-21T16:30:00",
    project: {
      id: 6,
      customer: "Thomas Anderson",
      address: "303 Matrix Ave, Fremont, CA",
      stage: "lead"
    },
    assignee: "Alex Johnson",
    notes: "Initial consultation, customer interested in solar + battery system.",
    complete: false
  },
  {
    id: 3,
    title: "Proposal Presentation - Davis",
    type: "proposal",
    start: "2025-05-23T14:00:00",
    end: "2025-05-23T15:00:00",
    project: {
      id: 7,
      customer: "Emily Davis",
      address: "404 Error St, Mountain View, CA",
      stage: "proposal"
    },
    assignee: "Pat Samuels",
    notes: "Customer interested in high-capacity system with multiple batteries.",
    complete: false
  },
  {
    id: 4,
    title: "Installation - Chen Residence",
    type: "installation",
    start: "2025-05-20T08:00:00",
    end: "2025-05-22T17:00:00",
    project: {
      id: 4,
      customer: "Lisa Chen",
      address: "101 Redwood Blvd, San Jose, CA",
      stage: "installation"
    },
    assignee: "Installation Team A",
    notes: "Three-day installation, multi-day event.",
    complete: false
  }
];

// Define event types and their colors
const eventTypes: Record<EventTypeKey, { color: string; icon: JSX.Element }> = {
  sales: { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: <Users size={14} /> },
  'site-survey': { color: 'bg-purple-100 text-purple-800 border-purple-300', icon: <Search size={14} /> },
  proposal: { color: 'bg-indigo-100 text-indigo-800 border-indigo-300', icon: <FileText size={14} /> },
  engineering: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: <Wrench size={14} /> },
  permitting: { color: 'bg-orange-100 text-orange-800 border-orange-300', icon: <FileText size={14} /> },
  installation: { color: 'bg-green-100 text-green-800 border-green-300', icon: <Sun size={14} /> },
  inspection: { color: 'bg-red-100 text-red-800 border-red-300', icon: <CheckCircle size={14} /> }
};

const CalendarApp: React.FC = () => {
  const [events] = useState<CalendarEvent[]>(initialEvents);
  const [viewType, setViewType] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 4, 20)); // May 20, 2025
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Helper function to format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // Helper function to format times
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };
  
  // Helper function to navigate weeks
  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (7 * direction));
    setCurrentDate(newDate);
  };
  
  // Generate week dates (Sun-Sat)
  const getWeekDates = (): Date[] => {
    const sunday = new Date(currentDate);
    const day = sunday.getDay();
    sunday.setDate(sunday.getDate() - day);
    
    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      weekDates.push(date);
    }
    
    return weekDates;
  };
  
  // Filter events for a specific date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  // Open event modal
  const openEventModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };
  
  // Close event modal
  const closeEventModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };
  
  // Render week view
  const renderWeekView = () => {
    const weekDates = getWeekDates();
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Week header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDates.map((date, index) => (
            <div 
              key={index} 
              className="px-2 py-3 text-center bg-gray-50"
            >
              <div className="text-xs text-gray-500 font-medium">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-sm font-semibold">
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
        
        {/* Week content */}
        <div className="grid grid-cols-7 divide-x divide-gray-200">
          {weekDates.map((date, index) => {
            const dateEvents = getEventsForDate(date);
            
            return (
              <div key={index} className="min-h-64 p-1">
                {dateEvents.map(event => (
                  <div 
                    key={event.id} 
                    onClick={() => openEventModal(event)}
                    className={`mb-1 px-2 py-1 rounded-lg border ${eventTypes[event.type].color} cursor-pointer text-xs ${event.complete ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center">
                      <span className="mr-1">{eventTypes[event.type].icon}</span>
                      <span className="font-medium truncate">{event.title}</span>
                    </div>
                    <div className="mt-1">
                      {formatTime(event.start)}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Get week date range for header
  const getWeekDateRange = () => {
    const weekDates = getWeekDates();
    const startDate = weekDates[0];
    const endDate = weekDates[6];
    
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'long' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'long' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Calendar</h1>
            <p className="mt-1 text-sm text-gray-500">
              Schedule and manage all project activities
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </button>
          </div>
        </div>
      </header>
      
      {/* Calendar controls */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => navigateWeek(-1)}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {getWeekDateRange()}
            </h2>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => navigateWeek(1)}
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>
          </div>
          
          <div className="flex space-x-1">
            <button 
              className={`px-3 py-2 rounded-md text-sm font-medium ${viewType === 'week' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setViewType('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-2 rounded-md text-sm font-medium ${viewType === 'month' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setViewType('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      
      {/* Calendar view */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 mb-8">
        {renderWeekView()}
      </div>
      
      {/* Event Modal */}
      {modalOpen && selectedEvent && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeEventModal}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                        {eventTypes[selectedEvent.type].icon}
                        <span className="ml-2">{selectedEvent.title}</span>
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${eventTypes[selectedEvent.type].color}`}>
                        {selectedEvent.type.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Date & Time</div>
                          <div className="mt-1 text-sm text-gray-900">
                            <div>
                              {formatDate(new Date(selectedEvent.start))}
                            </div>
                            <div>
                              {formatTime(selectedEvent.start)} - {formatTime(selectedEvent.end)}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">Customer</div>
                          <div className="mt-1 text-sm text-gray-900">
                            <div>{selectedEvent.project.customer}</div>
                            <div>{selectedEvent.project.address}</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">Assigned To</div>
                          <div className="mt-1 text-sm text-gray-900">
                            {selectedEvent.assignee}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">Notes</div>
                          <div className="mt-1 text-sm text-gray-900">
                            {selectedEvent.notes}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">Status</div>
                          <div className="mt-1 text-sm text-gray-900 flex items-center">
                            {selectedEvent.complete ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                            )}
                            {selectedEvent.complete ? 'Completed' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    alert(`Opening Project #${selectedEvent.project.id}`);
                    closeEventModal();
                  }}
                >
                  View Project
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeEventModal}
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

export default CalendarApp;