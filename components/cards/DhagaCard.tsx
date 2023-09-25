import Image from 'next/image';
import UserDhagaBar from './UserDhagaBar';
import { Heart, MessageCircle, SendHorizonal } from 'lucide-react';
import { Dhaga } from '@/utils/interfae';
import { Config } from '@/config';

export default function DhagaCard({ dhaga }: { dhaga: Dhaga }) {
  return (
    <article className="space-y-3 w-full rounded-xl dark:bg-dark-2 p-7">
      <UserDhagaBar
        createdAt={dhaga.createdAt}
        name={dhaga.user.name}
        image={''}
      />

      <p className="mt-2 text-small-regular dark:text-light-2">
        {dhaga.content}
      </p>
      {dhaga.image && (
        <div className="w-full rounded-2xl overflow-hidden object-cover max-h-96">
          <Image
            src={`${Config.APP_URL}/uploads/${dhaga.image}`}
            width={100}
            height={100}
            alt="uploaded image"
            className="w-full object-cover"
          />
        </div>
      )}
      <div className="flex gap-3.5">
        <Heart width={20} height={20} />
        <MessageCircle width={20} height={20} />
        <SendHorizonal width={20} height={20} />
      </div>
      <div className="flex gap-3.5">
        <span>3 Replies</span>
        <span>2 Replies</span>
      </div>
    </article>
  );
}
