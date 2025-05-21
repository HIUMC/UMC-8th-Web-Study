import React from "react";
import { Comment } from "../../types/comment";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <img
              src={comment.author.avatar || "/default-profile.png"}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full object-cover mr-4"
            />
            <h4 className="text-sm font-bold text-gray-800">
              {comment.author.name}
            </h4>
          </div>

          <p className="text-gray-700">{comment.content}</p>

          {/* <p className="text-xs text-gray-500 mt-2">
            {new Date(comment.createdAt).toLocaleString()}
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
