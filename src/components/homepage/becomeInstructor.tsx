import { Video, DollarSign, Users, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  { icon: DollarSign, text: 'Earn up to 70% revenue share', color: 'emerald' },
  { icon: Users, text: 'Reach 15k+ active students', color: 'indigo' },
  { icon: Shield, text: 'Dedicated instructor support', color: 'emerald' },
  { icon: Video, text: 'Easy course creation tools', color: 'indigo' },
];

export default function BecomeInstructor() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 md:p-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
                <Video className="w-4 h-4" />
                <span>Become an Instructor</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Share Your Knowledge. <br />
                <span className="text-emerald-300">Start Teaching Today.</span>
              </h2>

              <p className="text-indigo-100 text-lg mb-6 max-w-lg mx-auto lg:mx-0">
                Join 200+ expert instructors who are earning passive income
                while helping students grow.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8 max-w-md mx-auto lg:mx-0">
                {benefits.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  const isIndigo = benefit.color === 'indigo';
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-white text-sm"
                    >
                      <div
                        className={`p-1 rounded-full ${
                          isIndigo ? 'bg-white/10' : 'bg-emerald-500/30'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/instructor/apply">
                  <button className="px-8 py-3 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg flex items-center gap-2 group">
                    Start Teaching Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </Link>
                <Link href="/instructor/about">
                  <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white/5 rounded-full blur-3xl absolute inset-0"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold">
                        Avg. Instructor Earnings
                      </p>
                      <p className="text-2xl font-bold text-emerald-300">
                        $2,500+
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full mb-2">
                    <div className="w-3/4 h-2 bg-emerald-400 rounded-full"></div>
                  </div>
                  <p className="text-white/80 text-sm">
                    Monthly passive income
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
