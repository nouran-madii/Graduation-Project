import React, { useState } from 'react';
import { BarChart3, Users, Building2, Settings, LogOut, Search, Bell, ChevronDown, Menu, X } from 'lucide-react';

const JobHubDashboard = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [selectedMonth, setSelectedMonth] = useState('This Month');
  const [showEmployees, setShowEmployees] = useState(true);
  const [showCompanies, setShowCompanies] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Statistics' },
    { icon: Users, label: 'For Employees' },
    { icon: Building2, label: 'For Companies' },
    { icon: Settings, label: 'Settings' }
  ];

  const employees = [
    { name: 'Lindsey Stroud', email: 'lindsey.stroud@gmail.com', department: 'Technology Department', rating: 3 },
    { name: 'Sarah Brown', email: 'sarah.brown@gmail.com', department: 'Technology Department', rating: 3 },
    { name: 'Micheal Owen', email: 'michael.owen@gmail.com', department: 'Technology Department', rating: 3 },
    { name: 'Mary Jane', email: 'mary.jane@gmail.com', department: 'Technology Department', rating: 3 },
    { name: 'Peter Doodle', email: 'peter.doodle@gmail.com', department: 'Technology Department', rating: 3 }
  ];

  const handleLogout = () => {
    alert('Logging out...');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
    ));
  };

  const renderDashboard = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-gradient-to-br from-[#B8B2A8] to-[#514232] p-4 lg:p-6 rounded-lg text-white">
          <div className="text-xs lg:text-sm opacity-90 mb-2">Visitors</div>
          <div className="text-xl lg:text-2xl font-bold mb-1">22%</div>
          <div className="text-xs opacity-75">than last month</div>
        </div>
        <div className="bg-gradient-to-br from-[#B8B2A8] to-[#514232] p-4 lg:p-6 rounded-lg text-white">
          <div className="text-xs lg:text-sm opacity-90 mb-2">Courses Appliers</div>
          <div className="text-xl lg:text-2xl font-bold mb-1">36%</div>
          <div className="text-xs opacity-75">than last month</div>
        </div>
        <div className="bg-gradient-to-br from-[#B8B2A8] to-[#514232] p-4 lg:p-6 rounded-lg text-white">
          <div className="text-xs lg:text-sm opacity-90 mb-2">Hired Employees</div>
          <div className="text-xl lg:text-2xl font-bold mb-1">11%</div>
          <div className="text-xs opacity-75">than last month</div>
        </div>
        <div className="bg-gradient-to-br from-[#B8B2A8] to-[#514232] p-4 lg:p-6 rounded-lg text-white">
          <div className="text-xs lg:text-sm opacity-90 mb-2">Total Companies</div>
          <div className="text-xl lg:text-2xl font-bold mb-1">8%</div>
          <div className="text-xs opacity-75">than last month</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-base lg:text-lg font-semibold text-[#514232]">Growth Analytics</h3>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-xs lg:text-sm text-[#514232] w-full sm:w-auto"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div className="h-48 lg:h-64 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                points="20,180 60,160 100,140 140,100 180,80 220,60 260,80 300,90 340,120 380,140"
              />
              {[20,60,100,140,180,220,260,300,340,380].map((x, i) => (
                <circle key={i} cx={x} cy={[180,160,140,100,80,60,80,90,120,140][i]} r="4" fill="#ef4444" />
              ))}
            </svg>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-semibold text-[#514232] mb-4">Department Distribution</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#514232] rounded-full mr-2"></div>
                <span className="text-xs lg:text-sm text-[#514232]">Business</span>
              </div>
              <span className="text-xs lg:text-sm font-medium text-[#514232]">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#B8B2A8] rounded-full mr-2"></div>
                <span className="text-xs lg:text-sm text-[#514232]">Fine Arts</span>
              </div>
              <span className="text-xs lg:text-sm font-medium text-[#514232]">12%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-xs lg:text-sm text-[#514232]">Computer Science</span>
              </div>
              <span className="text-xs lg:text-sm font-medium text-[#514232]">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                <span className="text-xs lg:text-sm text-[#514232]">Medical</span>
              </div>
              <span className="text-xs lg:text-sm font-medium text-[#514232]">23%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={showCompanies}
                onChange={(e) => setShowCompanies(e.target.checked)}
                className="mr-2" 
              />
              <span className="text-xs lg:text-sm text-[#514232]">Companies</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={showEmployees}
                onChange={(e) => setShowEmployees(e.target.checked)}
                className="mr-2" 
              />
              <span className="text-xs lg:text-sm text-[#514232]">Employees</span>
            </label>
          </div>
        </div>
        
        {showEmployees && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 lg:p-4 text-xs lg:text-sm font-medium text-[#514232]">
                    <input type="checkbox" className="mr-2 lg:mr-3" />
                    Employee Name
                  </th>
                  <th className="text-left p-3 lg:p-4 text-xs lg:text-sm font-medium text-[#514232] hidden sm:table-cell">Email Address</th>
                  <th className="text-left p-3 lg:p-4 text-xs lg:text-sm font-medium text-[#514232]">Department</th>
                  <th className="text-left p-3 lg:p-4 text-xs lg:text-sm font-medium text-[#514232]">Rate</th>
                  <th className="text-left p-3 lg:p-4 text-xs lg:text-sm font-medium text-[#514232]">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3 lg:p-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2 lg:mr-3" />
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-[#B8B2A8] to-[#514232] rounded-full mr-2 lg:mr-3 flex items-center justify-center text-white text-xs font-medium">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs lg:text-sm text-[#514232] block truncate">{employee.name}</span>
                          <span className="text-xs text-gray-500 sm:hidden block truncate">{employee.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 lg:p-4 text-xs lg:text-sm text-[#514232] hidden sm:table-cell">{employee.email}</td>
                    <td className="p-3 lg:p-4 text-xs lg:text-sm text-[#514232]">
                      <span className="hidden lg:inline">{employee.department}</span>
                      <span className="lg:hidden">Tech Dept.</span>
                    </td>
                    <td className="p-3 lg:p-4">
                      <div className="flex space-x-1">
                        {renderStars(employee.rating)}
                      </div>
                    </td>
                    <td className="p-3 lg:p-4">
                      <div className="flex space-x-1 lg:space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded text-sm">✓</button>
                        <button className="p-1 hover:bg-gray-100 rounded text-sm">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'Dashboard':
        return renderDashboard();
      case 'Statistics':
        return <div className="text-center py-12 text-[#514232]">Statistics Section - Coming Soon</div>;
      case 'For Employees':
        return <div className="text-center py-12 text-[#514232]">Employee Management Section</div>;
      case 'For Companies':
        return <div className="text-center py-12 text-[#514232]">Company Management Section</div>;
      case 'Settings':
        return <div className="text-center py-12 text-[#514232]">Settings Section</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F1F1F1] relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-xl lg:text-2xl font-bold text-[#514232] tracking-wide">JOB HUB</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#514232] hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveSection(item.label);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 lg:px-6 py-3 text-left hover:bg-gradient-to-r hover:from-[#B8B2A8] hover:to-[#514232] hover:text-white transition-all duration-200 ${
                activeSection === item.label 
                  ? 'bg-gradient-to-r from-[#B8B2A8] to-[#514232] text-white border-r-4 border-[#514232]' 
                  : 'text-[#514232]'
              }`}
            >
              <item.icon className="w-4 h-4 lg:w-5 lg:h-5 mr-3" />
              <span className="text-sm lg:text-base">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-4 lg:p-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-[#514232] hover:bg-gradient-to-r hover:from-[#B8B2A8] hover:to-[#514232] hover:text-white rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5 mr-3" />
            <span className="text-sm lg:text-base">Log-Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 text-[#514232] hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-[#514232]">Hi Farah Tarek,</h2>
                <p className="text-xs lg:text-sm text-gray-600">Welcome Back!</p>
                <p className="text-xs text-gray-500 mt-1">📅 20 Sep, 2024</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#514232] text-sm"
                />
              </div>
              
              <button className="p-2 text-gray-600 hover:text-[#514232] transition-colors">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-[#B8B2A8] to-[#514232] rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-medium">
                  FT
                </div>
                <span className="text-xs lg:text-sm text-[#514232] font-medium hidden sm:block">Farah Tarek</span>
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400 hidden sm:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default JobHubDashboard;