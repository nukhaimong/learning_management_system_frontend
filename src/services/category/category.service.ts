import Cookies from 'js-cookie';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  createCategory: async (title: string) => {
    const token = Cookies.get('better-auth.session_token');
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
    const token = Cookies.get('better-auth.session_token');
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/category`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
    const token = Cookies.get('better-auth.session_token');
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/category/update/${category_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
    const token = Cookies.get('better-auth.session_token');
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/category/delete/${category_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
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
      return { error: { message: 'Internal Server Error' } };
    }
  },
};
