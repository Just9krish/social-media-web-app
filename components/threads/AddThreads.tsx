'use client';

import { Image } from 'lucide-react';
import UserAvatar from '../UserAvatar';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { ChangeEvent, useRef, useState } from 'react';
import ImagePreviewCard from '../ImagePreviewCard';

export default function AddThreads() {
  const [preview, setPreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    imgRef.current?.click();
  };

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removePreview = () => {
    setPreview(null);
  };

  return (
    <div className="flex justify-start items-start gap-4">
      <UserAvatar image="" name="John Doe" />
      <div className="space-y-6 w-full">
        <Textarea
          className="bg-muted outline-none p-2 resize-none rounded-lg placeholder:font-normal text-md w-full"
          placeholder="What is happening..."
        />
        {preview && (
          <ImagePreviewCard image={preview} callback={removePreview} />
        )}
        <div className="flex  items-center justify-between">
          <input
            type="file"
            ref={imgRef}
            onChange={handleImgChange}
            accept="image/*"
            multiple={false}
            hidden={true}
            name="image"
            id="images"
            className="hidden"
          />
          <Image
            height={20}
            width={20}
            className="cursor-pointer"
            onClick={handleClick}
          />
          <Button size="sm" className="dark:bg-primary-500 text-light-1">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
