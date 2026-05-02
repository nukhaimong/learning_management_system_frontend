import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Rahman',
    role: 'Frontend Developer',
    course: 'Complete React Bootcamp',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'The Web Development course was life-changing! The instructor explained complex concepts so clearly. Landed my first job within 3 months of completing the course.',
    type: 'paid',
  },
  {
    id: 2,
    name: 'Mehedi Hasan',
    role: 'Marketing Manager',
    course: 'Digital Marketing Mastery',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    text: 'Worth every penny! The SEO module alone helped me double our organic traffic. Practical assignments were the best part.',
    type: 'paid',
  },
  {
    id: 3,
    name: 'Tasnim Akter',
    role: 'UI/UX Beginner',
    course: 'Figma for Beginners (Free)',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 4,
    text: 'Such a great free resource! Learned Figma from scratch and now designing prototypes confidently. Highly recommend.',
    type: 'free',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            What Our <span className="text-indigo-600">Students</span> Say
          </h2>
          <p className="text-slate-600 text-lg">
            2,340+ students transformed their careers with Jekono
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-indigo-200 mb-4" />

              {/* Text */}
              <p className="text-slate-700 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                      testimonial.type === 'paid'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {testimonial.course}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-slate-500">
            <span className="flex -space-x-2">
              {[4, 5, 6, 7].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="user"
                />
              ))}
            </span>
            <span className="text-sm font-medium">
              Join <span className="text-indigo-600 font-bold">15,420+</span>{' '}
              happy learners
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
