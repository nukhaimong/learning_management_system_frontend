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
  getCourseById: async (course_id: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/course/${course_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
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
      console.error('Error fetching courses:', error);
      return { error: { message: 'Failed to fetch courses' } };
    }
  },
  updateCourse: async (course_id: string, formData: FormData) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/course/update/${course_id}`,
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
      console.error('Error updating course:', error);
      return { error: { message: 'Updating Failed' } };
    }
  },
  deleteCourse: async (course_id: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/course/delete/${course_id}`,
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
      console.error('Error deleting course:', error);
      return { error: { message: 'Deleting Failed' } };
    }
  },
  addTofavorites: async (course_id: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id }),
        credentials: 'include',
        cache: 'no-cache',
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return { error: { message: 'Failed to add to favorites' } };
    }
  },
  deleteFromFavorites: async (course_id: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/favorites/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id }),
        credentials: 'include',
        cache: 'no-cache',
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return { error: { message: 'Failed to add to favorites' } };
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
  insertModule: async (module_id: string, title: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/module/${module_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ title }),
          cache: 'no-cache',
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error inserting module:', error);
      return { error: { message: 'Failed to insert module' } };
    }
  },
  updateModule: async (module_id: string, title: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/module/update/${module_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ title }),
          cache: 'no-cache',
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error updating module:', error);
      return { error: { message: 'Failed to update module' } };
    }
  },
  deleteModule: async (module_id: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/module/delete/${module_id}`,
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
      console.error('Error deleting module:', error);
      return { error: { message: 'Failed to delete module' } };
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
  insertLecture: async (lecture_id: string, formData: FormData) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/lecture/${lecture_id}`,
        {
          method: 'POST',
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
      console.error('Error inserting lecture:', error);
      return { error: { message: 'Inserting Lecture Failed' } };
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
  createReviews: async (course_id: string, content: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id, content }),
        credentials: 'include',
        cache: 'no-cache',
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error('Error creating reviews:', error);
      return { error: { message: 'Creating reviews Failed' } };
    }
  },
};
