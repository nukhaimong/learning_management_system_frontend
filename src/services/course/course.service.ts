const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const courseService = {
  createCourse: async (formData: FormData) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/course`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
        cache: 'no-cache',
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error creating course:', error);
      return { error: { message: 'Uploading Failed' } };
    }
  },
  getCourses: async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/course`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-cache',
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return { error: { message: 'Failed to fetch courses' } };
    }
  },
};
