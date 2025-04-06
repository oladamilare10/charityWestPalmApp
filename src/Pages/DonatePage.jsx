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
      <div className="fixed bottom-0 left-0 right-0 bg-white mt-8 flex justify-center flex-wrap text-gray-600 border-t py-2">
        &copy; {currentYear} Compassion Aid. All rights reserved. |
        <a href="/terms" target="_blank" className="text-indigo-600 font-semibold mx-1 hover:underline">Terms & Conditions</a> |
        <a href="/policy" target="_blank" className="text-indigo-600 font-semibold mx-1 hover:underline">Privacy & Policy</a>
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
    <div>
      <Header />
      {(location.state?.referralMessage || referringStaff) && (
        <div className="bg-indigo-50 p-4">
          <div className="max-w-3xl mx-auto text-center text-indigo-700">
            {location.state?.referralMessage || `Welcome! You were referred by ${referringStaff.name}`}
          </div>
        </div>
      )}
      <DonateHeader page={page} />
      <DonateForm page={page} setPage={setPage} referringStaff={referringStaff} />
      <FormFooter />
    </div>
  );
};

export default DonatePage;
