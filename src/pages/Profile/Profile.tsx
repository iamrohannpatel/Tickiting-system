import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import AdminProfile from "./AdminProfile";
import TeacherProfile from "./TeacherProfile";
import MaintenanceProfile from "./MaintenanceProfile";

export default function Profile() {
    const { user } = useAuth();

    const getProfileTitle = () => {
        switch (user?.role) {
            case "admin":
                return "Principal Profile";
            case "teacher":
                return "Instructor Profile";
            case "maintenance":
                return "Groundskeeper Profile";
            default:
                return "Profile";
        }
    };

    const renderProfileContent = () => {
        switch (user?.role) {
            case "admin":
                return <AdminProfile />;
            case "teacher":
                return <TeacherProfile />;
            case "maintenance":
                return <MaintenanceProfile />;
            default:
                return <AdminProfile />;
        }
    };

    return (
        <>
            <PageMeta
                title="Profile | TailAdmin - Next.js Admin Dashboard Template"
                description="User Profile Dashboard"
            />
            <PageBreadcrumb pageTitle="Profile" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    {getProfileTitle()}
                </h3>
                {renderProfileContent()}
            </div>
        </>
    );
}
