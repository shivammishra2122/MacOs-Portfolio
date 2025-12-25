import { User, Code, Briefcase, Mail } from 'lucide-react';

export const Finder = () => {
    return (
        <div className="flex flex-col sm:flex-row h-full w-full text-black">
            {/* Sidebar */}
            <div className="w-full sm:w-48 bg-gray-100/50 backdrop-blur-xl border-b sm:border-r border-gray-200/50 flex sm:flex-col p-2 space-x-2 sm:space-x-0 sm:space-y-1 overflow-x-auto">
                <div className="hidden sm:block text-xs font-semibold text-gray-500 px-2 py-1">Favorites</div>
                <SidebarItem icon={User} label="About" active />
                <SidebarItem icon={Code} label="Projects" />
                <SidebarItem icon={Briefcase} label="Exp." />
                <SidebarItem icon={Mail} label="Contact" />
            </div>

            {/* Content Content - White background for Finder feeling */}
            <div className="flex-1 bg-white p-4 sm:p-8 overflow-auto">
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
            </div>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <button
        className={`flex-shrink-0 sm:w-full flex items-center space-x-2 px-2 py-1 rounded text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200/50'
            }`}
    >
        <Icon size={16} />
        <span className="whitespace-nowrap">{label}</span>
    </button>
);
