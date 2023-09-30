'use client';

interface Props {
  imgUrl: string;
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Config } from '@/config';
import Image from 'next/image';

export default function ImageViewer({ imgUrl }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={`${Config.APP_URL}/uploads/${imgUrl}`}
          width={100}
          height={100}
          alt="uploaded image"
          className="w-full object-cover"
        />
      </SheetTrigger>
      <SheetContent side="top" className="w-full h-screen">
        <SheetHeader>
          <SheetTitle>Image preview</SheetTitle>
        </SheetHeader>
        <SheetDescription className="flex justify-center items-center h-full">
          <div className="max-w-2xl">
            <Image
              src={`${Config.APP_URL}/uploads/${imgUrl}`}
              width={100}
              height={100}
              alt="uploaded image"
              className="w-full object-containe"
              unoptimized
            />
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
