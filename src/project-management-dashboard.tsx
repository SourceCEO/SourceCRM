import React, { useState } from 'react';
import { Calendar, Users, Briefcase, FileText, CheckCircle, AlertTriangle, Clock, ArrowRight, Search, Building, Sun, PlusCircle, FileCheck, Settings } from 'lucide-react';

interface Customer {
  name: string;
  address: string;
  phone?: string;
  email?: string;
}
interface System {
  type: string;
  size: string;
  estimatedProduction: string;
}
interface NextAction {
  task: string;
  deadline: string;
  assignee: string;
}
interface Project {
  id: number;
  name?: string;
  customer: Customer;
  salesRep?: string;
  projectManager?: string;
  stage?: string;
  stageName?: string;
  progress?: number;
  notes?: string;
  nextAction?: NextAction;
  system?: System;
  createdDate?: string;
  estimatedCompletionDate?: string;
  flagged?: boolean;
}

// Mock data - would be replaced with your actual data
const initialProjects = [
  {
    id: 1,
    customer: {
      name: "John Smith",
      address: "123 Main St, San Francisco, CA",
      phone: "(415) 555-1234",
      email: "john.smith@example.com"
    },
    stage: "site-survey",
    stageName: "Site Survey",
    progress: 40,
    system: {
      type: "Solar + Battery",
      size: "8.4kW + 13.5kWh",
      estimatedProduction: "12,000 kWh/yr"
    },
    nextAction: {
      task: "Complete site survey",
      deadline: "2025-05-22",
      assignee: "Mike Rodriguez"
    },
    salesRep: "Alex Johnson",
    projectManager: undefined,
    createdDate: "2025-05-01",
    estimatedCompletionDate: "2025-07-15",
    notes: "Customer interested in EV charger addition",
    flagged: false
  },
  {
    id: 2,
    customer: {
      name: "Sarah Williams",
      address: "456 Oak Ave, Oakland, CA",
      phone: "(510) 555-9876",
      email: "sarah.w@example.com"
    },
    stage: "engineering",
    stageName: "Engineering",
    progress: 65,
    system: {
      type: "Solar Only",
      size: "10.2kW",
      estimatedProduction: "14,500 kWh/yr"
    },
    nextAction: {
      task: "Finalize design documents",
      deadline: "2025-05-24",
      assignee: "Lisa Chen"
    },
    salesRep: "Taylor Martinez",
    projectManager: "David Wilson",
    createdDate: "2025-04-15",
    estimatedCompletionDate: "2025-06-30",
    notes: "Property has some shading issues on west side",
    flagged: false
  },
  {
    id: 3,
    customer: {
      name: "Michael Rodriguez",
      address: "789 Pine Rd, San Leandro, CA",
      phone: "(510) 555-4321",
      email: "mrodriguez@example.com"
    },
    stage: "permitting",
    stageName: "Permitting",
    progress: 75,
    system: {
      type: "Solar + Battery",
      size: "12.6kW + 27kWh",
      estimatedProduction: "18,000 kWh/yr"
    },
    nextAction: {
      task: "Submit final permits to city",
      deadline: "2025-05-19",
      assignee: "David Wilson"
    },
    salesRep: "Jamie Lee",
    projectManager: "David Wilson",
    createdDate: "2025-03-22",
    estimatedCompletionDate: "2025-06-15",
    notes: "Customer requested additional panels on garage",
    flagged: true
  },
  {
    id: 4,
    customer: {
      name: "Lisa Chen",
      address: "101 Redwood Blvd, San Jose, CA",
      phone: "(408) 555-8765",
      email: "lisa.chen@example.com"
    },
    stage: "installation",
    stageName: "Installation",
    progress: 85,
    system: {
      type: "Solar Only",
      size: "7.2kW",
      estimatedProduction: "10,800 kWh/yr"
    },
    nextAction: {
      task: "Schedule final inspection",
      deadline: "2025-05-26",
      assignee: "Pat Samuels"
    },
    salesRep: "Pat Samuels",
    projectManager: "Samantha Park",
    createdDate: "2025-03-10",
    estimatedCompletionDate: "2025-05-30",
    notes: "Installation proceeding ahead of schedule",
    flagged: false
  },
  {
    id: 5,
    customer: {
      name: "David Wilson",
      address: "202 Spruce Ln, Richmond, CA",
      phone: "(510) 555-2468",
      email: "dwilson@example.com"
    },
    stage: "completed",
    stageName: "Completed",
    progress: 100,
    system: {
      type: "Solar + Battery + EV Charger",
      size: "11.8kW + 13.5kWh + Level 2 Charger",
      estimatedProduction: "16,500 kWh/yr"
    },
    nextAction: {
      task: "Schedule 3-month checkup",
      deadline: "2025-08-10",
      assignee: "Samantha Park"
    },
    salesRep: "Jamie Lee",
    projectManager: "Samantha Park",
    createdDate: "2025-02-01",
    estimatedCompletionDate: "2025-05-10",
    notes: "System activated and performing above estimates",
    flagged: false
  },
  {
    id: 6,
    customer: {
      name: "Thomas Anderson",
      address: "303 Matrix Ave, Fremont, CA",
      phone: "(510) 555-1111",
      email: "tanderson@example.com"
    },
    stage: "lead",
    stageName: "Lead",
    progress: 10,
    system: {
      type: "Solar Only (Proposed)",
      size: "9.6kW (Estimated)",
      estimatedProduction: "13,500 kWh/yr (Estimated)"
    },
    nextAction: {
      task: "Schedule initial consultation",
      deadline: "2025-05-21",
      assignee: "Alex Johnson"
    },
    salesRep: "Alex Johnson",
    projectManager: undefined,
    createdDate: "2025-05-12",
    estimatedCompletionDate: "2025-08-01",
    notes: "Customer requested evening appointment",
    flagged: false
  },
  {
    id: 7,
    customer: {
      name: "Emily Davis",
      address: "404 Error St, Mountain View, CA",
      phone: "(650) 555-7890",
      email: "emily.davis@example.com"
    },
    stage: "proposal",
    stageName: "Proposal",
    progress: 25,
    system: {
      type: "Solar + Battery (Proposed)",
      size: "13.2kW + 27kWh (Proposed)",
      estimatedProduction: "19,000 kWh/yr (Estimated)"
    },
    nextAction: {
      task: "Present proposal to customer",
      deadline: "2025-05-23",
      assignee: "Pat Samuels"
    },
    salesRep: "Pat Samuels",
    projectManager: undefined,
    createdDate: "2025-04-28",
    estimatedCompletionDate: "2025-07-25",
    notes: "High energy user, considering multiple battery backup",
    flagged: true
  }
];

// Define the stages for the project pipeline
const stages = [
  { id: "lead", name: "Lead", icon: <Users size={18} /> },
  { id: "proposal", name: "Proposal", icon: <FileText size={18} /> },
  { id: "site-survey", name: "Site Survey", icon: <Search size={18} /> },
  { id: "engineering", name: "Engineering", icon: <Briefcase size={18} /> },
  { id: "permitting", name: "Permitting", icon: <FileCheck size={18} /> },
  { id: "installation", name: "Installation", icon: <Sun size={18} /> },
  { id: "completed", name: "Completed", icon: <CheckCircle size={18} /> }
];

const ProjectManagementDashboard = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  
  // Filter projects based on stage and search term
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.stage === filter || 
                        (filter === 'flagged' && project.flagged);
    const matchesSearch = searchTerm === '' || 
                        project.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };
  
  const closeProjectModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
  };
  
  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-indigo-100 text-indigo-800';
      case 'site-survey': return 'bg-purple-100 text-purple-800';
      case 'engineering': return 'bg-yellow-100 text-yellow-800';
      case 'permitting': return 'bg-orange-100 text-orange-800';
      case 'installation': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage all projects from lead to completion
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </button>
          </div>
        </div>
      </header>
      
      {/* Search and filter bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search projects by customer or address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilter('all')}
            >
              All Projects
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filter === 'flagged' ? 'bg-red-100 text-red-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilter('flagged')}
            >
              <AlertTriangle className="inline-block mr-1 h-4 w-4" />
              Flagged
            </button>
            {stages.map(stage => (
              <button
                key={stage.id}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  filter === stage.id ? getStageColor(stage.id) : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setFilter(stage.id)}
              >
                {stage.icon && <span className="inline-block mr-1">{stage.icon}</span>}
                {stage.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Projects Pipeline View */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Project Pipeline
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {/* Pipeline visualization */}
            <div className="flex justify-between items-center mb-8 overflow-x-auto pb-4">
              {stages.map((stage, index) => (
                <React.Fragment key={stage.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStageColor(stage.id)}`}>
                      {stage.icon}
                    </div>
                    <span className="mt-2 text-xs text-gray-600">{stage.name}</span>
                    <span className="mt-1 text-sm font-semibold">
                      {projects.filter(p => p.stage === stage.id).length}
                    </span>
                  </div>
                  {index < stages.length - 1 && (
                    <div className="flex-grow mx-1 h-1 bg-gray-200 relative top-6">
                      <ArrowRight className="text-gray-400 absolute -top-3 right-0" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Project List */}
      <div className="max-w-7xl mx-auto px-4 pb-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              All Projects ({filteredProjects.length})
            </h3>
            <span className="text-sm text-gray-500">
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
          </div>
          
          {/* Project cards */}
          <div className="divide-y divide-gray-200">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <div 
                  key={project.id} 
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Building className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="text-lg font-medium text-indigo-600 truncate">
                            {project.customer.name}
                          </h4>
                          {project.flagged && (
                            <span className="ml-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {project.customer.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(project.stage || '')}`}>
                        {project.stageName}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:space-x-8">
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {project.system?.type}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Sun className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {project.system?.size}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {project.salesRep}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>
                        Next Action: <span className="font-medium text-gray-900">{project.nextAction?.task}</span> by {project.nextAction?.deadline}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-2">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            Progress: {project.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-indigo-100">
                        <div style={{ width: `${project.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-gray-500">No projects match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Project Detail Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeProjectModal}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      Project Details
                      {selectedProject.flagged && (
                        <span className="ml-2">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </span>
                      )}
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500 mt-1">
                      {selectedProject.customer.name} • {selectedProject.customer.address}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(selectedProject.stage || '')}`}>
                    {selectedProject.stageName}
                  </span>
                </div>
                
                {/* Progress */}
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-indigo-100">
                      <div style={{ width: `${selectedProject.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"></div>
                    </div>
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                          Progress: {selectedProject.progress}%
                        </span>
                      </div>
                      <div>
                        <span className="text-xs inline-block text-gray-500">
                          Created: {selectedProject.createdDate} • Estimated Completion: {selectedProject.estimatedCompletionDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Details */}
                <div className="mt-5 border-t border-gray-200">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-4 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Customer Information</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        <p><span className="font-medium">Email:</span> {selectedProject.customer.email}</p>
                        <p><span className="font-medium">Phone:</span> {selectedProject.customer.phone}</p>
                      </dd>
                    </div>
                    <div className="py-4 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">System Details</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        <p><span className="font-medium">Type:</span> {selectedProject.system?.type}</p>
                        <p><span className="font-medium">Size:</span> {selectedProject.system?.size}</p>
                        <p><span className="font-medium">Estimated Production:</span> {selectedProject.system?.estimatedProduction}</p>
                      </dd>
                    </div>
                    <div className="py-4 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Team</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        <p><span className="font-medium">Sales Rep:</span> {selectedProject.salesRep}</p>
                        <p><span className="font-medium">Project Manager:</span> {selectedProject.projectManager || 'Not assigned'}</p>
                      </dd>
                    </div>
                    <div className="py-4 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Next Action</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        <p><span className="font-medium">Task:</span> {selectedProject.nextAction?.task}</p>
                        <p><span className="font-medium">Deadline:</span> {selectedProject.nextAction?.deadline}</p>
                        <p><span className="font-medium">Assignee:</span> {selectedProject.nextAction?.assignee}</p>
                      </dd>
                    </div>
                    <div className="py-4 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Notes</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        {selectedProject.notes}
                      </dd>
                    </div>
                  </dl>
                </div>
                
                {/* Links to related components */}
                <div className="mt-5 border-t border-gray-200 pt-5">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Related Actions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-md text-sm flex items-center justify-center hover:bg-indigo-100">
                      <FileText className="mr-2 h-4 w-4" />
                      View Proposal
                    </button>
                    <button className="px-3 py-2 bg-purple-50 text-purple-700 rounded-md text-sm flex items-center justify-center hover:bg-purple-100">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Site Survey
                    </button>
                    <button className="px-3 py-2 bg-green-50 text-green-700 rounded-md text-sm flex items-center justify-center hover:bg-green-100">
                      <Users className="mr-2 h-4 w-4" />
                      Customer Communication
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Modal footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Project
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeProjectModal}
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

export default ProjectManagementDashboard;