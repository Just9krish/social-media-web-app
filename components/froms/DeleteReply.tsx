'use client';

import { Trash2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '../ui/use-toast';
import axios from 'axios';

interface DeleteReplyProps {
  currentUserId: string;
  authorId: string;
  replyId: string;
}

export default function DeleteReply({
  // authorId,
  // currentUserId,
  replyId,
}: DeleteReplyProps) {
  const pathname = usePathname();
  const router = useRouter();

  // if (currentUserId !== authorId || pathname === '/') return null;

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/reply/${replyId}`);

      toast({
        title: 'Success',
        description: data.message,
      });

      router.refresh();
    } catch (error: any) {
      toast({
        title: 'Failed to delete reply',
        description: error.response.message || error.message,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 width={20} height={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            reply and remove from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
