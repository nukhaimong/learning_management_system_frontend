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
  createModule: async (course_id: string, title: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/module`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, course_id }),
        cache: 'no-cache',
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error creating module:', error);
      return { error: { message: 'Failed to create module' } };
    }
  },
  createLecture: async (formData: FormData) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/lecture`, {
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
      console.error('Error creating lecture:', error);
      return { error: { message: 'Creating Lecture Failed' } };
    }
  },
  updateLecture: async (lecture_id: string, formData: FormData) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/lecture/update/${lecture_id}`,
        {
          method: 'PUT',
          credentials: 'include',
          body: formData,
          cache: 'no-cache',
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error updating lecture:', error);
      return { error: { message: 'Updating Lecture Failed' } };
    }
  },
  deleteLecture: async (lecture_id: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/lecture/delete/${lecture_id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          cache: 'no-cache',
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error deleting lecture:', error);
      return { error: { message: 'Deleting Lecture Failed' } };
    }
  },
};
