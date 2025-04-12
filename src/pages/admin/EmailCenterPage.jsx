import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TbSearch,
  TbRefresh,
  TbMessage,
  TbBrandGmail,
  TbMailForward,
  TbPlus,
  TbInbox,
  TbMailOpened,
  TbSend,
  TbTrash,
} from "react-icons/tb";

// Import email components
import EmailSidebar from "../../components/email/EmailSidebar";
import EmailList from "../../components/email/EmailList";
import EmailDetail from "../../components/email/EmailDetail";
import ComposeEmail from "../../components/email/ComposeEmail";
import { BsSendPlus } from "react-icons/bs";

// Mock data service (would be replaced with actual API calls)
const getMockEmails = (folder = "inbox") => {
  // Generate demo data
  const mockEmails = [
    {
      id: "e1",
      subject: "Insurance Policy Renewal - KS-243",
      sender: "Jubilee Insurance <renewals@jubilee.co.ke>",
      to: "admin@lakoinsurance.com",
      date: "2023-10-15T10:30:00",
      preview:
        "Your client Mary Kamau's policy is due for renewal in 14 days. Please review the attached documents...",
      body: "Dear Admin,\n\nYour client Mary Kamau's policy #KS-243 is due for renewal in 14 days. Please review the attached documents and contact the client to discuss renewal options.\n\nThe premium for the next period will be KES 48,500.\n\nBest regards,\nJubilee Insurance Renewals Team",
      read: false,
      starred: true,
      hasAttachment: true,
      important: true,
      attachments: [
        { name: "Policy_KS-243_Renewal.pdf", size: "1.2 MB" },
        { name: "Premium_Calculation.xlsx", size: "345 KB" },
      ],
    },
    {
      id: "e2",
      subject: "New Quote Request from Website",
      sender: "Lako CRM <notifications@lakoinsurance.com>",
      to: "admin@lakoinsurance.com",
      date: "2023-10-14T16:45:00",
      preview:
        "A new quote request has been submitted through the website. Client details: John Mwangi, age 65...",
      body: "A new quote request has been submitted through the website.\n\nClient details:\nName: John Mwangi\nAge: 65\nPhone: +254 712 345678\nEmail: john.mwangi@example.com\nDesired Coverage: Comprehensive\nBudget: KES 70,000 - 100,000\n\nPlease follow up with the client within 24 hours.",
      read: true,
      starred: false,
      hasAttachment: false,
      important: true,
    },
    {
      id: "e3",
      subject: "Meeting Confirmation: AAR Insurance Partnership",
      sender: "Sarah Njeri <sarah.njeri@aar.co.ke>",
      to: "admin@lakoinsurance.com",
      date: "2023-10-14T09:15:00",
      preview:
        "This is to confirm our meeting scheduled for October 18th at 10:00 AM to discuss the partnership...",
      body: "Dear Admin,\n\nThis is to confirm our meeting scheduled for October 18th at 10:00 AM at our offices to discuss the partnership opportunities and exclusive broker rates.\n\nPlease let me know if you need any further information or if you need to reschedule.\n\nBest regards,\nSarah Njeri\nPartnership Manager\nAAR Insurance Kenya",
      read: true,
      starred: true,
      hasAttachment: false,
      important: false,
    },
    {
      id: "e4",
      subject: "Policy Documentation - David Otieno",
      sender: "CIC Insurance <documents@cic.co.ke>",
      to: "admin@lakoinsurance.com",
      date: "2023-10-13T14:22:00",
      preview:
        "Please find attached the policy documentation for David Otieno who recently subscribed to our Senior...",
      body: "Dear Broker,\n\nPlease find attached the policy documentation for David Otieno who recently subscribed to our Senior Gold Plan (Policy #CIC-SG-4567).\n\nKindly forward these to the client and ensure they understand the coverage benefits and claim procedures.\n\nThank you for your partnership.\n\nRegards,\nCIC Insurance Documentation Team",
      read: true,
      starred: false,
      hasAttachment: true,
      important: false,
      attachments: [
        { name: "CIC-SG-4567_Policy.pdf", size: "1.8 MB" },
        { name: "Claim_Procedures.pdf", size: "560 KB" },
        { name: "Benefits_Summary.pdf", size: "780 KB" },
      ],
    },
    {
      id: "e5",
      subject: "System Maintenance Notice",
      sender: "IT Department <it@lakoinsurance.com>",
      to: "all-staff@lakoinsurance.com",
      cc: "admin@lakoinsurance.com",
      date: "2023-10-12T11:05:00",
      preview:
        "The CRM system will undergo scheduled maintenance tonight from 11:00 PM to 2:00 AM...",
      body: "Dear Team,\n\nThe CRM system will undergo scheduled maintenance tonight from 11:00 PM to 2:00 AM. During this time, the system will be inaccessible.\n\nWe recommend completing any critical tasks before the maintenance window.\n\nThank you for your understanding.\n\nBest regards,\nIT Department",
      read: true,
      starred: false,
      hasAttachment: false,
      important: false,
    },
  ];

  // Filter emails based on folder
  if (folder === "inbox") {
    return mockEmails;
  } else if (folder === "starred") {
    return mockEmails.filter((email) => email.starred);
  } else if (folder === "sent") {
    return [
      {
        id: "s1",
        subject: "RE: Senior Health Insurance Quote",
        sender: "admin@lakoinsurance.com",
        to: "peter.kamau@example.com",
        date: "2023-10-13T09:30:00",
        preview:
          "Thank you for your interest in our senior health insurance plans. Based on the details you provided...",
        body: "Dear Peter,\n\nThank you for your interest in our senior health insurance plans. Based on the details you provided, I have prepared three options that might suit your needs.\n\nPlease find attached the quote comparison for your review.\n\nI would be happy to schedule a call to discuss these options in more detail. Please let me know a convenient time for you.\n\nBest regards,\nAdmin\nLako Insurance",
        read: true,
        starred: false,
        hasAttachment: true,
        important: false,
        attachments: [
          { name: "Senior_Health_Quote_Comparison.pdf", size: "980 KB" },
        ],
      },
      {
        id: "s2",
        subject: "Policy Renewal Reminder - Joyce Omondi",
        sender: "admin@lakoinsurance.com",
        to: "joyce.omondi@example.com",
        date: "2023-10-12T14:15:00",
        preview:
          "This is a friendly reminder that your health insurance policy #JH-567 is due for renewal on November 1st...",
        body: "Dear Joyce,\n\nThis is a friendly reminder that your health insurance policy #JH-567 is due for renewal on November 1st, 2023.\n\nTo ensure continuous coverage, please let us know if you wish to proceed with the renewal. The premium for the next period will be KES 52,300.\n\nWe can also explore other plans that might better suit your current needs. Please feel free to schedule a consultation.\n\nBest regards,\nAdmin\nLako Insurance",
        read: true,
        starred: false,
        hasAttachment: false,
        important: false,
      },
    ];
  } else if (folder === "drafts") {
    return [
      {
        id: "d1",
        subject: "Partnership Proposal - Medicare Health",
        sender: "admin@lakoinsurance.com",
        to: "partnerships@medicare.co.ke",
        date: "2023-10-14T16:20:00",
        preview:
          "Following our discussion last week, I am pleased to submit our formal partnership proposal...",
        body: "Dear Medicare Team,\n\nFollowing our discussion last week, I am pleased to submit our formal partnership proposal for consideration.\n\nLako Insurance has been specializing in senior health insurance for over 10 years, and we believe a partnership with Medicare Health would create significant value for both our organizations and our clients.\n\n[DRAFT - TO BE COMPLETED]",
        read: true,
        starred: false,
        hasAttachment: false,
        important: false,
        isDraft: true,
      },
    ];
  } else {
    return [];
  }
};

const EmailCenterPage = () => {
  const navigate = useNavigate();
  const { folder = "inbox", emailId } = useParams();

  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [replyToEmail, setReplyToEmail] = useState(null);
  const [emailCount, setEmailCount] = useState({
    inbox: 0,
    unread: 0,
    starred: 0,
    sent: 0,
    drafts: 0,
  });

  // Fetch emails based on the selected folder
  useEffect(() => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const fetchedEmails = getMockEmails(folder);
      setEmails(fetchedEmails);

      // Update email counts
      setEmailCount({
        inbox: getMockEmails("inbox").length,
        unread: getMockEmails("inbox").filter((e) => !e.read).length,
        starred: getMockEmails("starred").length,
        sent: getMockEmails("sent").length,
        drafts: getMockEmails("drafts").length,
      });

      // If an email ID is provided in the URL, select that email
      if (emailId) {
        const email = fetchedEmails.find((e) => e.id === emailId);
        setSelectedEmail(email || null);
      } else {
        setSelectedEmail(null);
      }

      setLoading(false);
    }, 500);
  }, [folder, emailId]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would filter emails from the API
    console.log("Searching for:", searchQuery);
  };

  // Handle compose email
  const handleComposeClick = () => {
    setReplyToEmail(null);
    setShowComposeModal(true);
  };

  // Handle reply to email
  const handleReply = (email, replyAll = false) => {
    setReplyToEmail(email);
    setShowComposeModal(true);
  };

  // Handle forward email
  const handleForward = (email) => {
    // Modify the email for forwarding
    const forwardEmail = {
      ...email,
      subject: `FW: ${email.subject}`,
      to: "",
      sender: email.sender,
      body: `\n\n\n-------- Forwarded Message --------\nFrom: ${
        email.sender
      }\nDate: ${new Date(email.date).toLocaleString()}\nSubject: ${
        email.subject
      }\nTo: ${email.to}\n\n${email.body || ""}`,
    };

    setReplyToEmail(forwardEmail);
    setShowComposeModal(true);
  };

  // Handle send email
  const handleSendEmail = (emailData) => {
    console.log("Sending email:", emailData);
    // In a real app, this would send the email via API
    setShowComposeModal(false);
    setReplyToEmail(null);

    // Show success notification
    alert("Email sent successfully!");
  };

  // Handle delete email
  const handleDeleteEmail = (emailId) => {
    // In a real app, this would delete via API
    setEmails(emails.filter((email) => email.id !== emailId));
    setSelectedEmail(null);
    navigate(`/admin/mail/${folder}`);
  };

  // Handle back button in email detail
  const handleBackToList = () => {
    setSelectedEmail(null);
    navigate(`/admin/mail/${folder === "inbox" ? "" : folder}`);
  };

  // Filter emails by search query
  const filteredEmails = searchQuery
    ? emails.filter(
        (email) =>
          email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (email.body &&
            email.body.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : emails;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Email center header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-primary-600">
              Email Center
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your email communications
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3 py-2 w-96 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-neutral-800 text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbSearch className="h-5 w-5 text-neutral-400" />
              </div>
            </div>

            <button className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <TbRefresh />
            </button>

            <button
              onClick={handleComposeClick}
              className="bg-primary-600 text-white rounded-lg px-6 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
            >
              <BsSendPlus className="mr-3 h-5 w-5 rotate-12" /> New Email
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex flex-col pl-4">
        <div className="flex-1 flex overflow-hidden">
          {/* Email sidebar */}
          <div className="w-64 border-r border-neutral-200 bg-neutral-100 flex-shrink-0 overflow-hidden">
            <EmailSidebar
              folder={folder}
              onComposeClick={handleComposeClick}
              counts={emailCount}
            />
          </div>

          {/* Email content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-300 border-t-primary-600 mb-2"></div>
                  <p className="text-neutral-700">Loading emails...</p>
                </div>
              </div>
            ) : selectedEmail ? (
              <div className="flex-1 overflow-auto">
                <EmailDetail
                  email={selectedEmail}
                  onBack={handleBackToList}
                  onReply={handleReply}
                  onForward={handleForward}
                  onDelete={handleDeleteEmail}
                />
              </div>
            ) : (
              <div className="flex-1 overflow-auto">
                <EmailList
                  emails={filteredEmails}
                  selectedFolder={folder}
                  onSelectEmail={setSelectedEmail}
                  onDeleteEmail={handleDeleteEmail}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Email Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ComposeEmail
            email={replyToEmail}
            onClose={() => setShowComposeModal(false)}
            onSend={handleSendEmail}
          />
        </div>
      )}
    </div>
  );
};

export default EmailCenterPage;
