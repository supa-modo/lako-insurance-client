import {
  FiUsers,
  FiFileText,
  FiClipboard,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

const statCards = [
  {
    title: "Total Queries",
    value: "1,284",
    change: "+12.5%",
    isPositive: true,
    icon: FiUsers,
    color: "bg-blue-500",
  },
  {
    title: "Reports Generated",
    value: "854",
    change: "+8.2%",
    isPositive: true,
    icon: FiFileText,
    color: "bg-green-500",
  },
  {
    title: "Conversion Rate",
    value: "65.2%",
    change: "-2.4%",
    isPositive: false,
    icon: FiActivity,
    color: "bg-yellow-500",
  },
  {
    title: "Plan Comparisons",
    value: "2,572",
    change: "+18.7%",
    isPositive: true,
    icon: FiClipboard,
    color: "bg-purple-500",
  },
];

const recentQueries = [
  {
    id: "1",
    name: "John Mwangi",
    email: "john.mwangi@example.com",
    phone: "+254 712 345678",
    age: 65,
    budget: 50000,
    date: "2023-10-15T09:24:00",
  },
  {
    id: "2",
    name: "Mary Kamau",
    email: "mary.kamau@example.com",
    phone: "+254 723 456789",
    age: 68,
    budget: 70000,
    date: "2023-10-15T08:12:00",
  },
  {
    id: "3",
    name: "David Ochieng",
    email: "david.ochieng@example.com",
    phone: "+254 734 567890",
    age: 72,
    budget: 100000,
    date: "2023-10-14T16:45:00",
  },
  {
    id: "4",
    name: "Sarah Njoroge",
    email: "sarah.njoroge@example.com",
    phone: "+254 745 678901",
    age: 63,
    budget: 40000,
    date: "2023-10-14T14:30:00",
  },
  {
    id: "5",
    name: "Michael Waweru",
    email: "michael.waweru@example.com",
    phone: "+254 756 789012",
    age: 70,
    budget: 65000,
    date: "2023-10-14T10:15:00",
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(amount);
};

const AdminDashboardPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Overview of insurance queries and reports
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
              </div>
              <div className={`${card.color} p-3 rounded-lg text-white`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center">
              {card.isPositive ? (
                <FiArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <FiArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={card.isPositive ? "text-green-500" : "text-red-500"}
              >
                {card.change}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                since last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Queries */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Recent Comparison Queries</h2>
          <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentQueries.map((query) => (
                <tr key={query.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {query.name}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{query.email}</div>
                    <div className="text-sm text-gray-500">{query.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {query.age} years
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(query.budget)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(query.date)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="btn btn-primary w-full">
              Add New Insurance Plan
            </button>
            <button className="btn btn-outline w-full">
              Export Queries Report
            </button>
            <button className="btn btn-outline w-full">
              Contact User List
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6 md:col-span-2">
          <h3 className="text-lg font-bold mb-4">System Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Database</span>
                <span className="text-green-500">Operational</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "97%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Comparison Engine</span>
                <span className="text-green-500">Operational</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">PDF Generation</span>
                <span className="text-green-500">Operational</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "94%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Email Notifications</span>
                <span className="text-yellow-500">Degraded</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "72%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
