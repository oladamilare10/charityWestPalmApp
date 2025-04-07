import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import DonateHeader from '../Components/donate/DonateHeader'
import DonateForm from '../Components/donate/DonateForm'
import { sendMessage } from '../constants/send'
import { useNavigate, useLocation } from 'react-router-dom'
import { getReferringStaff } from '../constants/staff'

const FormFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
      <div className="mt-auto bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            &copy; {currentYear} Compassion Aid. All rights reserved. |
            <a href="/terms" target="_blank" className="text-indigo-600 font-semibold mx-1 hover:underline">Terms & Conditions</a> |
            <a href="/policy" target="_blank" className="text-indigo-600 font-semibold mx-1 hover:underline">Privacy & Policy</a>
          </div>
        </div>
      </div>
    )
};

const DonatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sentMessage, setSentMessage] = useState(false);
  const [page, setPage] = useState(false);
  const referringStaff = getReferringStaff();

  useEffect(() => {
    if (localStorage.getItem("donatePage")) {
      setSentMessage(true);
      return;
    }
    if (!localStorage.getItem("visited")) {
      sendMessage("from Google ads visited");
      navigate("/");
      return;
    }
    if (!sentMessage) {
      const message = referringStaff 
        ? `new donate Impression (referred by ${referringStaff.name})`
        : "new donate Impression";
      sendMessage(message);
      setSentMessage(true);
      localStorage.setItem("donatePage", true);
      return;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {(location.state?.referralMessage || referringStaff) && (
        <div className="bg-indigo-50 p-4">
          <div className="max-w-3xl mx-auto text-center text-indigo-700">
            {location.state?.referralMessage || `Welcome! You were referred by ${referringStaff.name}`}
          </div>
        </div>
      )}
      <div className="flex-grow">
        <DonateHeader page={page} />
        <DonateForm page={page} setPage={setPage} referringStaff={referringStaff} />
      </div>
      <FormFooter />
    </div>
  );
};

export default DonatePage;
