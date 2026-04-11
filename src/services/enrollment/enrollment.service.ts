import Cookies from 'js-cookie';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const enrollmentService = {
  enrollInCourse: async (course_id: string) => {
    const token = Cookies.get('better-auth.session_token');
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/enrollment/${course_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          cache: 'no-cache',
        },
      );
      const data = await res.json();

      if (!res.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return { error: { message: 'Enrollment Failed' } };
    }
  },
};
