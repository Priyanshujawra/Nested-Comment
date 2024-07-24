import React, { useState } from "react";

const useHookTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const editNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content,
          timestamp: new Date().toISOString(),
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const editComment = (commentId, content) => {
    setComments((prevComments) => editNode(prevComments, commentId, content));
  };

  const DeleteNode = (tree, commentId) => {
    return tree.reduce((acc, comment) => {
      if (comment.id === commentId) {
        return acc;
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = DeleteNode(comment.replies, commentId);
      }
      return [...acc, comment];
    }, []);
  };

  const DeleteComment = (commentId) => {
    setComments((prevComments) => DeleteNode(prevComments, commentId));
  };
  return {
    comments,
    insertComment,
    editComment,
    DeleteComment,
  };
};

export default useHookTree;
