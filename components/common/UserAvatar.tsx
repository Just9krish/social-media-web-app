import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IProps {
  image: string;
  name: string;
}

export default function UserAvatar({ image, name }: IProps) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
