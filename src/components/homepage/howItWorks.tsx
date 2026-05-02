import { Search, CreditCard, GraduationCap, Award } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Browse Courses',
    description:
      'Explore 120+ paid & free courses across 10+ categories. Find what matches your career goals.',
    color: 'indigo',
  },
  {
    id: 2,
    icon: CreditCard,
    title: 'Enroll & Pay',
    description:
      'One-click enrollment for free courses. Secure SSLCommerz/bKash payment for premium courses.',
    color: 'emerald',
  },
  {
    id: 3,
    icon: GraduationCap,
    title: 'Start Learning',
    description:
      'Get instant access. Learn at your pace with video lectures, quizzes & assignments.',
    color: 'indigo',
  },
  {
    id: 4,
    icon: Award,
    title: 'Get Certified',
    description:
      'Earn verifiable certificates. Boost your CV and LinkedIn profile.',
    color: 'emerald',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            How <span className="text-indigo-600">Jekono</span> Works
          </h2>
          <p className="text-slate-600 text-lg">
            From enrollment to certification - get started in 4 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isIndigo = step.color === 'indigo';
            return (
              <div key={step.id} className="relative group h-full">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm font-bold text-indigo-600 z-10">
                  {step.id}
                </div>

                {/* Card - Added h-full and flex flex-col */}
                <div className="h-full flex flex-col bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                  <div
                    className={`w-16 h-16 shrink-0 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all group-hover:scale-110 ${
                      isIndigo
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  {/* flex-grow ensures the description container fills the space */}
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-200 to-emerald-200">
                    <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-indigo-400"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
