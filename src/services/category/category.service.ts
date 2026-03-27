const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  createCategory: async (title: string) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title }),
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
};
