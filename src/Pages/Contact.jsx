import React from 'react'
import Header from '../Components/Header'
import ContactForm from '../Components/ContactForm'
import Footer from '../Components/Footer'

const Contact = () => {
  return (
    <div>
      <Header />
      <div>
        <h1>Contact Us</h1>
        <p>Please feel free to reach out to us for any questions or concerns you may have.</p>
      </div>
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Contact
