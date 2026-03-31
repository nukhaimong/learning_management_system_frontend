import { cookies } from 'next/headers';
const API_URL = process.env.API_URL;

export const getEnrollmetsByLearnerId = async () => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${API_URL}/enrollment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-cache',
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: { message: data.message } };
    }

    return data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return { error: { message: 'Failed to fetch enrollments' } };
  }
};

export const getEnrollmentById = async (enrollment_id: string) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/enrollment/${enrollment_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-cache',
    });
    const data = await res.json();

    if (!res.ok) {
      return { error: { message: data.message } };
    }

    return data;
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    return { error: { message: 'Failed to fetch enrollment' } };
  }
};

export const getAllEnrollments = async () => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${API_URL}/enrollment/all-enrollments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-cache',
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: { message: data.message } };
    }

    return data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return { error: { message: 'Failed to fetch enrollments' } };
  }
};
