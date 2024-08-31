'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 



const MainPage: React.FC<{ initialData?: any }> = ({ initialData = {} }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [educationalDetails, setEducationalDetails] = useState(initialData.educationalDetails || [{ degree: '', institution: '', yearOfCompletion: '' }]);
    const [workExperience, setWorkExperience] = useState(initialData.workExperience || [{ company: '', role: '', duration: '' }]);
    const [projects, setProjects] = useState(initialData.projects || [{ title: '', description: '', link: '' }]);
    const [skills, setSkills] = useState(initialData.skills || []);
    const [achievements, setAchievements] = useState(initialData.achievements || '');
    const [resumeUrl, setResumeUrl] = useState(initialData.resumeUrl || '');
    const [resume, setResume] = useState<File | null>(null);
    const [companies, setCompanies] = useState([]);
    const [userData, setUserData] = useState<any>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editFormData, setEditFormData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {

        const token = localStorage.getItem('authToken');


        if (!token) {
            router.push('/');
            return;
        }

        const fetchUserData = async () => {
            const storedUsername = localStorage.getItem('username');
            if (!storedUsername) {
                throw new Error('Username not found in local storage');
            }
            try {


                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${storedUsername}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching user data: ' + response.statusText);
                }

                const userData = await response.json();
                setUsername(userData.username);
                setEducationalDetails(userData.educationalDetails || []);
                setWorkExperience(userData.workExperience || []);
                setProjects(userData.projects || []);
                setSkills(userData.skills || []);
                setAchievements(userData.achievements || '');
                setResumeUrl(userData.resumeUrl || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };




        const fetchCompanies = async () => {
            try {
                const response = await fetch('https://fake-json-api.mock.beeceptor.com/companies');
                if (!response.ok) {
                    throw new Error(`Error fetching companies: ${response.statusText}`);
                }
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchUserData();
        fetchCompanies();
    }, []);



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const formData = new FormData();
            formData.append('educationalDetails', JSON.stringify(editFormData.educationalDetails));
            formData.append('workExperience', JSON.stringify(editFormData.workExperience));
            formData.append('projects', JSON.stringify(editFormData.projects));
            formData.append('skills', JSON.stringify(editFormData.skills));
            formData.append('achievements', JSON.stringify(editFormData.achievements));

            // Append file if exists
            if (resume) {
                formData.append('resume', resume);
            } else if (resumeUrl) {
                formData.append('resumeUrl', resumeUrl);
            }

            await axios.put('/api/user/update', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Profile updated successfully');
            setShowEditForm(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('educationalDetails', JSON.stringify(educationalDetails));
            formData.append('workExperience', JSON.stringify(workExperience));
            formData.append('projects', JSON.stringify(projects));
            formData.append('skills', JSON.stringify(skills));
            formData.append('achievements', achievements);
    
            if (resume) {
                formData.append('resume', resume);
            }
            if (resumeUrl && !resume) {
                formData.append('resumeUrl', resumeUrl);
            }
    
            const token = localStorage.getItem('authToken');
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            const result = await response.json();
            console.log('Response from backend:', result);
    
            if (response.ok) {
                console.log('Profile updated successfully');
                // Update the UI with the new resume URL
                setResumeUrl(result.resumeUrl || resumeUrl);
                alert("Data Updated Successfully");
            } else {
                console.error('Error updating profile:', result.message || response.statusText);
                alert(`Error: ${result.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        }
    
        togglePopup();
    };
    
    


    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            const value = target.value.trim();
            if (value && !skills.includes(value)) {
                setSkills([...skills, value]);
                target.value = '';
            }
        }
    };

    const handleRemoveSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleLogout = () => {    
        localStorage.removeItem('authToken');
        router.push('/');
    };

    return (
        <div className='flex flex-col items-center'>
            {/* Navbar */}
            <nav className='w-full bg-blue-500 text-white p-4 flex justify-between items-center sticky top-0'>
                <h1 className='text-xl font-bold'>YourHR</h1>
                <button onClick={togglePopup} className="bg-white text-blue-500 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200">Edit Profile</button>
                <button onClick={handleLogout} className="bg-white text-blue-500 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200">LogOut</button>
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-full overflow-auto">
                            <h2 className="text-2xl font-bold mb-4 text-black">Edit Profile</h2>

                            {/* Education Section */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">Educational Details</h3>
                                {educationalDetails.length > 0 ? (
                                    educationalDetails.map((edu, index) => (
                                        <div key={index} className="mb-2">
                                            <input
                                                type="text"
                                                placeholder="Degree"
                                                className="w-full p-2 border border-gray-300 rounded-lg mb-1 text-black"
                                                value={edu.degree}
                                                onChange={(e) => {
                                                    const newEducation = [...educationalDetails];
                                                    newEducation[index].degree = e.target.value;
                                                    setEducationalDetails(newEducation);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Institution"
                                                className="text-black w-full p-2 border border-gray-300 rounded-lg mb-1"
                                                value={edu.institution}
                                                onChange={(e) => {
                                                    const newEducation = [...educationalDetails];
                                                    newEducation[index].institution = e.target.value;
                                                    setEducationalDetails(newEducation);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Year of Completion"
                                                className="text-black w-full p-2 border border-gray-300 rounded-lg"
                                                value={edu.yearOfCompletion || ''}
                                                onChange={(e) => {
                                                    const newEducation = [...educationalDetails];
                                                    newEducation[index].yearOfCompletion = e.target.value;
                                                    setEducationalDetails(newEducation);
                                                }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No educational details available.</p>
                                )}
                            </div>

                            {/* Work Experience Section */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">Work Experience</h3>
                                {workExperience.map((work, index) => (
                                    <div key={index} className="mb-2">
                                        <input
                                            type="text"
                                            placeholder="Company"
                                            className="text-black w-full p-2 border border-gray-300 rounded-lg mb-1"
                                            value={work.company}
                                            onChange={(e) => {
                                                const newWorkExperience = [...workExperience];
                                                newWorkExperience[index].company = e.target.value;
                                                setWorkExperience(newWorkExperience);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Role"
                                            className="text-black w-full p-2 border border-gray-300 rounded-lg mb-1"
                                            value={work.role}
                                            onChange={(e) => {
                                                const newWorkExperience = [...workExperience];
                                                newWorkExperience[index].role = e.target.value;
                                                setWorkExperience(newWorkExperience);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Duration"
                                            className="text-black w-full p-2 border border-gray-300 rounded-lg"
                                            value={work.duration}
                                            onChange={(e) => {
                                                const newWorkExperience = [...workExperience];
                                                newWorkExperience[index].duration = e.target.value;
                                                setWorkExperience(newWorkExperience);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Projects Section */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">Projects</h3>
                                {projects.map((project, index) => (
                                    <div key={index} className="mb-2">
                                        <input
                                            type="text"
                                            placeholder="Project Title"
                                            className="text-black w-full p-2 border border-gray-300 rounded-lg mb-1"
                                            value={project.title}
                                            onChange={(e) => {
                                                const newProjects = [...projects];
                                                newProjects[index].title = e.target.value;
                                                setProjects(newProjects);
                                            }}
                                        />
                                        <textarea
                                            placeholder="Description"
                                            className="text-black w-full p-2 border border-gray-300 rounded-lg mb-1"
                                            value={project.description}
                                            onChange={(e) => {
                                                const newProjects = [...projects];
                                                newProjects[index].description = e.target.value;
                                                setProjects(newProjects);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Project Link"
                                            className="text-black w-full p-2 border border-gray-300 rounded-lg"
                                            value={project.link}
                                            onChange={(e) => {
                                                const newProjects = [...projects];
                                                newProjects[index].link = e.target.value;
                                                setProjects(newProjects);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Skills Section */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">Skills</h3>
                                <input
                                    type="text"
                                    placeholder="Press Enter to add skill"
                                    className="text-black w-full p-2 border border-gray-300 rounded-lg mb-2"
                                    onKeyDown={handleAddSkill}
                                />
                                <div className="flex flex-wrap">
                                    {skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-200 text-blue-800 py-1 px-3 rounded-lg mr-2 mb-2 flex items-center"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSkill(index)}
                                                className="ml-2 text-red-600 hover:text-red-800"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements Section */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">Achievements</h3>
                                <textarea
                                    placeholder="Achievements"
                                    className="text-black w-full p-2 border border-gray-300 rounded-lg"
                                    value={achievements}
                                    onChange={(e) => setAchievements(e.target.value)}
                                />
                            </div>

                             {/* Resume Section */}
                             <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">Resume</h3>
                                <input
                                    type="file"
                                    className="text-black w-full p-2 border border-gray-300 rounded-lg mb-2"
                                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                                />
                                {/* <input
                                    type="text"
                                    placeholder="Resume URL"
                                    className="text-black w-full p-2 border border-gray-300 rounded-lg"
                                    value={resumeUrl}
                                    onChange={(e) => setResumeUrl(e.target.value)}
                                /> */}
                                {resumeUrl && (
                                    <a href={`http://localhost:5000/${resumeUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        View Current Resume
                                    </a>
                                )}
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="bg-gray-300 text-black py-2 px-4 rounded-lg font-semibold hover:bg-gray-400"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </nav>

            {/* Main Content */}
            <div className="flex flex-col items-center p-8 w-full">
                <h2 className='text-2xl font-bold mb-4'>Company Listings</h2>
                <div className="w-full max-w-4xl">
                    {companies.map((company) => (
                        <div key={company.id} className="bg-white p-6 rounded-lg shadow-lg mb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-700">{company.name}</h2>
                                <p className="text-gray-600">{company.address}, {company.zip}, {company.country}</p>
                                <p className="text-gray-600">Industry: {company.industry}</p>
                                <p className="text-gray-600">Employees: {company.employeeCount}</p>
                                <p className="text-gray-600">CEO: {company.ceoName}</p>
                            </div>
                            <div className="flex items-center">
                                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;



// ) : (
//     <p>No companies available.</p>
// )}