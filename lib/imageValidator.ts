import { IMGEXTTYPE, IMAGEALLOWEDSIZE } from '@/constant';
import { bytesToMegabytes } from './utils';

interface IParams {
  name: string | undefined;
  size: number | undefined;
}

export default function ImageValidator({ name, size }: IParams) {
  if (name) {
    const imgType = name.split('.').pop();

    if (!IMGEXTTYPE.includes(imgType as string)) {
      return 'Invalid image type';
    }
  }

  if (size) {
    const imgInMB = bytesToMegabytes(size);
    if (imgInMB > IMAGEALLOWEDSIZE) {
      return 'Image size is too large';
    }
  }

  return null;
}
