import { Config } from '@/config';

export async function getUser(userId: string) {
  try {
    const response = await fetch(`${Config.APP_URL}/api/user/${userId}`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();

    return data.user;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch user');
  }
}
