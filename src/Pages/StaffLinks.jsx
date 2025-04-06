import React, { useState } from 'react';
import { staffMembers } from '../constants/staff';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { ClipboardDocumentIcon, CheckIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import QRCode from 'react-qr-code';

const StaffLinks = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [showQR, setShowQR] = useState(null);
  const baseUrl = window.location.origin;

  const copyToClipboard = (staffId) => {
    const link = `${baseUrl}/reltoken/${staffId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(staffId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleQRCode = (staffId) => {
    setShowQR(showQR === staffId ? null : staffId);
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Referral Links</h1>
          <div className="text-sm text-gray-500">
            Total Staff Members: {staffMembers.length}
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {staffMembers.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{staff.name}</h2>
                  <p className="text-sm text-gray-500">{staff.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{staff.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleQRCode(staff.id)}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    title="Show QR Code"
                  >
                    <QrCodeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(staff.id)}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    title="Copy Link"
                  >
                    {copiedId === staff.id ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      <ClipboardDocumentIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 break-all">
                  {`${baseUrl}/reltoken/${staff.id}`}
                </p>
              </div>

              {showQR === staff.id && (
                <div className="mt-4 flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <QRCode
                    value={`${baseUrl}/reltoken/${staff.id}`}
                    size={150}
                    level="H"
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Scan to visit referral link
                  </p>
                </div>
              )}

              {copiedId === staff.id && (
                <p className="text-sm text-green-600 mt-2">Link copied!</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaffLinks; 