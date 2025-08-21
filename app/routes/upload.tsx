import React, { useState, type FormEvent } from 'react'
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'

const upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDecription = formData.get('job-decription');

        console.log({
            companyName, jobTitle, jobDecription, file
        })
    }

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className='page-heading py-16'>
                    <h1>Smart Feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" alt="resume scan" className='w-full' />
                        </>
                    ) : (
                        <h2>Drop Your Resume for an ATS Score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                            <div className='form-div'>
                                <label htmlFor="company-name">Company Name:</label>
                                <input type="text" name='company-name' placeholder='Company Name' id='company-name' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-title">Job Title:</label>
                                <input type="text" name='job-title' placeholder='Job Title' id='job-title' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-decription">Job Decription:</label>
                                <textarea rows={5} name='job-decription' placeholder='Job Decription' id='job-decription' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="uplaoder">Upload Resume:</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>
                            <button className='primary-button' type='submit'>
                                Analyze resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}

export default upload
