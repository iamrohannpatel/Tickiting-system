
import React from "react";
import UserMetaCard from "../../components/UserProfile/UserMetaCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";
import UserAddressCard from "../../components/UserProfile/UserAddressCard";

export default function AdminProfile() {
    return (
        <div className="space-y-6">
            <UserMetaCard
                name="Dr. Eleanor Vance"
                role="Principal"
                location="The Academy Campus, Main Hall"
                image="/images/user/user-01.jpg"
            />
            <UserInfoCard
                firstName="Eleanor"
                lastName="Vance"
                email="principal.vance@theacademy.edu"
                phone="+1 555-0100"
                bio="Dedicated Principal of The Academy, committed to academic excellence and student growth."
                cardTitle="Principal Information"
            />
            <UserAddressCard cardTitle="Principal's Office" />

            {/* Admin Specific Content */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Academy Statistics
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</h4>
                        <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">1,234</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Attendance</h4>
                        <p className="mt-2 text-2xl font-bold text-green-500">98%</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Enrollments</h4>
                        <p className="mt-2 text-2xl font-bold text-orange-500">12</p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Principal Authority
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                        <span className="text-gray-600 dark:text-gray-400">User Management</span>
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-500/10 dark:text-green-400">Full Access</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                        <span className="text-gray-600 dark:text-gray-400">System Configuration</span>
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-500/10 dark:text-green-400">Full Access</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                        <span className="text-gray-600 dark:text-gray-400">Audit Logs</span>
                        <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-500/10 dark:text-blue-400">View Only</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
