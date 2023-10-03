import { Config } from '@/config';
import { headers } from 'next/headers';

export async function getThreads() {
  try {
    const res = await fetch(`${Config.APP_URL}/api/post`, {
      cache: 'no-cache',
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch threads');
    }

    const data = await res.json();
    return data.threads;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

// Get user threads
export async function getUserThread() {
  try {
    const res = await fetch(`${Config.APP_URL}/api/user/post`, {
      cache: 'no-cache',
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user threads');
    }

    const data = await res.json();
    return data.threads;
  } catch (error: any) {
    console.error('Error fetching user threads:', error.message);
    throw new Error(error.message);
  }
}

// GET users suggestions
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
    console.error('Error While getting user suggestions:', error.message);
    throw new Error(error.message);
  }
}

// POST reply to thread
export async function addReply({
  threadId,
  content,
}: {
  threadId: string;
  content: string;
}) {
  try {
    const res = await fetch('/api/reply', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ threadId, content }),
    });
  } catch (error: any) {
    console.error('Error While adding reply:', error.message);
    throw new Error(error.message);
  }
}

// GET thread by id
export async function getThreadById(threadId: string) {
  try {
    const res = await fetch(`${Config.APP_URL}/api/post/${threadId}`, {
      cache: 'no-cache',
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch thread');
    }

    const data = await res.json();
    return data.thread;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

// GET users comments
export async function getUserComments() {
  try {
    const res = await fetch(`${Config.APP_URL}/api/user/comment`, {
      cache: 'no-cache',
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await res.json();

    return data.comments;
  } catch (error: any) {
    console.error('Error While getting user suggestions:', error.message);
    throw new Error(error.message);
  }
}
