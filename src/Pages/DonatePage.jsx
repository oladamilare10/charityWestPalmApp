import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import DonateHeader from '../Components/donate/DonateHeader'
import DonateForm from '../Components/donate/DonateForm'
import { sendMessage } from '../constants/send';

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
  const [sentMessage, setSentMessage] = useState(false);
  useEffect(()=> {
    if (localStorage.getItem("donatePage")) {
      setSentMessage(true);
      return
    }
    if (!sentMessage) {
      sendMessage("new donate Impression");
      setSentMessage(true);
      localStorage.setItem("donatePage", true);
      return
    }
  }, []);
    const [page, setPage] = useState(false)
  return (
    <div>
      <Header />
      <DonateHeader page={page} />
      <DonateForm page={page} setPage={setPage} />
      <FormFooter />
    </div>
  )
}

export default DonatePage
