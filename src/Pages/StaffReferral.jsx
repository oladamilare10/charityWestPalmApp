import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveStaffReferral, staffMembers } from '../constants/staff';
import { trackReferralVisit } from '../constants/analytics';

const StaffReferral = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const staff = staffMembers.find(s => s.id === staffId);
    
    if (staff) {
      // Track the referral visit
      trackReferralVisit(staffId);
      
      // Save the staff ID to localStorage
      saveStaffReferral(staffId);
      
      // Redirect to donation page
      navigate('/donate', { 
        state: { 
          referralMessage: `Thank you for coming through ${staff.name}'s referral!`
        }
      });
    } else {
      // If invalid staff ID, redirect to home page
      navigate('/');
    }
  }, [staffId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting you to our donation page...</p>
      </div>
    </div>
  );
};

export default StaffReferral; 