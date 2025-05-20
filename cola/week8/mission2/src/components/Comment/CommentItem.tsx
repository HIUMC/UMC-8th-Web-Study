import { Comment } from '../../types/lp';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-2 px-5 py-3 bg-gray-700 rounded-lg text-white">
      <div>{comment.author.name}</div>
      <div>{comment.content}</div>
    </div>
  );
};

export default CommentItem;
