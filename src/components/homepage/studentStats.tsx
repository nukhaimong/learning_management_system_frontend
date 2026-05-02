import { Users, BookOpen, Award, Clock } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: Users,
    label: 'Active Students',
    value: '15,420+',
    color: 'indigo',
  },
  {
    id: 2,
    icon: BookOpen,
    label: 'Total Courses',
    value: '168+',
    color: 'emerald',
  },
  {
    id: 3,
    icon: Award,
    label: 'Certificates Issued',
    value: '8,920+',
    color: 'indigo',
  },
  {
    id: 4,
    icon: Clock,
    label: 'Hours of Content',
    value: '1,250+',
    color: 'emerald',
  },
];

export default function StudentStats() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isIndigo = stat.color === 'indigo';
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center h-full group"
              >
                {/* High Contrast Icon Circle */}
                <div
                  className={`w-16 h-16 shrink-0 rounded-2xl mb-4 flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isIndigo
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Pure White Value */}
                <div className="text-3xl md:text-4xl font-black mb-1 text-white tracking-tight">
                  {stat.value}
                </div>

                {/* Brightest Indigo/Slate for the label */}
                <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Badge with explicit borders and colors */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-8 py-4 rounded-2xl">
            <span className="text-yellow-400 text-xl drop-shadow-md">
              ★★★★★
            </span>
            <span className="text-white text-lg font-bold">
              4.9 Rating{' '}
              <span className="text-emerald-400 ml-2 font-medium">
                (2,345+ Reviews)
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
