'use client';
import { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  CreditCard,
  RefreshCw,
  FileText,
  Clock,
  Mail,
} from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: any;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    icon: CreditCard,
    question: 'How do I enroll in a paid course?',
    answer:
      'Simply click "Enroll Now" on any paid course. You can pay via bKash, Nagad, Rocket, or credit/debit cards through SSLCommerz. After successful payment, you\'ll get instant access to all course materials.',
  },
  {
    id: 2,
    icon: RefreshCw,
    question: 'What is your refund policy?',
    answer:
      "We offer a 7-day money-back guarantee for all paid courses. If you're not satisfied, contact support within 7 days of purchase for a full refund. No questions asked.",
  },
  {
    id: 3,
    icon: FileText,
    question: 'Do I get a certificate after completion?',
    answer:
      'Yes! All paid courses include a verified certificate upon completion. Free course students can upgrade to get a certificate. Certificates are shareable on LinkedIn and include a unique verification ID.',
  },
  {
    id: 4,
    icon: Clock,
    question: 'How long do I have access to the course?',
    answer:
      'Lifetime access! Once enrolled, you can access the course materials anytime, anywhere. This includes all future updates and additions to the course.',
  },
  {
    id: 5,
    icon: HelpCircle,
    question: "What's the difference between free & paid courses?",
    answer:
      'Free courses give you basic content access. Paid courses include: Full HD video lectures, downloadable resources, assignments & quizzes, instructor Q&A support, and a verifiable certificate.',
  },
  {
    id: 6,
    icon: Mail,
    question: 'How can I contact an instructor?',
    answer:
      'Each course has a Q&A section where you can post questions. Instructors typically respond within 24 hours. For urgent issues, you can email support@jekono.com.',
  },
];

function FAQAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-slate-800">{item.question}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`px-6 transition-all duration-300 ease-in-out ${
          isOpen ? 'py-4 border-t border-slate-100' : 'h-0 py-0 overflow-hidden'
        }`}
      >
        <p className="text-slate-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to know about learning on Jekono
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => (
            <FAQAccordion
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-full shadow-sm border border-slate-200">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span className="text-slate-600">Still have questions?</span>
            <button className="text-indigo-600 font-semibold hover:text-indigo-700">
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
