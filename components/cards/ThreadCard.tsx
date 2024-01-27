'use client';

import UserThreadBar from './UserThreadBar';
import { Heart, MessageCircle, SendHorizonal } from 'lucide-react';
import { thread } from '@/utils/interfae';
import ImageViewer from '../common/ImageViewer';
import PostReply from '../froms/PostReply';
import { useState } from 'react';
import Link from 'next/link';
import DeleteThread from '../froms/DeleteThread';
import { useSession } from 'next-auth/react';

export default function ThreadCard({
  thread,
  noRedirect,
}: {
  thread: thread;
  noRedirect?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSession();

  return (
    <>
      <article className="space-y-4 w-full rounded-xl dark:bg-dark-2 p-7">
        <UserThreadBar
          createdAt={thread.createdAt}
          name={thread.user.name}
          image={''}
        />
        <Link href={noRedirect ? '#' : `/threads/${thread.id}`}>
          <p className="mt-2 text-small-regular dark:text-light-2">
            {thread.content}
          </p>
        </Link>
        {thread.image && (
          <div className="w-full rounded-2xl overflow-hidden object-cover max-h-96">
            <ImageViewer imgUrl={thread.image} />
          </div>
        )}
        <div className="flex gap-3.5">
          <Heart width={20} height={20} />
          <MessageCircle
            width={20}
            height={20}
            onClick={() => setIsModalOpen(true)}
          />
          <SendHorizonal width={20} height={20} />
          <DeleteThread
            authorId={thread.user.id}
            currentUserId={data?.user.id}
            threadId={thread.id}
          />
        </div>
        <div className="flex gap-3.5">
          <span>2 Likes</span>
          <span>{thread.commentCount} Replies</span>
        </div>
      </article>
      <PostReply
        thread={thread}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
