import React, { useState } from "react";

const Comment = ({
  comment,
  onSubmitCom = () => {},
  onEditcomment = () => {},
  onDeletecomment = () => {},
}) => {
  const [expand, setToggle] = useState(false);
  const [reply, setReply] = useState("");
  const [editmode, setEditmode] = useState(false);
  const [editedcontent, seteditedcontent] = useState(comment.content);

  const toggleEditmode = () => {
    setEditmode(!editmode);
    seteditedcontent(comment.content);
  };

  const toggleButton = () => {
    setToggle(!expand);
  };
  const handleSubmitEdit = () => {
    onEditcomment(comment.id, editedcontent);
    setEditmode(false);
  };
  const handleSubmitcancel = () => {};
  const handleChange = (e) => {
    if (editmode) {
      seteditedcontent(e.target.value);
    } else {
      setReply(e.target.value);
    }
  };

  const handleSubmitReply = () => {
    if (reply) {
      onSubmitCom(comment.id, reply);
      setReply("");
    }
  };

  return (
    <div className="bg-blue-100">
      <div className="m-2 classblack">
        {editmode ? (
          <>
            <div className="w-full flex gap-2 p-3">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                value={editedcontent}
                cols={50}
                onChange={handleChange}
                rows={3}
                placeholder="Add a New Comment....."
              ></textarea>
              <button
                onClick={handleSubmitEdit}
                className="text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              >
                Save Edit
              </button>
              <button
                onClick={handleSubmitcancel}
                className="text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              >
                Cancel Edit
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="pl-2">{comment.content}</p>
            <p className="pl-2">votes: {comment.votes}</p>
            <p className="pl-2">
              {new Date(comment.timestamp).toLocaleString()}
            </p>
          </>
        )}
        <div>
          <button
            className="m-1 bg-blue-500 text-white p-3 rounded hover:shadow"
            onClick={toggleButton}
          >
            {expand ? "Hide" : "Reply"}
          </button>
          <button
            className="m-1 bg-blue-500 text-white p-3 rounded hover:shadow"
            onClick={toggleEditmode}
          >
            Edit
          </button>
          <button
            className="m-1 bg-blue-500 text-white p-3 rounded hover:shadow"
            onClick={() => onDeletecomment(comment.id)}
          >
            Delete
          </button>
        </div>
        {expand && (
          <div>
            <div className="w-full flex gap-2 p-3">
              <textarea
                className="border p-2"
                value={reply}
                cols={50}
                onChange={handleChange}
                rows={3}
                placeholder="Add a New Comment....."
              ></textarea>
              <button
                onClick={handleSubmitReply}
                className="bg-orange-700 p-3 text-base rounded"
              >
                Add Comment
              </button>
            </div>
            {comment?.replies?.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onSubmitCom={onSubmitCom}
                onEditcomment={onEditcomment}
                onDeletecomment={onDeletecomment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
