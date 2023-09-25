import { MoreHorizontal } from 'lucide-react';
import UserAvatar from '../UserAvatar';
import { User } from '@/utils/interfae';
import { Config } from '@/config';
import { formatDate } from '@/lib/utils';

interface IProps {
  createdAt: Date;
  name: string;
  image: string;
}

export default function UserDhagaBar({ createdAt, image, name }: IProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* <UserAvatar name="John Doe" image={`${Config.APP_URL}/uploads/${image}`} /> */}
        <UserAvatar name="John Doe" image="" />

        <h4 className="cursor-pointer text-base-semibold dark:text-light-1">{name}</h4>
      </div>
      <div className="flex items-center gap-3">
        <span>{formatDate(createdAt)}</span>
        <MoreHorizontal />
      </div>
    </div>
  );
}
