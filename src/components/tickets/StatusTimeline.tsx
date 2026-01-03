import React from "react";
import { Ticket } from "../../context/TicketContext";

interface StatusTimelineProps {
    status: Ticket['status'];
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ status }) => {
    const statusOrder: Ticket['status'][] = ['Pending', 'Approved', 'Assigned', 'In Progress', 'Completed', 'Closed'];

    const getCurrentStatusIndex = (status: Ticket['status']) => {
        if (status === 'Reopened') return 0;
        if (status === 'Rejected') return 6; // Treated as end state
        return statusOrder.indexOf(status);
    };

    const currentStatusIndex = getCurrentStatusIndex(status);

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs dark:bg-white/[0.03] dark:border-gray-800">
            <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">Status Timeline</h3>
            <div className="relative flex justify-between w-full">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gray-100 dark:bg-gray-800 -z-10"></div>
                <div
                    className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-green-500 transition-all duration-500 -z-10"
                    style={{ width: `${Math.max(0, currentStatusIndex / (statusOrder.length - 1)) * 100}%` }}
                ></div>

                {statusOrder.map((step, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                        <div key={step} className="flex flex-col items-center gap-2 bg-white dark:bg-[#1e1e1e] sm:px-2"> {/* Fallback bg */}
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors z-10 bg-white dark:bg-gray-900 ${isCompleted ? 'bg-green-500 border-green-500 text-white !bg-green-500' : 'border-gray-300 text-gray-400 dark:border-gray-600'
                                }`}>
                                {isCompleted ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                ) : (
                                    <span className="text-xs">{index + 1}</span>
                                )}
                            </div>
                            <span className={`text-[10px] sm:text-xs font-medium text-center ${isCurrent ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                {step}
                            </span>
                        </div>
                    )
                })}
            </div>
            {status === 'Reopened' && (
                <div className="mt-4 p-3 text-sm text-orange-700 bg-orange-100 rounded-lg dark:bg-orange-900/30 dark:text-orange-400 text-center">
                    This ticket has been <strong>Reopened</strong> and is pending review.
                </div>
            )}
            {status === 'Rejected' && (
                <div className="mt-4 p-3 text-sm text-error-700 bg-error-50 rounded-lg dark:bg-error-900/30 dark:text-error-400 text-center">
                    This ticket has been <strong>Rejected</strong>.
                </div>
            )}
        </div>
    );
};

export default StatusTimeline;
