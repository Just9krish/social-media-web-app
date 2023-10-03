import CommentCard from '@/components/cards/CommentCard';
import ThreadCard from '@/components/cards/ThreadCard';
import { getThreadById } from '@/methods/thread';
import { thread } from '@/utils/interfae';
import React from 'react';

interface Props {
    params: {
        threadId: string;
    };
}

export default async function page({ params }: Props) {
    if (!params.threadId) return null;

    const thread: thread = await getThreadById(params.threadId);

    return (
        <section className="relative">
            <div>
                <ThreadCard thread={thread} noRedirect={true} />
            </div>

            <h4 className='mt-7 text-heading3-bold'>Replies</h4>

            <div className="mt-10">
                {thread.comment && thread.comment.length > 0 ? (
                    <div className='space-y-5'>
                        {thread.comment.map((comment) => (
                            <CommentCard comment={comment} key={comment.id} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No Comments</p>
                )}
            </div>
        </section>
    );
}
