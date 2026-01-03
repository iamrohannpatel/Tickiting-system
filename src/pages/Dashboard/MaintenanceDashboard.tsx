import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useTickets } from "../../context/TicketContext";
import { Link } from "react-router";
import TicketTable, { ColumnDef } from "../../components/tickets/TicketTable";
import StatusBadge from "../../components/tickets/StatusBadge";

const MaintenanceDashboard: React.FC = () => {
    const { tickets, loading } = useTickets();
    const [statusFilter, setStatusFilter] = useState<string>("All");

    // Filter tickets: Exclude Pending, Reopened, Rejected. Show only "Approved" and beyond.
    const maintenanceTickets = tickets.filter(ticket =>
        ['Approved', 'Assigned', 'In Progress', 'Completed', 'Closed'].includes(ticket.status)
    );

    const filteredTickets = statusFilter === "All"
        ? maintenanceTickets
        : maintenanceTickets.filter(ticket => ticket.status === statusFilter);

    const columns: ColumnDef[] = [
        {
            header: "ID",
            cell: (ticket) => <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{ticket.id}</span>
        },
        {
            header: "Issue",
            cell: (ticket) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{ticket.issue}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{ticket.lastUpdated}</span>
                </div>
            )
        },
        {
            header: "Category",
            accessorKey: "category",
            className: "text-gray-500 text-theme-sm dark:text-gray-400"
        },
        {
            header: "Status",
            cell: (ticket) => <StatusBadge status={ticket.status} size="sm" />
        },
        {
            header: "Actions",
            cell: (ticket) => (
                <div className="flex items-center gap-2">
                    <Link to={`/admin/ticket/${ticket.id}`} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
                        <span className="text-xs font-medium">View</span>
                    </Link>
                </div>
            )
        }
    ];

    return (
        <>
            <PageMeta
                title="Maintenance Dashboard | Maintenance Ticketing System"
                description="Maintenance dashboard for managing assigned tickets."
            />
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Maintenance Dashboard</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and manage tickets assigned to the maintenance department.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Assigned Tasks ({filteredTickets.length})
                        </h3>
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-2 pl-3 pr-10 text-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:text-gray-300 dark:focus:border-brand-500"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Approved">Approved</option>
                                <option value="Assigned">Assigned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </span>
                        </div>
                    </div>

                    <TicketTable tickets={filteredTickets} columns={columns} loading={loading} />
                </div>
            </div>
        </>
    );
};

export default MaintenanceDashboard;
