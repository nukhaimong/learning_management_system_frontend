const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const enrollmentService = {
  enrollInCourse: async (course_id: string) => {
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/enrollment/${course_id}`,
        {
          method: 'POST',
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
