import { Comment } from "@/utils/interfae";
import UserAvatar from "../common/UserAvatar";
import { formatDate } from "@/lib/utils";

interface Props {
    comment: Comment;
}


export default function CommentCard({ comment }: Props) {
    return (
        <article className="dark:bg-dark-2 p-4  rounded-lg">
            <div className="flex justify-between items-center gap-6">
                <div className="flex gap-4 items-center">
                    <UserAvatar image="" name={comment.user.name} />
                    <p>{comment.user.name}</p>
                </div>
                <span>{formatDate(comment.createdAt)}</span>
            </div>
            <p className="dark:text-light-1 mt-4">{comment.content}</p>
        </article>

    );
}
