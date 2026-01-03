import UserMetaCard from "../../components/UserProfile/UserMetaCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";

export default function MaintenanceProfile() {
    return (
        <div className="space-y-6">
            <UserMetaCard
                name="Mr. Mike Builder"
                role="Head Groundskeeper"
                location="The Academy, Maintenance Shed"
                image="/images/user/user-02.jpg"
            />
            <UserInfoCard
                firstName="Mike"
                lastName="Builder"
                email="facilities@theacademy.edu"
                phone="+1 555-0199"
                bio="Keeping The Academy grounds and facilities pristine and safe for all students and staff."
                cardTitle="Groundskeeper Information"
            />

            {/* Maintenance Specific Content */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Groundskeeping Schedule
                </h3>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Department</span>
                            <span className="font-medium text-gray-800 dark:text-white">Facilities & Operations</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Shift Timing</span>
                            <span className="font-medium text-gray-800 dark:text-white">Morning (6:00 AM - 2:00 PM)</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Current Status</span>
                            <span className="inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400">
                                On Duty
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Assigned Areas</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg dark:bg-white/5 dark:text-gray-300">Main Building - Floor 1</span>
                            <span className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg dark:bg-white/5 dark:text-gray-300">Cafeteria</span>
                            <span className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg dark:bg-white/5 dark:text-gray-300">North Wing Gardens</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
