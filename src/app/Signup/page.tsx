'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [educationalDetails, setEducationalDetails] = useState([{ degree: '', institution: '', yearOfCompletion: '' }]);
    const [workExperience, setWorkExperience] = useState([{ company: '', role: '', duration: '' }]);
    const [projects, setProjects] = useState([{ title: '', description: '', link: '' }]);
    const [skills, setSkills] = useState([]);
    const [achievements, setAchievements] = useState('');
    const [resume, setResume] = useState(null);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const router = useRouter();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const url = process.env.NEXT_PUBLIC_SIGNUP_URL;
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('educationalDetails', JSON.stringify(educationalDetails));
        formData.append('workExperience', JSON.stringify(workExperience));
        formData.append('projects', JSON.stringify(projects));
        formData.append('skills', JSON.stringify(skills));
        formData.append('achievements', JSON.stringify(achievements));

        if (resume) {
            formData.append('resume', resume);
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + JSON.stringify(data));
            }

            if (data.message === "User created successfully") {
                setMessage('Signup successful! Redirecting to login...');
                setTimeout(() => {
                    router.push('/');
                }, 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage('Signup failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddSkill = (e) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            const value = target.value.trim();
            if (value && !skills.includes(value)) {
                setSkills([...skills, value]);
                target.value = '';
            }
        }
    };

    const handleRemoveSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg m-6">
                <h2 className="text-2xl font-bold mb-6 text-center  text-blue-700">Create an Account</h2>
                
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        className="p-3 border border-gray-300 rounded-lg"
                        placeholder="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="p-3 border border-gray-300 rounded-lg"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Educational Details Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Educational Details</h3>
                        {educationalDetails.map((edu, index) => (
                            <div key={index} className="space-y-2">
                                <input
                                    type="text"
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => {
                                        const newEducation = [...educationalDetails];
                                        newEducation[index].degree = e.target.value;
                                        setEducationalDetails(newEducation);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => {
                                        const newEducation = [...educationalDetails];
                                        newEducation[index].institution = e.target.value;
                                        setEducationalDetails(newEducation);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Year of Completion"
                                    value={edu.yearOfCompletion}
                                    onChange={(e) => {
                                        const newEducation = [...educationalDetails];
                                        newEducation[index].yearOfCompletion = e.target.value;
                                        setEducationalDetails(newEducation);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Work Experience Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Work Experience</h3>
                        {workExperience.map((work, index) => (
                            <div key={index} className="space-y-2">
                                <input
                                    type="text"
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Company"
                                    value={work.company}
                                    onChange={(e) => {
                                        const newWorkExperience = [...workExperience];
                                        newWorkExperience[index].company = e.target.value;
                                        setWorkExperience(newWorkExperience);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Role"
                                    value={work.role}
                                    onChange={(e) => {
                                        const newWorkExperience = [...workExperience];
                                        newWorkExperience[index].role = e.target.value;
                                        setWorkExperience(newWorkExperience);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Duration"
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
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Academics/Personal Projects</h3>
                        {projects.map((project, index) => (
                            <div key={index} className="space-y-2">
                                <input
                                    type="text"
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Project Title"
                                    value={project.title}
                                    onChange={(e) => {
                                        const newProjects = [...projects];
                                        newProjects[index].title = e.target.value;
                                        setProjects(newProjects);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Link"
                                    value={project.link}
                                    onChange={(e) => {
                                        const newProjects = [...projects];
                                        newProjects[index].link = e.target.value;
                                        setProjects(newProjects);
                                    }}
                                />
                                <textarea
                                    className="p-3 border border-gray-300 rounded-lg"
                                    placeholder="Project Description"
                                    value={project.description}
                                    onChange={(e) => {
                                        const newProjects = [...projects];
                                        newProjects[index].description = e.target.value;
                                        setProjects(newProjects);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Skills Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Skills</h3>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 w-full">
                            <input
                                type="text"
                                className="flex-grow outline-none"
                                placeholder="Type a skill and press Enter"
                                onKeyDown={handleAddSkill}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
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
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Achievements</h3>
                        <textarea
                            className="p-3 border border-gray-300 rounded-lg"
                            placeholder="Achievements"
                            value={achievements}
                            onChange={(e) => setAchievements(e.target.value)}
                        />
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Upload Resume</h3>
                        <input
                            type="file"
                            className="p-3 border border-gray-300 rounded-lg w-full"
                            onChange={(e) => setResume(e.target.files[0])}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-lg text-sm mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                    {message && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">
                        {message}
                    </div>
                )}
                    <p className="text-center my-4 text-gray-600">Already have an account? <Link className="text-blue-500 font-semibold" href="./">Login</Link></p>
                </div>
            </div>
        </div>
    );
}
