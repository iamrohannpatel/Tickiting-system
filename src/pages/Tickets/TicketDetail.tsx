import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { useTickets } from "../../context/TicketContext";
import { useAuth } from "../../context/AuthContext";
import { ChevronLeftIcon } from "../../icons";
import toast from "react-hot-toast";
import StatusBadge from "../../components/tickets/StatusBadge";
import StatusTimeline from "../../components/tickets/StatusTimeline";
import FilePreview from "../../components/tickets/FilePreview";

const TicketDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getTicket, updateTicketStatus, updateTicket, loading } = useTickets();
    const { user } = useAuth();
    const [proofFile, setProofFile] = useState<File | null>(null);

    const ticket = getTicket(id || "");

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="p-6 bg-white border border-gray-200 rounded-2xl md:h-64 dark:bg-gray-800 dark:border-gray-700"></div>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 mb-4 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800">
                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Ticket Not Found</h2>
                <p className="text-gray-500 mt-2 mb-6">The ticket you are looking for does not exist or has been removed.</p>
                <Button onClick={() => navigate(isAdmin ? '/admin' : isMaintenance ? '/maintenance' : '/teacher')}>Back to Dashboard</Button>
            </div>
        );
    }

    const handleReopen = () => {
        updateTicketStatus(ticket.id, "Reopened");
        toast.success("Ticket reopened successfully.");
    };

    const handleVerify = () => {
        updateTicketStatus(ticket.id, "Closed");
        toast.success("Work verified and ticket closed!");
    };

    const handleAssign = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const employee = e.target.value;
        if (employee) {
            updateTicket(ticket.id, {
                assignedTo: employee,
                status: ticket.status === 'Approved' ? 'Assigned' : ticket.status
            });
            toast.success(`Ticket assigned to ${employee}`);
        }
    };

    const handleStartWork = () => {
        updateTicketStatus(ticket.id, "In Progress");
        toast.success("Ticket status updated to In Progress");
    };

    const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("File size exceeds 5MB limit.");
                return;
            }
            setProofFile(file);
        }
    };

    const handleCompleteWork = () => {
        if (!proofFile) {
            toast.error("Please upload proof of completion before marking as complete.");
            return;
        }

        // Simulate upload
        const proofUrl = URL.createObjectURL(proofFile);

        updateTicket(ticket.id, {
            status: "Completed",
            proofImage: proofUrl
        });
        toast.success("Proof uploaded and ticket marked as completed!");
        setProofFile(null); // Clear local state after 'upload'
    };

    const isAdmin = user?.role === 'admin';
    const isMaintenance = user?.role === 'maintenance';

    // Mock Employees
    const employees = [
        "Mike Technician",
        "Sarah Plumber",
        "John Network",
        "David Electrician"
    ];

    return (
        <>
            <PageMeta
                title={`Ticket ${ticket.id} | Maintenance Ticketing System`}
                description="View ticket details and status."
            />

            <div className="max-w-4xl mx-auto space-y-6">
                <button onClick={() => navigate(isAdmin ? '/admin' : isMaintenance ? '/maintenance' : '/teacher')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <ChevronLeftIcon className="size-5" />
                    Back to Dashboard
                </button>

                {/* Ticket Header */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs dark:bg-white/[0.03] dark:border-gray-800">
                    <div className="flex flex-col justify-between gap-4 md:items-start md:flex-row">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">{ticket.issue}</h2>
                                <StatusBadge status={ticket.status} />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Ticket ID: <span className="font-medium text-gray-700 dark:text-gray-300">{ticket.id}</span> •
                                Category: <span className="font-medium text-gray-700 dark:text-gray-300">{ticket.category}</span> •
                                Last Updated: <span className="font-medium text-gray-700 dark:text-gray-300">{ticket.lastUpdated}</span>
                            </p>
                            {ticket.assignedTo && (
                                <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                                    Assigned to: {ticket.assignedTo}
                                </p>
                            )}
                        </div>
                        {ticket.status === 'Closed' && !isAdmin && !isMaintenance && (
                            <Button onClick={handleReopen} className="bg-orange-500 hover:bg-orange-600">
                                Reopen Ticket
                            </Button>
                        )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">Description</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {ticket.description || "No description provided."}
                        </p>
                    </div>

                    {/* Evidence Preview */}
                    <FilePreview src={ticket.image} label="Attached Evidence" />

                    {/* Admin Verification Section */}
                    {isAdmin && (ticket.status === 'Completed' || ticket.status === 'Closed') && (
                        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
                            <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">Maintenance Verification</h3>
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                <div className="mb-4">
                                    {ticket.proofImage ? (
                                        <FilePreview src={ticket.proofImage} label="Completion Proof" className="!mt-0 !pt-0 !border-t-0" />
                                    ) : (
                                        <p className="text-sm text-blue-700 dark:text-blue-300 italic">No proof image uploaded yet.</p>
                                    )}
                                </div>
                                {ticket.status === 'Completed' && (
                                    <div className="flex gap-3">
                                        <Button onClick={handleVerify} startIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} className="bg-success-600 hover:bg-success-700 text-white">
                                            Approve Proof & Close Ticket
                                        </Button>
                                    </div>
                                )}
                                {ticket.status === 'Closed' && (
                                    <div className="flex items-center gap-2 text-success-600 dark:text-success-400 font-medium">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        <span>Verified and Closed</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Maintenance Management Section */}
                    {isMaintenance && ticket.status !== 'Closed' && ticket.status !== 'Rejected' && ticket.status !== 'Completed' && ticket.status !== 'Pending' && (
                        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
                            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Maintenance Management</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Assignment */}
                                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 dark:bg-white/[0.03] dark:border-gray-800">
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Assign Employee
                                    </label>
                                    <select
                                        value={ticket.assignedTo || ""}
                                        onChange={handleAssign}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    >
                                        <option value="">Select Employee...</option>
                                        {employees.map(emp => (
                                            <option key={emp} value={emp}>{emp}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status Workflow */}
                                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 dark:bg-white/[0.03] dark:border-gray-800">
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Update Status
                                    </label>
                                    <div className="flex flex-col gap-3">
                                        {ticket.status === 'Assigned' && (
                                            <Button onClick={handleStartWork} className="w-full justify-center">
                                                Start Work
                                            </Button>
                                        )}
                                        {ticket.status === 'In Progress' && (
                                            <div className="space-y-3">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Upload Proof of Completion <span className="text-error-500">*</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleProofUpload}
                                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-900/30 dark:file:text-brand-400"
                                                    />
                                                    <p className="text-xs text-gray-500">Max size: 5MB</p>

                                                    {proofFile && (
                                                        <FilePreview
                                                            file={proofFile}
                                                            onRemove={() => setProofFile(null)}
                                                            className="!mt-2 !pt-0 !border-t-0"
                                                            label="Selected File"
                                                        />
                                                    )}
                                                </div>
                                                <Button onClick={handleCompleteWork} className="w-full justify-center bg-success-600 hover:bg-success-700 text-white">
                                                    Mark as Complete
                                                </Button>
                                            </div>
                                        )}
                                        {ticket.status === 'Approved' && (
                                            <p className="text-sm text-gray-500 italic">Assign an employee to start work.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Timeline */}
                <StatusTimeline status={ticket.status} />
            </div>
        </>
    );
};

export default TicketDetail;
