import PageMeta from "../../components/common/PageMeta";
import { useTickets } from "../../context/TicketContext";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";
import TicketCard from "../../components/tickets/TicketCard";
import TicketTable, { ColumnDef } from "../../components/tickets/TicketTable";
import StatusBadge from "../../components/tickets/StatusBadge";

const TeacherDashboard = () => {
    const { tickets, loading } = useTickets();

    const stats = {
        total: tickets.length,
        pending: tickets.filter((t) => ['Pending', 'Approved', 'Assigned', 'Reopened'].includes(t.status)).length,
        closed: tickets.filter((t) => ['Completed', 'Closed'].includes(t.status)).length,
    };

    const columns: ColumnDef[] = [
        {
            header: "Issue",
            cell: (ticket) => (
                <div className="flex flex-col">
                    <Link to={`/teacher/ticket/${ticket.id}`} className="font-medium text-gray-800 text-theme-sm dark:text-white/90 hover:text-brand-500 hover:underline">
                        {ticket.issue}
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{ticket.id}</span>
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
            header: "Last Updated",
            accessorKey: "lastUpdated",
            className: "text-gray-500 text-theme-sm dark:text-gray-400"
        }
    ];

    return (
        <>
            <PageMeta
                title="Teacher Dashboard | Maintenance Ticketing System"
                description="Teacher dashboard for managing tickets."
            />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Teacher Dashboard</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage and track your maintenance requests.</p>
                    </div>
                    <Link to="/teacher/create-ticket">
                        <Button className="flex items-center gap-2">
                            <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4.16666V15.8333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.16669 10H15.8334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Raise Ticket
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
                    <TicketCard title="Total Tickets" value={stats.total} />
                    <TicketCard title="Pending" value={stats.pending} />
                    <TicketCard title="Closed/Resolved" value={stats.closed} />
                </div>

                {/* Ticket List */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                    <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">My Tickets</h3>
                        </div>
                    </div>

                    <TicketTable tickets={tickets} columns={columns} loading={loading} />
                </div>
            </div>
        </>
    );
};

export default TeacherDashboard;
