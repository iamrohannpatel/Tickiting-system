import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import { useTickets } from "../../context/TicketContext";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const CreateTicket: React.FC = () => {
    const { addTicket } = useTickets();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        issue: "",
        category: "",
        description: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.issue.trim() || !formData.category.trim() || !formData.description.trim()) {
            setError("Please fill in all required fields.");
            return;
        }

        // Simulate Image Upload
        let evidenceUrl = undefined;
        if (evidenceFile) {
            evidenceUrl = URL.createObjectURL(evidenceFile);
        }

        // Add ticket
        addTicket({
            issue: formData.issue,
            category: formData.category,
            description: formData.description,
            teacherName: user?.name || "Unknown Teacher",
            image: evidenceUrl
        });

        setSuccess(true);
        setFormData({ issue: "", category: "", description: "" });
        setEvidenceFile(null);

        // Hide success message after 3 seconds and redirect
        setTimeout(() => {
            setSuccess(false);
            navigate('/teacher');
        }, 2000);
    };

    return (
        <>
            <PageMeta
                title="Create Ticket | Maintenance Ticketing System"
                description="Raise a new maintenance ticket."
            />

            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Raise a Ticket</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Describe the issue and we will assign a technician.</p>
                </div>

                {success && (
                    <div className="mb-6">
                        <Alert variant="success" title="Success" message="Ticket raised successfully! Redirecting..." />
                    </div>
                )}

                {error && (
                    <div className="mb-6">
                        <Alert variant="error" title="Error" message={error} />
                    </div>
                )}

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-white/[0.03]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Issue Title */}
                        <div>
                            <Label>Issue Title <span className="text-error-500">*</span></Label>
                            <Input
                                name="issue"
                                placeholder="e.g. Projector not working"
                                value={formData.issue}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <Label>Category <span className="text-error-500">*</span></Label>
                            <div className="relative">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full h-11 px-4 py-2.5 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800 appearance-none"
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Appliance">Appliance</option>
                                    <option value="Network">Network</option>
                                    <option value="Other">Other</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="fill-current text-gray-500 dark:text-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.6921 7.09327C3.91666 6.83119 4.31107 6.80084 4.57315 7.0254L9.99997 11.6769L15.4268 7.0254C15.6889 6.80084 16.0833 6.83119 16.3079 7.09327C16.5324 7.35535 16.5021 7.74976 16.24 7.97432L10.4066 12.9743C10.1726 13.1749 9.82739 13.1749 9.59335 12.9743L3.75996 7.97432C3.49788 7.74976 3.46753 7.35535 3.6921 7.09327Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <Label>Description <span className="text-error-500">*</span></Label>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="Describe the issue in detail..."
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800 focus:outline-hidden placeholder:text-gray-400 dark:placeholder:text-white/30"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <Label>Attach Image/Video (Optional)</Label>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => setEvidenceFile(e.target.files?.[0] || null)}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-900/30 dark:file:text-brand-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <Button className="w-full">
                                Submit Ticket
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateTicket;
