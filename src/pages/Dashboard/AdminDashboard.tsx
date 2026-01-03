import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useTickets, Ticket } from "../../context/TicketContext";
import { Link } from "react-router";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import Button from "../../components/ui/button/Button";
import toast from "react-hot-toast";
import TicketCard from "../../components/tickets/TicketCard";
import TicketTable, { ColumnDef } from "../../components/tickets/TicketTable";
import StatusBadge from "../../components/tickets/StatusBadge";
import TicketAnalytics from "../../components/tickets/TicketAnalytics";

const AdminDashboard: React.FC = () => {
    const { tickets, updateTicketStatus, loading } = useTickets();
    const { isOpen, openModal, closeModal } = useModal();
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [actionType, setActionType] = useState<'Approve' | 'Reject' | null>(null);

    const stats = {
        total: tickets.length,
        pending: tickets.filter(t => t.status === 'Pending').length,
        approved: tickets.filter(t => t.status === 'Approved').length,
        closed: tickets.filter(t => t.status === 'Closed').length
    };

    const handleAction = (ticket: Ticket, type: 'Approve' | 'Reject') => {
        setSelectedTicket(ticket);
        setActionType(type);
        openModal();
    };

    const confirmAction = () => {
        if (selectedTicket && actionType) {
            if (actionType === 'Approve') {
                updateTicketStatus(selectedTicket.id, 'Approved');
                toast.success(`Ticket ${selectedTicket.id} Approved`);
            } else {
                updateTicketStatus(selectedTicket.id, 'Rejected');
                toast.error(`Ticket ${selectedTicket.id} Rejected`);
            }
            closeModal();
            setSelectedTicket(null);
            setActionType(null);
        }
    };

    const columns: ColumnDef[] = [
        {
            header: "Teacher Name",
            accessorKey: "teacherName",
            className: "font-medium text-gray-800 dark:text-white/90"
        },
        {
            header: "Issue",
            cell: (ticket) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{ticket.issue}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{ticket.category}</span>
                </div>
            )
        },
        {
            header: "Status",
            cell: (ticket) => <StatusBadge status={ticket.status} size="sm" />
        },
        {
            header: "Actions",
            cell: (ticket) => (
                <div className="flex items-center gap-2">
                    {ticket.status === 'Pending' && (
                        <>
                            <Button size="sm" onClick={() => handleAction(ticket, 'Approve')} className="bg-success-600 hover:bg-success-700 text-white">
                                Approve
                            </Button>
                            <Button size="sm" onClick={() => handleAction(ticket, 'Reject')} className="bg-error-600 hover:bg-error-700 text-white">
                                Reject
                            </Button>
                        </>
                    )}
                    <Link to={`/admin/ticket/${ticket.id}`} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
                        View
                    </Link>
                </div>
            )
        }
    ];

    return (
        <>
            <PageMeta
                title="Admin Dashboard | Maintenance Ticketing System"
                description="Admin dashboard for managing system-wide tickets."
            />

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Admin Dashboard</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Overview of all maintenance activities.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
                    <TicketCard title="Pending Tickets" value={stats.pending} />
                    <TicketCard title="Approved Tickets" value={stats.approved} />
                    <TicketCard title="Closed Tickets" value={stats.closed} />
                </div>

                {/* Ticket Analytics */}
                <TicketAnalytics />

                {/* All Tickets Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">All Tickets</h3>
                    <TicketTable tickets={tickets} columns={columns} loading={loading} />
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] p-6">
                <div className="flex flex-col items-center text-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${actionType === 'Approve' ? 'bg-success-50 text-success-600' : 'bg-error-50 text-error-600'} mb-4`}>
                        {actionType === 'Approve' ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9V12M12 15H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {actionType} Ticket?
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Are you sure you want to {actionType?.toLowerCase()} this ticket? This action will update the ticket status.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button variant="outline" onClick={closeModal} className="w-full justify-center">
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={confirmAction}
                            className={`w-full justify-center ${actionType === 'Reject' ? 'bg-error-600 hover:bg-error-700' : 'bg-success-600 hover:bg-success-700'}`}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AdminDashboard;
