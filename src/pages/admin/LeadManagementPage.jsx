import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  TbUsers,
  TbFilter,
  TbSearch,
  TbPlus,
  TbUserPlus,
  TbStar,
  TbStarFilled,
  TbDotsVertical,
  TbCalendar,
  TbMail,
  TbPhone,
  TbCheck,
  TbClock,
  TbInfoCircle,
  TbChevronDown,
  TbDownload,
  TbRefresh,
  TbEye,
  TbEdit,
  TbArrowRight,
  TbBrandWhatsapp,
  TbCaretDown,
} from "react-icons/tb";
import { motion } from "framer-motion";
import { RiUserAddLine } from "react-icons/ri";

const LeadManagementPage = () => {
  // Lead stages configuration
  const stages = [
    { id: "new", name: "New Leads", color: "blue" },
    // { id: "contacted", name: "Contacted", color: "indigo" },
    // { id: "qualified", name: "Qualified", color: "violet" },
    { id: "proposal", name: "Proposal", color: "purple" },
    { id: "negotiation", name: "Negotiation", color: "pink" },
    { id: "converted", name: "Converted", color: "green" },
  ];

  // Mock lead data - in a real app, this would come from an API
  const initialLeads = [
    {
      id: "1",
      name: "John Mwangi",
      email: "john.mwangi@example.com",
      phone: "+254 712 345678",
      age: 65,
      avatar: null, // Would be an image URL in a real app
      budget: "KES 50,000",
      status: "new",
      priority: "high",
      score: 85,
      assignedTo: "Mary W.",
      tags: ["Senior Gold", "Family Plan"],
      lastContact: "2023-08-10T09:24:00",
      nextFollowUp: "2023-08-15",
      starred: true,
    },
    {
      id: "2",
      name: "Sarah Njoroge",
      email: "sarah.njoroge@example.com",
      phone: "+254 745 678901",
      age: 63,
      avatar: null,
      budget: "KES 40,000",
      status: "new",
      priority: "medium",
      score: 72,
      assignedTo: "James O.",
      tags: ["Premium 65+"],
      lastContact: "2023-08-09T14:30:00",
      nextFollowUp: "2023-08-16",
      starred: false,
    },
    {
      id: "3",
      name: "Mary Kamau",
      email: "mary.kamau@example.com",
      phone: "+254 723 456789",
      age: 68,
      avatar: null,
      budget: "KES 70,000",
      status: "new",
      priority: "high",
      score: 88,
      assignedTo: "Mary W.",
      tags: ["Family Plan", "Dental Coverage"],
      lastContact: "2023-08-11T08:12:00",
      nextFollowUp: "2023-08-14",
      starred: true,
    },
    {
      id: "4",
      name: "Michael Waweru",
      email: "michael.waweru@example.com",
      phone: "+254 756 789012",
      age: 70,
      avatar: null,
      budget: "KES 65,000",
      status: "proposal",
      priority: "medium",
      score: 76,
      assignedTo: "James O.",
      tags: ["Elder Care", "Vision Coverage"],
      lastContact: "2023-08-10T10:15:00",
      nextFollowUp: "2023-08-17",
      starred: false,
    },
    {
      id: "5",
      name: "David Ochieng",
      email: "david.ochieng@example.com",
      phone: "+254 734 567890",
      age: 72,
      avatar: null,
      budget: "KES 100,000",
      status: "proposal",
      priority: "high",
      score: 92,
      assignedTo: "Mary W.",
      tags: ["Gold Plus", "Comprehensive"],
      lastContact: "2023-08-11T16:45:00",
      nextFollowUp: "2023-08-13",
      starred: true,
    },
    {
      id: "6",
      name: "Elizabeth Muthoni",
      email: "elizabeth.muthoni@example.com",
      phone: "+254 767 890123",
      age: 66,
      avatar: null,
      budget: "KES 55,000",
      status: "proposal",
      priority: "high",
      score: 89,
      assignedTo: "James O.",
      tags: ["Senior Comprehensive"],
      lastContact: "2023-08-12T11:20:00",
      nextFollowUp: "2023-08-14",
      starred: false,
    },
    {
      id: "7",
      name: "George Kimani",
      email: "george.kimani@example.com",
      phone: "+254 778 901234",
      age: 69,
      avatar: null,
      budget: "KES 80,000",
      status: "negotiation",
      priority: "medium",
      score: 84,
      assignedTo: "Mary W.",
      tags: ["Silver Years", "Medication Coverage"],
      lastContact: "2023-08-11T13:10:00",
      nextFollowUp: "2023-08-15",
      starred: true,
    },
    {
      id: "8",
      name: "Grace Atieno",
      email: "grace.atieno@example.com",
      phone: "+254 789 012345",
      age: 64,
      avatar: null,
      budget: "KES 60,000",
      status: "converted",
      priority: "high",
      score: 96,
      assignedTo: "James O.",
      tags: ["Premium Health 65+"],
      lastContact: "2023-08-12T09:45:00",
      nextFollowUp: null,
      starred: false,
      conversionDate: "2023-08-12",
      selectedPlan: "Premium Health 65+",
    },
    {
      id: "9",
      name: "Grace Atieno",
      email: "grace.atieno@example.com",
      phone: "+254 789 012345",
      age: 64,
      avatar: null,
      budget: "KES 60,000",
      status: "converted",
      priority: "high",
      score: 96,
      assignedTo: "James O.",
      tags: ["Premium Health 65+"],
      lastContact: "2023-08-12T09:45:00",
      nextFollowUp: null,
      starred: false,
      conversionDate: "2023-08-12",
      selectedPlan: "Premium Health 65+",
    },
    {
      id: "10",
      name: "George Kimani",
      email: "george.kimani@example.com",
      phone: "+254 778 901234",
      age: 69,
      avatar: null,
      budget: "KES 80,000",
      status: "proposal",
      priority: "medium",
      score: 84,
      assignedTo: "Mary W.",
      tags: ["Silver Years", "Medication Coverage"],
      lastContact: "2023-08-11T13:10:00",
      nextFollowUp: "2023-08-15",
      starred: true,
    },
    {
      id: "11",
      name: "George Kimani",
      email: "george.kimani@example.com",
      phone: "+254 778 901234",
      age: 69,
      avatar: null,
      budget: "KES 80,000",
      status: "new",
      priority: "medium",
      score: 84,
      assignedTo: "Mary W.",
      tags: ["Silver Years", "Medication Coverage"],
      lastContact: "2023-08-11T13:10:00",
      nextFollowUp: "2023-08-15",
      starred: true,
    },
    {
      id: "12",
      name: "George Kimani",
      email: "george.kimani@example.com",
      phone: "+254 778 901234",
      age: 69,
      avatar: null,
      budget: "KES 80,000",
      status: "negotiation",
      priority: "medium",
      score: 84,
      assignedTo: "Mary W.",
      tags: ["Silver Years", "Medication Coverage"],
      lastContact: "2023-08-11T13:10:00",
      nextFollowUp: "2023-08-15",
      starred: true,
    },
    {
      id: "13",
      name: "Elvis Agunga",
      email: "elvis.agunga@example.com",
      phone: "+254 778 901234",
      age: 69,
      avatar: null,
      budget: "KES 80,000",
      status: "converted",
      priority: "medium",
      score: 84,
      assignedTo: "Mary W.",
      tags: ["Silver Years", "Medication Coverage"],
      lastContact: "2023-08-11T13:10:00",
      nextFollowUp: "2023-08-15",
      starred: true,
    },
    {
      id: "14",
      name: "Joseph Kamau",
      email: "joseph.kamau@example.com",
      phone: "+254 778 901234",
      age: 69,
      avatar: null,
      budget: "KES 80,000",
      status: "converted",
      priority: "medium",
      score: 84,
      assignedTo: "Mary W.",
      tags: ["Silver Years", "Medication Coverage"],
      lastContact: "2023-08-11T13:10:00",
      nextFollowUp: "2023-08-15",
      starred: true,
    },
  ];

  // State for leads
  const [leads, setLeads] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeLeadId, setActiveLeadId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    priority: null,
    assignedTo: null,
    tags: [],
  });

  // Initialize leads by stage
  useEffect(() => {
    const leadsByStage = stages.reduce((acc, stage) => {
      acc[stage.id] = initialLeads.filter((lead) => lead.status === stage.id);
      return acc;
    }, {});
    setLeads(leadsByStage);
  }, []);

  // Handle drag end
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside of a droppable area
    if (!destination) return;

    // If dropped in the same location
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the lead being moved
    const lead = leads[source.droppableId].find(
      (lead) => lead.id === draggableId
    );

    // Create a new lead object with updated status
    const updatedLead = {
      ...lead,
      status: destination.droppableId,
      lastUpdated: new Date().toISOString(),
    };

    // Remove from source and add to destination
    const sourceLeads = [...leads[source.droppableId]];
    sourceLeads.splice(source.index, 1);

    const destLeads = [...leads[destination.droppableId]];
    destLeads.splice(destination.index, 0, updatedLead);

    // Update state
    setLeads({
      ...leads,
      [source.droppableId]: sourceLeads,
      [destination.droppableId]: destLeads,
    });

    // In a real app, you'd make an API call here to update the lead status
  };

  // Toggle star on a lead
  const toggleStar = (leadId, stage) => {
    const updatedLeads = { ...leads };
    const leadIndex = updatedLeads[stage].findIndex(
      (lead) => lead.id === leadId
    );
    updatedLeads[stage][leadIndex].starred =
      !updatedLeads[stage][leadIndex].starred;
    setLeads(updatedLeads);
  };

  // Refresh leads data
  const refreshLeads = () => {
    setIsRefreshing(true);
    // In a real app, you'd fetch fresh lead data here
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Get avatar or placeholder based on lead name
  const getAvatar = (lead) => {
    if (lead.avatar) {
      return (
        <img
          src={lead.avatar}
          alt={lead.name}
          className="h-full w-full rounded-full object-cover"
        />
      );
    }
    return (
      <div
        className={`flex items-center justify-center h-full w-full bg-${
          lead.status === "converted" ? "green" : "primary"
        }-100 text-${
          lead.status === "converted" ? "green" : "primary"
        }-600 font-medium`}
      >
        {lead.name.charAt(0)}
      </div>
    );
  };

  // Get badge color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Calculate column heights based on lead counts
  const getColumnHeight = (stageId) => {
    const leadCount = leads[stageId]?.length || 0;
    return Math.max(leadCount * 136 + 160, 500); // Base height + leads height
  };

  return (
    <div className="text-gray-800 font-lexend flex flex-col h-[calc(100vh-64px)]">
      {/* Page Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary-600">Client Lead Pipeline</h1>
            <p className="text-gray-500">
              Track and manage your leads through the lead funnel
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={refreshLeads}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-neutral-200 border border-gray-600/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[400px]"
                />
                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <div className="relative">
              <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:text-primary-600 focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 flex items-center">
                <TbFilter className="h-4 w-4 mr-2" />
                Filter
                <TbCaretDown className="h-4 w-4 ml-2" />
              </button>
              {/* Filter dropdown would go here */}
            </div>

            <button className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">
              <RiUserAddLine className="h-4 w-4 mr-2" />
              Add New Lead
            </button>
          </div>
        </div>
      </div>

      {/* Leads Summary */}
      {/* <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200 flex flex-wrap gap-4 md:gap-8">
        <div>
          <div className="text-sm text-gray-500">Total Leads</div>
          <div className="text-2xl font-bold">{initialLeads.length}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">New Leads (This Week)</div>
          <div className="text-2xl font-bold text-blue-600">12</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Conversion Rate</div>
          <div className="text-2xl font-bold text-green-600">34.2%</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Avg. Sales Cycle</div>
          <div className="text-2xl font-bold">18 days</div>
        </div>
        <div className="ml-auto flex items-center">
          <button className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
            <TbDownload className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div> */}

      {/* Lead Pipeline - Kanban Board */}
      <div className="flex-1 overflow-hidden mt-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-full overflow-x-auto px-4 pb-2">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="flex-shrink-0 w-[24rem] mx-2 h-full flex flex-col"
              >
                <div
                  className={`bg-white rounded-t-xl border border-b-0 border-gray-200 p-3 flex items-center justify-between sticky top-0 z-10 bg-${stage.color}-50`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full bg-${stage.color}-500 mr-2`}
                    ></div>
                    <h3 className="font-semibold text-neutral-700">
                      {stage.name}
                    </h3>
                  </div>
                  <div
                    className={`bg-${stage.color}-100 text-${stage.color}-800 text-xs font-medium px-2 py-0.5 rounded-full`}
                  >
                    {leads[stage.id]?.length || 0}
                  </div>
                </div>

                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-2 flex-1 overflow-y-auto ${
                        snapshot.isDraggingOver ? "bg-gray-100" : ""
                      }`}
                    >
                      {leads[stage.id]?.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg border border-gray-200 p-3 mb-2 ${
                                snapshot.isDragging ? "shadow-lg" : "shadow-sm"
                              } hover:shadow-md transition-shadow`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                    {getAvatar(lead)}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 text-sm">
                                      {lead.name}
                                    </h4>
                                    <div className="text-xs text-gray-500">
                                      {lead.email}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <button
                                    onClick={() =>
                                      toggleStar(lead.id, stage.id)
                                    }
                                    className={`text-${
                                      lead.starred ? "yellow-400" : "gray-300"
                                    } hover:text-yellow-400 mr-1`}
                                  >
                                    {lead.starred ? (
                                      <TbStarFilled className="h-4 w-4" />
                                    ) : (
                                      <TbStar className="h-4 w-4" />
                                    )}
                                  </button>
                                  <div className="relative">
                                    <button className="text-gray-400 hover:text-gray-600">
                                      <TbDotsVertical className="h-4 w-4" />
                                    </button>
                                    {/* Dropdown menu would go here */}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-2">
                                <div
                                  className={`${getPriorityColor(
                                    lead.priority
                                  )} text-xs px-1.5 py-0.5 rounded`}
                                >
                                  {lead.priority.charAt(0).toUpperCase() +
                                    lead.priority.slice(1)}
                                </div>
                                <div className="bg-gray-100 text-gray-800 text-xs px-1.5 py-0.5 rounded">
                                  {lead.age} yrs
                                </div>
                                <div className="bg-primary-100 text-primary-800 text-xs px-1.5 py-0.5 rounded">
                                  {lead.budget}
                                </div>
                              </div>

                              {lead.tags && lead.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {lead.tags.map((tag, i) => (
                                    <div
                                      key={i}
                                      className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded"
                                    >
                                      {tag}
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <TbCalendar className="h-3 w-3 mr-1" />
                                  {lead.nextFollowUp
                                    ? formatDate(lead.nextFollowUp)
                                    : "—"}
                                </div>
                                <div>{lead.assignedTo}</div>
                              </div>

                              {/* Quick actions */}
                              <div className="flex mt-2 pt-2 border-t border-gray-100 justify-between">
                                <div className="flex space-x-1">
                                  <button className="p-1 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50">
                                    <TbPhone className="h-4 w-4" />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-purple-600 rounded-md hover:bg-purple-50">
                                    <TbMail className="h-4 w-4" />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-green-600 rounded-md hover:bg-green-50">
                                    <TbBrandWhatsapp className="h-4 w-4" />
                                  </button>
                                </div>
                                <div>
                                  <button className="p-1 text-gray-400 hover:text-primary-600 rounded-md hover:bg-primary-50">
                                    <TbEye className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Add lead button at the bottom of each column */}
                      <button className="w-full mt-1 p-2 bg-white border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-primary-600 hover:border-primary-300 flex items-center justify-center">
                        <TbPlus className="h-4 w-4 mr-1" />
                        <span className="text-xs">Add Lead</span>
                      </button>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default LeadManagementPage;
