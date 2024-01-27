import { Comment } from '@/utils/interfae';
import CommentCard from '../cards/CommentCard';

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard isAuth={true} comment={comment} key={comment.id} />
        ))
      ) : (
        <p className="text-center font-bold mt-5 text-xl">
          No comments to show.
        </p>
      )}
    </>
  );
}
