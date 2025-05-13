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
  TbRefresh,
  TbBrandWhatsapp,
  TbCaretDownFilled,
  TbChevronRight,
  TbCheck,
  TbX,
  TbAlertCircle,
  TbInfoCircle,
  TbPhoneCall,
  TbMailFilled,
} from "react-icons/tb";
import {formatDate, getPriorityColor} from "../../utils/formatDate"
import { RiUserAddLine } from "react-icons/ri";

// Import our components
import LeadForm from "../../components/leads/LeadForm";
import LeadDetail from "../../components/leads/LeadDetail";
import LeadActions from "../../components/leads/LeadActions";

// Import lead service
import { 
  getLeads, 
  createLead, 
  updateLead, 
  updateLeadStatus, 
  toggleLeadStar, 
  deleteLead 
} from "../../services/leadService";
import { PiUserDuotone } from "react-icons/pi";

const LeadManagementPage = () => {
  // Lead stages configuration
  const stages = [
    { id: "new", name: "New Leads", color: "blue" },
    { id: "proposal", name: "Proposal", color: "purple" },
    { id: "negotiation", name: "Negotiation", color: "pink" },
    { id: "converted", name: "Converted", color: "green" },
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

  // State for modals
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    type: "success", // success, error, info
    message: "",
  });

  // Fetch leads from API
  const fetchLeads = async () => {
    setIsRefreshing(true);
    try {
      const response = await getLeads({
        search: searchQuery,
        ...activeFilters,
      });
      
      if (response.success) {
        // Initialize any missing stages with empty arrays
        const leadsByStage = stages.reduce((acc, stage) => {
          acc[stage.id] = response.data[stage.id] || [];
          return acc;
        }, {});
        
        setLeads(leadsByStage);
      } else {
        console.error("Failed to fetch leads:", response.message);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initialize leads
  useEffect(() => {
    fetchLeads();
  }, [searchQuery, activeFilters]);

  // Handle opening add lead form
  const handleAddLead = (initialStatus = "new") => {
    setSelectedLead({ status: initialStatus });
    setIsEditMode(false);
    setShowLeadForm(true);
  };

  // Handle opening edit lead form
  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setIsEditMode(true);
    setShowLeadForm(true);
    setShowLeadDetail(false);
  };

  // Handle viewing lead details
  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setShowLeadDetail(true);
  };

  // Show notification function
  const showNotification = (type, message, duration = 5000) => {
    setNotification({
      show: true,
      type,
      message,
    });

    // Auto-hide notification after duration
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, duration);
  };

  // Handle saving a lead (add or edit)
  const handleSaveLead = async (leadData) => {
    try {
      if (isEditMode) {
        // Update existing lead
        const response = await updateLead(leadData.id, leadData);
        
        if (response.success) {
          // Refresh leads to get the updated data
          fetchLeads();
          
          // If the lead detail view is open, update the selected lead
          if (showLeadDetail && selectedLead && selectedLead.id === leadData.id) {
            setSelectedLead(response.data);
          }
          
          // Show success notification
          showNotification("success", "Lead updated successfully!");
        } else {
          console.error("Failed to update lead:", response.message);
          // Show error notification
          showNotification("error", `Failed to update lead: ${response.message || 'Unknown error'}`); 
        }
      } else {
        // Add new lead
        const response = await createLead(leadData);
        
        if (response.success) {
          // Refresh leads to get the updated data
          fetchLeads();
          // Show success notification
          showNotification("success", "New lead added successfully!");
        } else {
          console.error("Failed to create lead:", response.message);
          // Show error notification
          showNotification("error", `Failed to add lead: ${response.message || 'Unknown error'}`);
        }
      }
      
      setShowLeadForm(false);
      setSelectedLead(null);
    } catch (error) {
      console.error("Error saving lead:", error);
      // Show error notification
      showNotification("error", `An error occurred: ${error.message || 'Unknown error'}`);
    }
  };

  // Handle deleting a lead
  const handleDeleteLead = async (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        const response = await deleteLead(leadId);
        
        if (response.success) {
          // Refresh leads to get the updated data
          fetchLeads();
          
          // Close the detail view if open
          if (showLeadDetail && selectedLead && selectedLead.id === leadId) {
            setShowLeadDetail(false);
            setSelectedLead(null);
          }
          
          // Show success notification
          showNotification("success", "Lead deleted successfully!");
        } else {
          console.error("Failed to delete lead:", response.message);
          // Show error notification
          showNotification("error", `Failed to delete lead: ${response.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error("Error deleting lead:", error);
        // Show error notification
        showNotification("error", `An error occurred: ${error.message || 'Unknown error'}`);
      }
    }
  };

  // Handle marking lead as converted
  const handleMarkConverted = async (leadId) => {
    try {
      // Find which stage the lead is in
      const stageId = Object.keys(leads).find((stageId) =>
        leads[stageId].some((lead) => lead.id === leadId)
      );

      if (stageId) {
        const response = await updateLeadStatus(leadId, "converted");
        
        if (response.success) {
          // Refresh leads to get the updated data
          fetchLeads();
          
          // Update detail view if open
          if (showLeadDetail && selectedLead && selectedLead.id === leadId) {
            setSelectedLead(response.data);
          }
          
          // Show success notification
          showNotification("success", "Lead marked as converted!");
        } else {
          console.error("Failed to convert lead:", response.message);
          // Show error notification
          showNotification("error", `Failed to convert lead: ${response.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error("Error converting lead:", error);
      // Show error notification
      showNotification("error", `An error occurred: ${error.message || 'Unknown error'}`);
    }
  };

  // Handle drag end
  const onDragEnd = async (result) => {
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

    try {
      // Find the lead being moved
      const lead = leads[source.droppableId].find(
        (lead) => lead.id === draggableId
      );

      // Optimistically update the UI
      // Create a new lead object with updated status
      const updatedLead = {
        ...lead,
        status: destination.droppableId,
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

      // Make API call to update the lead status
      const response = await updateLeadStatus(draggableId, destination.droppableId);
      
      if (!response.success) {
        console.error("Failed to update lead status:", response.message);
        // Revert the UI change by refreshing leads
        fetchLeads();
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
      // Revert the UI change by refreshing leads
      fetchLeads();
    }
  };

  // Toggle star on a lead
  const toggleStar = async (leadId, stage) => {
    try {
      // Optimistically update the UI
      const updatedLeads = { ...leads };
      const leadIndex = updatedLeads[stage].findIndex(
        (lead) => lead.id === leadId
      );
      updatedLeads[stage][leadIndex].starred =
        !updatedLeads[stage][leadIndex].starred;
      setLeads(updatedLeads);

      // Make API call to toggle star
      const response = await toggleLeadStar(leadId);
      
      if (!response.success) {
        console.error("Failed to toggle lead star:", response.message);
        // Revert the UI change by refreshing leads
        fetchLeads();
      }
    } catch (error) {
      console.error("Error toggling lead star:", error);
      // Revert the UI change by refreshing leads
      fetchLeads();
    }
  };

  // Refresh leads data
  const refreshLeads = () => {
    setIsRefreshing(true);
    fetchLeads();
  };

  // Get avatar or placeholder based on lead name
  const getAvatar = (lead) => {
    return (
      <div
        className={`flex items-center justify-center h-full w-full bg-${
          lead.status === "converted" ? "green" : "primary"
        }-200 text-${
          lead.status === "converted" ? "green" : "primary"
        }-600 font-medium`}
      >
        
        {lead.name.charAt(0)}
      </div>
    );
  };

  return (
    <div className="text-gray-800 font-lexend flex flex-col h-[calc(100vh-64px)]">
      {/* Notification */}
      {notification.show && (
        <div 
          className={`fixed top-20 right-4 z-50 p-3 text-sm rounded-lg shadow-lg flex items-center space-x-3 animate-slideInRight ${
            notification.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-600' :
            notification.type === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' :
            'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
          }`}
        >
          {notification.type === 'success' ? (
            <TbCheck className="w-6 h-6 text-green-700 flex-shrink-0" />
          ) : notification.type === 'error' ? (
            <TbAlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          ) : (
            <TbInfoCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
          )}
          <div className="flex-1">{notification.message}</div>
          <button 
            onClick={() => setNotification(prev => ({ ...prev, show: false }))} 
            className="text-gray-500 hover:text-gray-700"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Page Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Client Lead Pipeline
            </h1>
            <p className="text-gray-500 text-sm">
              Track, manage and convert your leads through the lead board
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={refreshLeads}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
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
                  className="pl-9 pr-4 py-2 bg-neutral-200 border border-gray-600/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[400px] shadow-sm"
                />
                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <div className="relative">
              <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 flex items-center shadow-sm transition-all">
                <TbFilter className="h-4 w-4 mr-2" />
                Filter
                <TbCaretDownFilled className="h-4 w-4 ml-2" />
              </button>
              {/* Filter dropdown would go here */}
            </div>

            <button
              onClick={() => handleAddLead()}
              className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg px-4 py-2 text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center shadow-sm transition-all"
            >
              <RiUserAddLine className="h-4 w-4 mr-2" />
              Add New Lead
            </button>
          </div>
        </div>
      </div>

      {/* Lead Pipeline - Kanban Board */}
      <div className="flex-1 overflow-hidden mt-4 pl-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 pb-2 h-full">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="flex flex-col h-full overflow-y-auto"
              >
                <div
                  className={`rounded-t-xl border border-b-0 border-neutral-400 p-3 flex items-center justify-between sticky top-0 z-10 bg-${stage.color}-50`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full bg-${stage.color}-500 mx-2`}
                    ></div>
                    <h3 className="font-semibold text-neutral-700">
                      {stage.name}
                    </h3>
                  </div>
                  <div
                    className={`bg-${stage.color}-100 text-${stage.color}-800 text-[0.78rem] font-semibold px-2 py-0.5 rounded-full`}
                  >
                    {leads[stage.id]?.length || 0}
                  </div>
                </div>

                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`bg-gray-50 rounded-b-lg border border-t-0 border-neutral-400 p-2 flex-1 overflow-y-auto hide-scrollbar ${
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
                              } hover:shadow-md transition-all duration-200`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                    {getAvatar(lead)}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">
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
                                  <LeadActions
                                    lead={lead}
                                    onView={handleViewLead}
                                    onEdit={handleEditLead}
                                    onDelete={handleDeleteLead}
                                    onToggleStar={(id) =>
                                      toggleStar(id, stage.id)
                                    }
                                    onMarkConverted={handleMarkConverted}
                                  />
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
                                <div className="bg-gray-100  text-gray-800 text-xs px-1.5 py-0.5 rounded">
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
                                      className="bg-gray-100 border text-gray-600 text-xs px-2 py-0.5 rounded-full"
                                    >
                                      {tag}
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-between mt-3 text-xs font-medium text-gray-500">
                                <div className="flex items-center">
                                  <TbCalendar size={16} className=" mr-1" />
                                  {lead.nextFollowUp
                                    ? formatDate(lead.nextFollowUp)
                                    : "—"}
                                </div>
                                <div className="flex items-center space-x-1 text-primary-500"><PiUserDuotone size={15}/>
                                <span>{lead.assignedToName}</span></div>
                              </div>

                              {/* Quick actions */}
                              <div className="flex mt-2 pt-2 border-t border-gray-200 justify-between">
                                <div className="flex space-x-1">
                                  <a href={`tel: ${lead.phone}`}
                                className="p-1 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                                    <TbPhoneCall size={19}/>
                                  </a>
                                  <a href={`mailto: ${lead.email}`} className="p-1 text-gray-400 hover:text-purple-600 rounded-md hover:bg-purple-50 transition-colors">
                                    <TbMailFilled size={19} />
                                  </a >
                                  <a href={`https://wa.me/${lead.phone}`} target="_blank" className="p-1 text-gray-400 hover:text-green-600 rounded-md hover:bg-green-50 transition-colors">
                                    <TbBrandWhatsapp size={19} />
                                  </a >
                                </div>
                                <div>
                                  <button
                                    onClick={() => handleViewLead(lead)}
                                    className="flex items-center space-x-1 py-1 px-2 text-xs text-gray-400 hover:text-primary-600 rounded-md bg-gray-100/60 underline underline-offset-4 hover:bg-primary-100 transition-colors"
                                  > <span>View Lead</span>
                                    <TbChevronRight size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Add lead button at the bottom of each column */}
                      <button
                        onClick={() => handleAddLead(stage.id)}
                        className="w-full mt-1 p-2 bg-white border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-primary-600 hover:border-primary-300 flex items-center justify-center transition-colors"
                      >
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

      {/* Lead Form and Detail Modals */}
      {showLeadForm && (
        <LeadForm
          initialData={selectedLead}
          onSave={handleSaveLead}
          onCancel={() => {
            setShowLeadForm(false);
            setSelectedLead(null);
          }}
        />
      )}

      {showLeadDetail && selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => {
            setShowLeadDetail(false);
            setSelectedLead(null);
          }}
          onEdit={handleEditLead}
          onDelete={handleDeleteLead}
        />
      )}
    </div>
  );
};

export default LeadManagementPage;
