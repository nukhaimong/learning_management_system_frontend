'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { courseService } from '@/services/course/course.service';

interface CourseDetails {
  id: string;
  title: string;
  price: number;
  thumbnail?: string;
}

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const courseId = searchParams.get('course_id');

  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await courseService.getCourseById(courseId);
        if (data.data) {
          setCourseDetails(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // If payment was not successful
  if (success !== 'true') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Not Confirmed</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't confirm your payment. Please check your email for
            confirmation or contact support.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-in fade-in zoom-in duration-500">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
          <p className="text-muted-foreground">
            Your payment has been processed successfully. You now have access to
            the course.
          </p>
          <Badge variant="secondary" className="mt-4">
            Transaction Confirmed
          </Badge>
        </div>

        {/* Course Details Card */}
        {courseDetails && (
          <Card className="mb-8 p-6 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-start gap-4">
              {courseDetails.thumbnail ? (
                <img
                  src={courseDetails.thumbnail}
                  alt={courseDetails.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">
                  {courseDetails.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  You now have full access to this course
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-600">
                    Purchased
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Price: ৳{courseDetails.price}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid gap-4 animate-in slide-in-from-bottom duration-500 delay-200">
          <Link href="/dashboard">
            <Button size="lg" className="w-full gap-2">
              Go to My Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link href={`/course/${courseId}`} className="w-full">
              <Button variant="outline" className="w-full">
                Start Learning
              </Button>
            </Link>
            <Link href="/explore" className="w-full">
              <Button variant="outline" className="w-full">
                Browse More Courses
              </Button>
            </Link>
          </div>
        </div>

        {/* Confirmation Email Message */}
        <Card className="mt-8 p-4 bg-muted/30 border-dashed">
          <p className="text-sm text-center text-muted-foreground">
            📧 A confirmation email has been sent to your registered email
            address. You can access your course anytime from your dashboard.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
