import { ShieldCheck, Zap, Globe, Award } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8 text-amber-500" />,
    title: 'Learn at Your Own Pace',
    desc: 'Enjoy lifetime access to courses on your schedule. No deadlines, no pressure.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
    title: 'Expert-Led Instruction',
    desc: 'Learn from industry professionals who bring real-world experience to every lesson.',
  },
  {
    icon: <Award className="w-8 h-8 text-emerald-500" />,
    title: 'Verified Certificates',
    desc: 'Earn a certificate upon completion to showcase your skills to future employers.',
  },
  {
    icon: <Globe className="w-8 h-8 text-indigo-500" />,
    title: 'Language Support',
    desc: 'Access high-quality content explained in native language for better understanding.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Why Students Choose <span className="text-indigo-600">Jekono</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            We provide the tools and community you need to master your craft and
            reach your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
