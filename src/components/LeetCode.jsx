import { motion } from 'framer-motion';
import { useMemo } from 'react';

const LeetCode = () => {
    const { activityData, monthName } = useMemo(() => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        // Select exactly 3 unique random days
        const activeDays = new Set();
        while (activeDays.size < 3) {
            activeDays.add(Math.floor(Math.random() * daysInMonth) + 1);
        }

        const data = Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            active: activeDays.has(i + 1)
        }));

        return { activityData: data, monthName: month };
    }, []);

    return (
        <section className="py-10 px-6 relative z-10 flex justify-center">
            <div className="max-w-3xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-black/40 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12"
                >
                    {/* Stats & Graph */}
                    <div className="flex items-center gap-8">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="60"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-gray-800"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="60"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 60}
                                    strokeDashoffset={2 * Math.PI * 60 * (1 - 19 / 3758)}
                                    className="text-yellow-500"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-white">19</span>
                                <span className="text-xs text-gray-500">/ 3758</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-1">LeetCode</h3>
                            <p className="text-gray-400 text-sm mb-2">Problem Solving</p>
                            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-medium w-fit">
                                Latest: Problem #2154
                            </div>
                        </div>
                    </div>

                    {/* Activity Grid */}
                    <div className="flex flex-col items-end">
                        <h4 className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">{monthName} Activity</h4>
                        <div className="grid grid-cols-7 gap-2">
                            {activityData.map((day) => (
                                <motion.div
                                    key={day.day}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: day.day * 0.02 }}
                                    className={`w-4 h-4 rounded-sm ${day.active
                                            ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                                            : 'bg-white/5'
                                        }`}
                                    title={`${monthName} ${day.day}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LeetCode;
