import { PlayCircle, Users, Star, GraduationCap } from 'lucide-react';
import Link from 'next/link';
interface Category {
  id: string;
  title: string;
}

export default function Hero({ categories }: { categories: Category[] }) {
  return (
    <div className="relative bg-white pb-16 lg:pt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* LEFT CONTENT */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Star className="w-4 h-4 fill-indigo-700" />
              <span>Trust by 5,000+ students in Bangladesh</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Master New Skills with <br />
              <span className="text-indigo-600">Expert-Led</span> Courses
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join Jekono today. Access high-quality video lessons, interactive
              assignments, and professional certifications to jumpstart your
              career.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/explore">
                <button className="px-8 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2">
                  Explore Courses
                </button>
              </Link>
              <button className="px-8 h-14 bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-700 rounded-xl font-bold text-lg transition-all flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* STATS QUICK VIEW */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">120+</span>
                <span className="text-sm text-slate-500">Online Courses</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">45+</span>
                <span className="text-sm text-slate-500">Expert Tutors</span>
              </div>
              <div className="flex items-center -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                  >
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
                  +2k
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL - Decorative elements */}
          <div className="flex-1 relative hidden lg:block">
            <div className="relative z-10 w-full h-[500px] bg-slate-100 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
              {/* Replace with your own hero illustration or image */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <GraduationCap className="w-32 h-32 text-indigo-600 opacity-20" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                alt="Learning"
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
            {/* Floating Card Detail */}
            <div className="absolute -bottom-6 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl border flex items-center gap-4 animate-bounce-slow">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  2,340+ New Students
                </p>
                <p className="text-xs text-slate-500">Joined this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- CATEGORY BADGES SECTION --- */}
        <div className="mt-20">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
            Browse Top Categories
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/explore?category=${category.title.toLowerCase().replace(' ', '-')}`}
              >
                <span className="px-6 py-3 rounded-full border border-slate-200 bg-white text-slate-700 font-medium hover:border-indigo-600 hover:text-indigo-600 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer inline-block">
                  {category.title}
                </span>
              </Link>
            ))}
            <Link href="/explore">
              <span className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-indigo-600 transition-all cursor-pointer inline-block">
                View All →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
