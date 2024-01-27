'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ShowThread, thread } from '@/utils/interfae';
import { useSession } from 'next-auth/react';
import UserAvatar from '../common/UserAvatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { formatDate } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReplyInput, createReplySchema } from '@/schema/ThreadSchema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from '../ui/use-toast';

interface IProps {
  thread: thread | ShowThread;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function PostReply({
  thread,
  isModalOpen,
  setIsModalOpen,
}: IProps) {
  const { data } = useSession();
  const form = useForm<ReplyInput>({
    resolver: zodResolver(createReplySchema),
    defaultValues: {
      threadId: thread.id,
    },
  });
  const router = useRouter();

  if (!data) {
    return null;
  }

  function onChangeWrapper(value: boolean) {
    setIsModalOpen(value);
    form.reset();
  }

  async function handleAddReply(input: ReplyInput) {
    try {
      const { data } = await axios.post('/api/reply', input);

      toast({ title: 'Success', description: data.message });
      onChangeWrapper(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onChangeWrapper}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">
            Reply to {thread.user.name}
          </DialogTitle>
          <DialogDescription className="space-y-6">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <UserAvatar image="" name={thread.user.name} />
                <p className="dark:text-light-1">{thread.content}</p>
              </div>
              <span className="text-sm">{formatDate(thread.createdAt)}</span>
            </div>
            <div className="flex gap-4">
              <UserAvatar name={data.user?.name!} image="" />
              <Form {...form}>
                <form
                  className="w-full"
                  onSubmit={form.handleSubmit(handleAddReply)}
                >
                  <FormField
                    name="content"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                            placeholder={`Reply to ${thread.user.name}...`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <DialogFooter>
              <Button
                disabled={form.formState.isSubmitting}
                onClick={form.handleSubmit(handleAddReply)}
              >
                Post{' '}
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin h-4 w-4 ml-2" />
                )}
              </Button>
            </DialogFooter>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
