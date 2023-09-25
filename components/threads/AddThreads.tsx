'use client';

import { Image } from 'lucide-react';
import UserAvatar from '../UserAvatar';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { ChangeEvent, useRef, useState, useTransition } from 'react';
import ImagePreviewCard from '../ImagePreviewCard';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { wait } from '@/lib/wait';

export default function AddThreads() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleClick = () => {
    imgRef.current?.click();
  };

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setImage(selectedFile);
    }
  };

  const removePreview = () => {
    setPreview(null);
    setImage(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    await wait(5000);

    const form = new FormData();
    form.append('content', content);

    if (image) {
      form.append('image', image);
    }

    try {
      const { data } = await axios.post('api/post', form);

      setIsLoading(false);
      setContent('');
      setImage(null);
      setPreview(null);

      router.refresh();
      toast({
        title: 'Success',
        description: data.message,
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.response.data.message);
      toast({
        title: 'Error',
        description: error.response.data.message || error.message,
      });
    }
  };

  return (
    <div className="flex justify-start items-start gap-4">
      <UserAvatar image="" name="John Doe" />
      <div className="space-y-6 w-full">
        <Textarea
          className="bg-muted outline-none p-2 resize-none rounded-lg placeholder:font-normal text-md w-full"
          placeholder="What is happening..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
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
          <Button
            disabled={!content || isLoading}
            size="sm"
            className={`dark:bg-primary-500 dark:text-light-1 disabled:cursor-not-allowed ${
              isLoading && 'bg-red-600'
            }`}
            onClick={handleSubmit}
          >
            {isLoading ? 'Postin...' : 'Post'}
          </Button>
        </div>
      </div>
    </div>
  );
}
