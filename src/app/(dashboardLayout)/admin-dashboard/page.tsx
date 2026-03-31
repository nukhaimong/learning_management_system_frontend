import { getCourses } from '@/services/course/course.server.service';
import { getAllEnrollments } from '@/services/enrollment/enrollment.server.service';
import {
  BarChart3,
  Users,
  BookOpen,
  CreditCard,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface Enrollment {
  id: string;
  course: {
    title: string;
  };
  learner: {
    name: string;
    email: string;
  };
  payment: {
    amount: number;
    transaction_id?: string;
    createdAt: string;
  } | null;
}

const AdminDashboard = async () => {
  // Fetch global data
  const [coursesData, enrollmentsData] = await Promise.all([
    getCourses(),
    getAllEnrollments(),
  ]);

  const courses = coursesData?.data || [];
  const enrollments: Enrollment[] = enrollmentsData?.data || [];

  // --- GLOBAL STATS CALCULATIONS ---

  const totalRevenue = enrollments.reduce(
    (acc, curr) => acc + (curr.payment?.amount || 0),
    0,
  );
  const totalCourses = courses.length;
  const totalUsers = enrollments.length; // Simplified as total unique enrollments for this view
  const completedTransactions = enrollments.filter(
    (e) => e.payment !== null,
  ).length;

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Platform Overview
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Global performance and enrollment metrics
          </p>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Revenue"
            value={`৳${totalRevenue.toLocaleString()}`}
            icon={<CreditCard className="text-amber-600" />}
            bgColor="bg-amber-50"
          />
          <StatCard
            title="Total Courses"
            value={totalCourses}
            icon={<BookOpen className="text-indigo-600" />}
            bgColor="bg-indigo-50"
          />
          <StatCard
            title="Active Enrollments"
            value={totalUsers}
            icon={<Users className="text-emerald-600" />}
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="Success Rate"
            value={`${((completedTransactions / (totalUsers || 1)) * 100).toFixed(1)}%`}
            icon={<BarChart3 className="text-purple-600" />}
            bgColor="bg-purple-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Recent Enrollments Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Recent Enrollments</h2>
              <button className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-tighter">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Learner
                    </th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Course
                    </th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Amount
                    </th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {enrollments.slice(0, 8).map((enrollment) => (
                    <tr
                      key={enrollment.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="p-4">
                        <p className="font-bold text-slate-800">
                          {enrollment.learner.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {enrollment.learner.email}
                        </p>
                      </td>
                      <td className="p-4 font-medium text-slate-600 truncate max-w-[200px]">
                        {enrollment.course.title}
                      </td>
                      <td className="p-4 font-black text-slate-900">
                        ৳{enrollment.payment?.amount || 0}
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase">
                          <CheckCircle2 size={10} /> Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Platform Quick Stats */}
          <div className="space-y-6">
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <ArrowUpRight className="absolute -top-4 -right-4 w-32 h-32 text-white/10" />
              <h3 className="text-lg font-bold mb-2">Growth Metric</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Platform revenue has increased significantly. Focus on adding
                more "Tech" category courses.
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">
                  ৳{totalRevenue.toLocaleString()}
                </span>
                <span className="text-sm font-bold bg-white/20 px-2 py-1 rounded mb-1">
                  +12%
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">
                Course Distribution
              </h3>
              <div className="space-y-4">
                <DistributionRow
                  label="Web Development"
                  percentage={75}
                  color="bg-indigo-500"
                />
                <DistributionRow
                  label="Graphics Design"
                  percentage={15}
                  color="bg-emerald-500"
                />
                <DistributionRow
                  label="Marketing"
                  percentage={10}
                  color="bg-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

function StatCard({ title, value, icon, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`p-4 rounded-2xl ${bgColor}`}>{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {title}
        </p>
        <p className="text-2xl font-black text-slate-900 leading-none mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}

function DistributionRow({ label, percentage, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
