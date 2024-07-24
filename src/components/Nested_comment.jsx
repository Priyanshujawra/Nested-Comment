import React, { useState } from "react";
import useHookTree from "../hook/use_hook_tree";
import Comment from "./comment";

const NestedComment = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [comment, setComment] = useState("");
  const {
    comments: commentData,
    insertComment,
    editComment,
    DeleteComment,
  } = useHookTree(comments);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
    onSubmit(content);
  };
  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  };
  const handleDelete = (commentId) => {
    DeleteComment(commentId);
    onDelete(commentId);
  };
  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };

  return (
    <div>
      <h1>Nested Comment</h1>
      <div className="w-full flex gap-2 p-3">
        <textarea
          className="border p-2"
          value={comment}
          cols={50}
          onChange={handleChange}
          rows={3}
          placeholder="Add a New Comment....."
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-orange-700 p-3 text-base rounded"
        >
          Add Comment
        </button>
      </div>
      {commentData.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onSubmitCom={handleReply}
          onEditcomment={handleEdit}
          onDeletecomment={handleDelete}
        />
      ))}
    </div>
  );
};

export default NestedComment;
