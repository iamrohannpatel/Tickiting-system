

import UserMetaCard from "../../components/UserProfile/UserMetaCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";

export default function TeacherProfile() {
    return (
        <div className="space-y-6">
            <UserMetaCard
                name="Prof. Sarah Thompson"
                role="Senior Physics Instructor"
                location="The Academy, Science Wing"
                image="/images/user/user-01.jpg"
            />
            <UserInfoCard
                firstName="Sarah"
                lastName="Thompson"
                email="s.thompson@theacademy.edu"
                phone="+1 555-0123"
                bio="Inspiring students at The Academy through hands-on Physics and Mathematics education."
                cardTitle="Instructor Information"
            />

            {/* Teacher Specific Content */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Instructional Details
                </h3>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Department</span>
                            <span className="font-medium text-gray-800 dark:text-white">Science & Technology</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Subject Specialization</span>
                            <span className="font-medium text-gray-800 dark:text-white">Physics, Mathematics</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Teaching Experience</span>
                            <span className="font-medium text-gray-800 dark:text-white">8 Years</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Assigned Classes</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg dark:bg-blue-500/10 dark:text-blue-400">Class 10-A</span>
                            <span className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg dark:bg-blue-500/10 dark:text-blue-400">Class 12-B</span>
                            <span className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg dark:bg-blue-500/10 dark:text-blue-400">Physics Lab 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
