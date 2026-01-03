import React from "react";

interface TicketCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
}

const TicketCard: React.FC<TicketCardProps> = ({ title, value, subtitle }) => {
    return (
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
            <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">{value}</h4>
            {subtitle && (
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{subtitle}</span>
            )}
        </div>
    );
};

export default TicketCard;
