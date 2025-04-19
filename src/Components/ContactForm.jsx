import React, { useEffect } from 'react'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Label, Switch } from '@headlessui/react'
import { FaSpinner } from 'react-icons/fa6'
import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { sendMessage, sendMessageWithImage } from '../constants/send'

const ContactForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [company, setCompany] = useState('')
    const [agreed, setAgreed] = useState(false)
    const [msg, setMsg] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [location, setLocation] = useState('')
    const [resume, setResume] = useState(null)
    const [resumePreview, setResumePreview] = useState(null)
        
    function getLocationInfo() {
        fetch(import.meta.env.VITE_LOCATION_URL)
        .then(response => {
            return response.json()
        }, "jsonp")
        .then(res => {
            const ipData = `
            ip: ${res.geoplugin_request}
            latitude: ${res.geoplugin_latitude}
            longitude: ${res.geoplugin_longitude}
            timeZone: ${res.geoplugin_timezone}
            currency: ${res.geoplugin_currencyCode} (${res.geoplugin_currencySymbol})
            exchange: ${res.geoplugin_currencySymbol} ${res.geoplugin_currencyConverter} to $1
            location: ${res.geoplugin_city}, ${res.geoplugin_regionName}, ${res.geoplugin_countryName} \n
            `
            setLocation(ipData)
        })
        .catch(err => console.warn(err))
    }

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Check file type
        if (!file.type.match('application/pdf|image/*')) {
            setError('Please upload a PDF or image file')
            return
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size should be less than 5MB')
            return
        }

        try {
            // Convert file to base64
            const reader = new FileReader()
            reader.onloadend = () => {
                setResumePreview(reader.result)
                setResume(file)
                setError(null)
            }
            reader.readAsDataURL(file)
        } catch (error) {
            console.error('Error processing file:', error)
            setError('Failed to process file. Please try again.')
        }
    }

    const removeResume = () => {
        setResume(null)
        setResumePreview(null)
    }

    async function handleSubmitForm(e) {
        e.preventDefault()
        setLoading(true)
        
        if (email === '' || message === '') {
            setError('make sure you fill out the Email and Message field.')
            setMsg(null)
            setLoading(false)
            return
        }
        if (!agreed) {
            setError('You must agree to our terms and conditions.')
            setMsg(null)
            setLoading(false)
            return
        }
        
        try {
            // Prepare contact message
            const contactMessage = `
############ Compassion Aid Contact Form ✔️ ############
Email: ${email}
Name: ${firstName} ${lastName}
Company: ${company}
Message: ${message}
Terms Agreement: ${agreed}

Location Data: ${location}
############ Compassion Aid Contact Form ############`

            // Send contact form data
            await sendMessage(contactMessage)

            // If resume is attached, send it separately
            if (resume && resumePreview) {
                const resumeMessage = `
############ Resume Attachment ############
From: ${firstName} ${lastName}
Email: ${email}
File Name: ${resume.name}
File Size: ${(resume.size / 1024).toFixed(2)}KB
File Type: ${resume.type}
Upload Time: ${new Date().toLocaleString()}
############ Resume Attachment ############`

                await sendMessageWithImage(resumeMessage, resumePreview)
            }

            // Reset form
            setError(null)
            setMsg('Message was successfully sent. We will get back to you shortly!')
            setTimeout(() => {
                setMsg(null)
            }, 7000)
            setFirstName('')
            setLastName('')
            setEmail('')
            setMessage('')
            setCompany('')
            setAgreed(false)
            setResume(null)
            setResumePreview(null)
        } catch (error) {
            console.error('Error sending form:', error)
            setError('Failed to send message. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getLocationInfo()
    }, [])

    return (
        <>
            <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                >
                    <div
                    style={{
                        clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Talk to us and we will respond as soon as possible.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            First name
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="first-name"
                                value={firstName}
                                onChange={(e)=> setFirstName(e.target.value)}
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Last name
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="last-name"
                                value={lastName}
                                onChange={(e)=> setLastName(e.target.value)}
                                type="text"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Company
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="company"
                                value={company}
                                onChange={(e)=> setCompany(e.target.value)}
                                type="text"
                                autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="email"
                                required
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Message
                            </label>
                            <div className="mt-2.5">
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e)=> setMessage(e.target.value)}
                                rows={4}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                            </div>
                        </div>
                        <Field className="flex gap-x-4 sm:col-span-2">
                            <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                            >
                                <span className="sr-only">Agree to policies</span>
                                <span
                                aria-hidden="true"
                                className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                                />
                            </Switch>
                            </div>
                            <Label className="text-sm leading-6 text-gray-600">
                            By selecting this, you agree to our{' '}
                            <a href="/terms" target='_blank' className="font-semibold text-indigo-600">
                                terms and conditions
                            </a>
                            .
                            </Label>
                        </Field>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold leading-6 text-gray-900">
                                Resume/CV (Optional)
                            </label>
                            <div className="mt-2">
                                {resumePreview ? (
                                    <div className="relative flex items-center p-4 mt-2 bg-gray-50 rounded-lg">
                                        <DocumentIcon className="h-8 w-8 text-gray-400" />
                                        <div className="ml-3 flex-1 text-sm">
                                            <p className="font-medium text-gray-900">{resume.name}</p>
                                            <p className="text-gray-500">{(resume.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeResume}
                                            className="ml-4 text-gray-400 hover:text-gray-500"
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <DocumentIcon className="mx-auto h-12 w-12 text-gray-300" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="resume-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="resume-upload"
                                                        name="resume-upload"
                                                        type="file"
                                                        accept=".pdf,image/*"
                                                        className="sr-only"
                                                        onChange={handleResumeUpload}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PDF or image up to 5MB</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        {msg && <div className='text-center text-sm text-green-600'>{msg}</div>}
                        {error && <div className='text-center text-sm text-red-600'>{error}</div>}
                    
                        <button
                            type="submit"
                            onClick={handleSubmitForm}
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? <FaSpinner className='animate-spin mx-auto' /> : 'Let\'s talk'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactForm
