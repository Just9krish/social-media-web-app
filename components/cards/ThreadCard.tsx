'use client';

import UserThreadBar from './UserThreadBar';
import { Heart, MessageCircle, SendHorizonal } from 'lucide-react';
import { thread } from '@/utils/interfae';
import ImageViewer from '../common/ImageViewer';
import PostReply from '../froms/PostReply';
import { useState } from 'react';

export default function ThreadCard({ thread }: { thread: thread }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="space-y-3 w-full rounded-xl dark:bg-dark-2 p-7">
        <UserThreadBar
          createdAt={thread.createdAt}
          name={thread.user.name}
          image={''}
        />

        <p className="mt-2 text-small-regular dark:text-light-2">
          {thread.content}
        </p>
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
        </div>
        <div className="flex gap-3.5">
          <span>3 Replies</span>
          <span>2 Replies</span>
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
