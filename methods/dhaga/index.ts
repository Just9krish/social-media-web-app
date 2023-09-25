import { Config } from '@/config';
import { headers } from 'next/headers';

export async function getDhaga() {
  const res = await fetch(`${Config.APP_URL}/api/post`, {
    cache: 'no-cache',
    headers: headers(),
  });
  const data = await res.json();
  return data.threads;
}
