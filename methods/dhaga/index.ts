import { Config } from '@/config';
import { headers } from 'next/headers';

export async function getDhaga() {
  try {
    const res = await fetch(`${Config.APP_URL}/api/post`, {
      cache: 'no-cache',
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch dhagas');
    }

    const data = await res.json();
    return data.threads;
  } catch (error: any) {
    console.error('Error fetching dhagas:', error.message);
    throw new Error(error.message);
  }
}

// Get user dhagas
export async function getUserDhaga() {
  try {
    const res = await fetch(`${Config.APP_URL}/api/user/post`, {
      cache: 'no-cache',
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user dhagas');
    }

    const data = await res.json();
    return data.dhagas;
  } catch (error: any) {
    console.error('Error fetching user dhagas:', error.message);
    throw new Error(error.message);
  }
}

// get users
export async function getUserSuggestion() {
  try {
    const res = await fetch(`${Config.APP_URL}/api/user`, {
      cache: 'no-cache',
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await res.json();

    return data.users;
  } catch (error: any) {
    console.error('Error fetching user dhagas:', error.message);
    throw new Error(error.message);
  }
}
