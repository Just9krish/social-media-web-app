import UserAvatar from '../UserAvatar';
import { Button } from '../ui/button';

interface IProps {
  name: string;
  username: string;
  imgUrl: string;
}

export default function UserCard({ name, username, imgUrl }: IProps) {
  return (
    <div className="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center">
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
        <UserAvatar image={imgUrl} name={name} />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold dark:text-light-1">{name}</h4>
          <p className="text-small-medium dark:text-gray-1">{username}</p>
        </div>
      </div>
      <Button className="h-auto min-w-[74px] rounded-lg dark:bg-primary-500 text-[12px] dark:text-light-1 !important">
        View
      </Button>
    </div>
  );
}
