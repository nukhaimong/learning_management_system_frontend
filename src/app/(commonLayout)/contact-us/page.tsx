import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
          <p className="text-slate-500 mt-2">
            Need help? Reach out to us anytime.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Email</h3>
              <p className="text-slate-500 text-sm">support@jekono.com</p>
              <p className="text-xs text-slate-400 mt-1">
                We usually reply within 24 hours
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Phone className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Phone</h3>
              <p className="text-slate-500 text-sm">+880 1234-567890</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Address</h3>
              <p className="text-slate-500 text-sm">
                University of Chittagong <br />
                Chattogram, Bangladesh
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Working Hours</h3>
              <p className="text-slate-500 text-sm">
                Sunday – Thursday: 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
