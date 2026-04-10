import Cookies from 'js-cookie';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get('better-auth.session_token');

export const categoryService = {
  createCategory: async (title: string) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ title }),

        cache: 'no-cache',
      });
      const data = await res.json();
      console.log(token);
      if (!res.ok) {
        return { error: { message: data.message } };
      }
      return data;
    } catch (error) {
      return { error: { message: 'Internal Server Error' } };
    }
  },
  getCategories: async () => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/category`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-cache',
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message } };
      }
      return data;
    } catch (error) {
      return { error: { message: 'Internal Server Error' } };
    }
  },
  updateCategory: async (category_id: string, title: string) => {
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/category/update/${category_id}`,
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
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message } };
      }
      return data;
    } catch (error) {
      return { error: { message: 'Internal Server Error' } };
    }
  },
  deleteCategory: async (category_id: string) => {
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/category/delete/${category_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
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
      return { error: { message: 'Internal Server Error' } };
    }
  },
};
