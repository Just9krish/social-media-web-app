'use client';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export default function ImagePreviewCard({
  image,
  callback,
}: {
  image: string;
  callback: () => void;
}) {
  return (
    <div
      className="w-full h-80 bg-cover rounded-lg"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="text-right mr-2">
        <Button size="icon" className="mt-2 rounded-full" onClick={callback}>
          <X />
        </Button>
      </div>
    </div>
  );
}
