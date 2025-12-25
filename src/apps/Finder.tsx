import { useState } from 'react';
import { User, Code, Briefcase, Mail } from 'lucide-react';

interface FinderProps {
    initialSection?: string;
}

export const Finder = ({ initialSection = 'About' }: FinderProps) => {
    const [activeSection, setActiveSection] = useState(initialSection);

    // Update active section if initialSection changes (optional, but good for direct control)
    // useEffect(() => setActiveSection(initialSection), [initialSection]);

    const renderContent = () => {
        switch (activeSection) {
            case 'About':
                return (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Shivam Mishra</h1>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            Software Engineer based in India. Passionate about building high-quality, user-centric web applications.
                        </p>
                        <div className="h-px w-full bg-gray-200 my-4 sm:my-6" />

                        <h2 className="text-lg sm:text-xl font-semibold mb-2">Summary</h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            Experienced front-end developer specializing in React ecosystem.
                            I love creating interfaces that are pixel-perfect and highly interactive.
                            (Replace this with real resume content).
                        </p>
                    </>
                );
            case 'Projects':
                return (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Projects</h1>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            Here are some of the projects I've worked on.
                        </p>
                        {/* Placeholder for projects list */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold">Project A</h3>
                                <p className="text-sm text-gray-500">Description of Project A</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold">Project B</h3>
                                <p className="text-sm text-gray-500">Description of Project B</p>
                            </div>
                        </div>
                    </>
                );
            case 'Exp.':
                return (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Experience</h1>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Senior Developer @ Company X</h3>
                                <p className="text-sm text-gray-500">2023 - Present</p>
                                <p className="text-sm text-gray-600">Leading the frontend team...</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Developer @ Company Y</h3>
                                <p className="text-sm text-gray-500">2021 - 2023</p>
                                <p className="text-sm text-gray-600">Built scalable web apps...</p>
                            </div>
                        </div>
                    </>
                );
            case 'Contact':
                return (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Contact</h1>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            Get in touch with me!
                        </p>
                        <ul className="space-y-2">
                            <li>Email: shivam@example.com</li>
                            <li>LinkedIn: linkedin.com/in/shivam</li>
                            <li>GitHub: github.com/shivam</li>
                        </ul>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col sm:flex-row h-full w-full text-black">
            {/* Sidebar */}
            <div className="w-full sm:w-48 bg-gray-100/50 backdrop-blur-xl border-b sm:border-r border-gray-200/50 flex sm:flex-col p-2 space-x-2 sm:space-x-0 sm:space-y-1 overflow-x-auto">
                <div className="hidden sm:block text-xs font-semibold text-gray-500 px-2 py-1">Favorites</div>
                <SidebarItem
                    icon={User}
                    label="About"
                    active={activeSection === 'About'}
                    onClick={() => setActiveSection('About')}
                />
                <SidebarItem
                    icon={Code}
                    label="Projects"
                    active={activeSection === 'Projects'}
                    onClick={() => setActiveSection('Projects')}
                />
                <SidebarItem
                    icon={Briefcase}
                    label="Exp."
                    active={activeSection === 'Exp.'}
                    onClick={() => setActiveSection('Exp.')}
                />
                <SidebarItem
                    icon={Mail}
                    label="Contact"
                    active={activeSection === 'Contact'}
                    onClick={() => setActiveSection('Contact')}
                />
            </div>

            {/* Content Content - White background for Finder feeling */}
            <div className="flex-1 bg-white p-4 sm:p-8 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex-shrink-0 sm:w-full flex items-center space-x-2 px-2 py-1 rounded text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200/50'
            }`}
    >
        <Icon size={16} />
        <span className="whitespace-nowrap">{label}</span>
    </button>
);
