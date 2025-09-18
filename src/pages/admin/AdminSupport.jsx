import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  Mail,
  Phone,
  Calendar,
  Tag,
  Eye,
  Reply,
  Archive,
  Trash2,
  Star,
  Flag,
  Send,
  FileText,
  Download,
  RefreshCw,
  DollarSign,
  Settings,
  X
} from "lucide-react";

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  // Mock data
  const mockTickets = [
    {
      id: 1,
      subject: "Payment issue with my subscription",
      user: {
        name: "John Doe",
        email: "john@example.com",
        id: "user_123"
      },
      status: "open",
      priority: "high",
      category: "Billing",
      createdAt: "2024-03-15T10:30:00Z",
      updatedAt: "2024-03-15T14:20:00Z",
      lastMessage: "I was charged twice for my premium subscription this month. Can you please help me resolve this?",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "I was charged twice for my premium subscription this month. Can you please help me resolve this?",
          timestamp: "2024-03-15T10:30:00Z"
        }
      ],
      assignedTo: null,
      tags: ["billing", "subscription", "payment"]
    },
    {
      id: 2,
      subject: "Track upload not working",
      user: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        id: "user_456"
      },
      status: "in_progress",
      priority: "medium",
      category: "Technical",
      createdAt: "2024-03-14T15:45:00Z",
      updatedAt: "2024-03-15T09:15:00Z",
      lastMessage: "I've been trying to upload my track for 2 hours but it keeps failing. The error message says 'Upload failed' but doesn't give more details.",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "I've been trying to upload my track for 2 hours but it keeps failing. The error message says 'Upload failed' but doesn't give more details.",
          timestamp: "2024-03-14T15:45:00Z"
        },
        {
          id: 2,
          sender: "admin",
          message: "Hi Sarah, I'm looking into this upload issue for you. Can you try uploading a smaller file first to see if it's a file size issue?",
          timestamp: "2024-03-15T09:15:00Z"
        }
      ],
      assignedTo: "admin_1",
      tags: ["upload", "technical", "file-size"]
    },
    {
      id: 3,
      subject: "Account verification problem",
      user: {
        name: "Mike Rodriguez",
        email: "mike@example.com",
        id: "user_789"
      },
      status: "resolved",
      priority: "low",
      category: "Account",
      createdAt: "2024-03-13T08:20:00Z",
      updatedAt: "2024-03-14T16:30:00Z",
      lastMessage: "Thank you for your help! The verification worked perfectly.",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "I can't verify my email address. I've clicked the link multiple times but nothing happens.",
          timestamp: "2024-03-13T08:20:00Z"
        },
        {
          id: 2,
          sender: "admin",
          message: "Hi Mike, I've manually verified your account. You should now have full access to all features.",
          timestamp: "2024-03-14T10:15:00Z"
        },
        {
          id: 3,
          sender: "user",
          message: "Thank you for your help! The verification worked perfectly.",
          timestamp: "2024-03-14T16:30:00Z"
        }
      ],
      assignedTo: "admin_2",
      tags: ["verification", "email", "account"]
    },
    {
      id: 4,
      subject: "Copyright claim dispute",
      user: {
        name: "Emma Wilson",
        email: "emma@example.com",
        id: "user_321"
      },
      status: "open",
      priority: "urgent",
      category: "Legal",
      createdAt: "2024-03-15T12:00:00Z",
      updatedAt: "2024-03-15T12:00:00Z",
      lastMessage: "I received a copyright claim on my original track. This is clearly a mistake as I composed this track myself.",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "I received a copyright claim on my original track. This is clearly a mistake as I composed this track myself.",
          timestamp: "2024-03-15T12:00:00Z"
        }
      ],
      assignedTo: null,
      tags: ["copyright", "legal", "dispute"]
    }
  ];

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTickets(mockTickets);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading tickets:', error);
      setLoading(false);
    }
  };

  const handleTicketAction = async (ticketId, action) => {
    try {
      console.log(`Performing ${action} on ticket ${ticketId}`);
      // Implement ticket actions
      await loadTickets();
    } catch (error) {
      console.error('Error performing ticket action:', error);
    }
  };

  const handleReply = async (ticketId) => {
    try {
      if (!replyMessage.trim()) return;
      
      // Add reply to ticket
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            messages: [
              ...ticket.messages,
              {
                id: ticket.messages.length + 1,
                sender: "admin",
                message: replyMessage,
                timestamp: new Date().toISOString()
              }
            ],
            status: "in_progress",
            updatedAt: new Date().toISOString()
          };
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      setReplyMessage("");
      setShowTicketModal(false);
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Billing': return <DollarSign className="h-4 w-4" />;
      case 'Technical': return <Settings className="h-4 w-4" />;
      case 'Account': return <User className="h-4 w-4" />;
      case 'Legal': return <FileText className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-1">Manage user support requests and provide assistance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Tickets
          </button>
          <button
            onClick={loadTickets}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">
                {tickets.filter(t => t.status === 'open').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {tickets.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {tickets.filter(t => t.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tickets by subject, user, or category..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Support Tickets ({filteredTickets.length})
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTickets.length === filteredTickets.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTickets(filteredTickets.map(t => t.id));
                  } else {
                    setSelectedTickets([]);
                  }
                }}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading tickets...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTickets.includes(ticket.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTickets([...selectedTickets, ticket.id]);
                            } else {
                              setSelectedTickets(selectedTickets.filter(id => id !== ticket.id));
                            }
                          }}
                          className="rounded border-gray-300 mr-3"
                        />
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            {getCategoryIcon(ticket.category)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {ticket.subject}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {ticket.lastMessage}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{ticket.user.name}</div>
                          <div className="text-sm text-gray-500">{ticket.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimeAgo(ticket.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowTicketModal(true);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowTicketModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-600"
                        >
                          <Reply className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleTicketAction(ticket.id, 'archive')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredTickets.length === 0 && !loading && (
          <div className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedTickets.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-700">
              {selectedTickets.length} ticket(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700">
                Mark In Progress
              </button>
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                Mark Resolved
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Support Ticket #{selectedTicket.id}</h3>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Ticket Header */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Ticket Information</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Subject:</strong> {selectedTicket.subject}</div>
                    <div><strong>Category:</strong> {selectedTicket.category}</div>
                    <div><strong>Priority:</strong> 
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </span>
                    </div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">User Information</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Name:</strong> {selectedTicket.user.name}</div>
                    <div><strong>Email:</strong> {selectedTicket.user.email}</div>
                    <div><strong>User ID:</strong> {selectedTicket.user.id}</div>
                    <div><strong>Created:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Conversation</h4>
              <div className="space-y-4">
                {selectedTicket.messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-purple-600 text-white'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-gray-500' : 'text-purple-100'
                      }`}>
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Reply to Ticket</h4>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                placeholder="Type your reply here..."
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReply(selectedTicket.id)}
                  disabled={!replyMessage.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
