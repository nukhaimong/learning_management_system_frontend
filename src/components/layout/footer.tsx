import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Users,
  BookOpen,
  Send,
} from 'lucide-react';

const SocialIcons = {
  Facebook: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  ),
  TwitterX: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
    </svg>
  ),
  Linkedin: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  Github: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 max-w-6xl mx-auto">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div className="flex items-center gap-2 text-white font-bold text-3xl tracking-tight">
                <GraduationCap className="h-9 w-9 text-indigo-500" />
                <span>Jekono</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Building the next generation of developers and creators in
              Bangladesh with affordable, expert-led online education.
            </p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all cursor-pointer">
                <SocialIcons.Facebook />
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all cursor-pointer">
                <SocialIcons.TwitterX />
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-blue-700 hover:text-white transition-all cursor-pointer">
                <SocialIcons.Linkedin />
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-700 hover:text-white transition-all cursor-pointer">
                <SocialIcons.Github />
              </div>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-indigo-500 pl-3 inline-block">
              Contact
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                <span className="break-all">hello@jekono.com</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>Chittagong, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Stats (NEW SECTION) */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-indigo-500 pl-3 inline-block">
              Our Impact
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-1">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span className="text-white font-bold text-lg">15,000+</span>
                </div>
                <p className="text-xs">Active Learners</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-1">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="text-white font-bold text-lg">120+</span>
                </div>
                <p className="text-xs">Expert Courses</p>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter (NEW SECTION) */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-indigo-500 pl-3 inline-block">
              Stay Updated
            </h4>
            <p className="text-xs leading-relaxed">
              Get the latest course updates and tech news delivered to your
              inbox.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                disabled
              />
              <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-3 rounded-md hover:bg-indigo-500 transition-colors cursor-not-allowed">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 italic">
              No spam, just quality learning content.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-slate-900 text-center">
          <p className="text-xs font-medium uppercase tracking-widest">
            © {currentYear} <span className="text-white">Jekono LMS</span>. Made
            with ❤️ in Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
