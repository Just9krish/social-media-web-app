import Link from 'next/link';
import UserAvatar from '../common/UserAvatar';

interface IProps {
  name: string;
  username: string;
  imgUrl: string;
  userId: string;
}

export default function UserCard({ name, username, imgUrl, userId }: IProps) {
  return (
    <div className="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center">
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
        <UserAvatar image={imgUrl} name={name} />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold dark:text-light-1">{name}</h4>
          <p className="text-small-medium dark:text-gray-1">{username}</p>
        </div>
      </div>
      <Link
        href={`/user/${userId}`}
        className=" py-2 text-center text-lg font-medium  min-w-[74px] rounded-lg dark:bg-primary-500 text-[12px] dark:text-light-1 !important"
      >
        View
      </Link>
    </div>
  );
}
