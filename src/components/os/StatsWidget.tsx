import { motion } from 'framer-motion';

export const StatsWidget = () => {
    return (
        <div className="flex flex-col gap-4 p-4 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg w-full">
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider text-start mb-2">My Stats</h3>
            <div className="flex justify-between items-center gap-2">
                <StatCircle label="Experience" value={3} suffix="Years" color="text-blue-400" strokeColor="stroke-blue-400" />
                <StatCircle label="Projects" value={10} suffix="+" color="text-green-400" strokeColor="stroke-green-400" />
            </div>
        </div>
    );
};

const StatCircle = ({ label, value, suffix, color, strokeColor }: { label: string, value: number, suffix: string, color: string, strokeColor: string }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const progress = 0.75; // 75% fill for visuals

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className="text-white/10"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className={strokeColor}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        animate={{ strokeDashoffset: circumference - (progress * circumference) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className={`text-lg font-bold ${color}`}>
                        {value}{suffix}
                    </span>
                </div>
            </div>
            <span className="text-white/80 text-[10px] font-medium mt-1">{label}</span>
        </div>
    );
};
