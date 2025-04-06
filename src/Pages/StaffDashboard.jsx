import React, { useState, useEffect } from 'react';
import { staffMembers } from '../constants/staff';
import { getAllStaffAnalytics } from '../constants/analytics';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { ChartBarIcon, UsersIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

const StaffDashboard = () => {
  const [analytics, setAnalytics] = useState({ visits: {}, donations: {}, history: {} });
  const [sortBy, setSortBy] = useState('visits');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    const data = getAllStaffAnalytics();
    setAnalytics(data);

    // Set up periodic refresh
    const refreshInterval = setInterval(() => {
      const updatedData = getAllStaffAnalytics();
      setAnalytics(updatedData);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  const getSortedStaff = () => {
    return [...staffMembers].sort((a, b) => {
      let aValue, bValue;
      
      if (sortBy === 'visits') {
        aValue = analytics.visits[a.id] || 0;
        bValue = analytics.visits[b.id] || 0;
      } else if (sortBy === 'donations') {
        aValue = (analytics.donations[a.id]?.count || 0);
        bValue = (analytics.donations[b.id]?.count || 0);
      } else if (sortBy === 'amount') {
        aValue = (analytics.donations[a.id]?.total || 0);
        bValue = (analytics.donations[b.id]?.total || 0);
      }

      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getTotalStats = () => {
    let totalVisits = 0;
    let totalDonations = 0;
    let totalAmount = 0;
    let paymentMethods = {};
    let donationTypes = {};

    staffMembers.forEach(staff => {
      totalVisits += analytics.visits[staff.id] || 0;
      if (analytics.donations[staff.id]) {
        totalDonations += analytics.donations[staff.id].count || 0;
        totalAmount += analytics.donations[staff.id].total || 0;
        
        // Aggregate payment methods
        Object.entries(analytics.donations[staff.id].byMethod || {}).forEach(([method, count]) => {
          paymentMethods[method] = (paymentMethods[method] || 0) + count;
        });
        
        // Aggregate donation types
        Object.entries(analytics.donations[staff.id].byType || {}).forEach(([type, count]) => {
          donationTypes[type] = (donationTypes[type] || 0) + count;
        });
      }
    });

    return { totalVisits, totalDonations, totalAmount, paymentMethods, donationTypes };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const { totalVisits, totalDonations, totalAmount, paymentMethods, donationTypes } = getTotalStats();

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Referral Analytics</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Visits</p>
                <p className="text-2xl font-semibold text-gray-900">{totalVisits}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Donations</p>
                <p className="text-2xl font-semibold text-gray-900">{totalDonations}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-2xl font-semibold text-gray-900">${totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods and Donation Types Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-2">
              {Object.entries(paymentMethods).map(([method, count]) => (
                <div key={method} className="flex justify-between items-center">
                  <span className="text-gray-600">{method}</span>
                  <span className="text-gray-900 font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Types</h3>
            <div className="space-y-2">
              {Object.entries(donationTypes).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-gray-600">{type}</span>
                  <span className="text-gray-900 font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Member
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600"
                  onClick={() => toggleSort('visits')}
                >
                  Visits {sortBy === 'visits' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600"
                  onClick={() => toggleSort('donations')}
                >
                  Donations {sortBy === 'donations' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600"
                  onClick={() => toggleSort('amount')}
                >
                  Total Amount {sortBy === 'amount' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getSortedStaff().map((staff) => {
                const staffHistory = analytics.history[staff.id] || { visits: [], donations: [] };
                const lastActivity = [...staffHistory.visits, ...staffHistory.donations]
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

                return (
                  <tr 
                    key={staff.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedStaff(selectedStaff === staff.id ? null : staff.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        <div className="text-sm text-gray-500">{staff.role}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {analytics.visits[staff.id] || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {analytics.donations[staff.id]?.count || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(analytics.donations[staff.id]?.total || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lastActivity ? formatDate(lastActivity.timestamp) : 'No activity'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Detailed Staff View */}
        {selectedStaff && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Detailed Activity - {staffMembers.find(s => s.id === selectedStaff)?.name}
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Recent Visits</h4>
                <div className="space-y-2">
                  {(analytics.history[selectedStaff]?.visits || [])
                    .slice(-5)
                    .reverse()
                    .map((visit, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{formatDate(visit.timestamp)}</span>
                        <span className="text-gray-500">{visit.platform}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Recent Donations</h4>
                <div className="space-y-2">
                  {(analytics.history[selectedStaff]?.donations || [])
                    .slice(-5)
                    .reverse()
                    .map((donation, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{formatDate(donation.timestamp)}</span>
                        <span className="text-gray-900">${donation.amount.toFixed(2)}</span>
                        <span className="text-gray-500">{donation.paymentMethod}</span>
                        <span className="text-gray-500">{donation.donationType}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default StaffDashboard; 