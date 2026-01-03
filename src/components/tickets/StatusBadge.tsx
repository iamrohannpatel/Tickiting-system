import React from "react";
import Badge from "../ui/badge/Badge";
import { Ticket } from "../../context/TicketContext";

interface StatusBadgeProps {
    status: Ticket['status'];
    size?: "sm" | "md";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "sm" }) => {
    const getBadgeColor = (status: Ticket['status']) => {
        switch (status) {
            case 'Pending':
            case 'Reopened':
                return 'warning';
            case 'Approved':
            case 'Assigned':
                return 'info';
            case 'In Progress':
                return 'primary';
            case 'Completed':
                return 'success';
            case 'Closed':
                return 'light';
            case 'Rejected':
                return 'error';
            default:
                return 'light';
        }
    };

    return (
        <Badge size={size} color={getBadgeColor(status)}>
            {status}
        </Badge>
    );
};

export default StatusBadge;
