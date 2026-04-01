import { useState } from "react";
import { useParams } from "react-router-dom";

const sampleVideos = [
  {
    _id: "1",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "A quick tutorial to get started with React.",
    channelName: "Code with John",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    comments: [
      { id: 1, user: "User123", text: "Great video! Very helpful." },
      { id: 2, user: "John", text: "Thanks for sharing this tutorial." },
    ],
  },
  {
    _id: "2",
    title: "Node.js Crash Course",
    thumbnailUrl:
      "https://i.ytimg.com/vi/fBNz5xF-Kx4/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    description: "Learn Node.js basics in one video.",
    channelName: "Backend Master",
    views: 28400,
    likes: 2044,
    dislikes: 30,
    comments: [
      { id: 1, user: "Aman", text: "Very nice explanation!" },
    ],
  },
];

function VideoPage() {
  const { id } = useParams();
  const video = sampleVideos.find((item) => item._id === id);

  const [likes, setLikes] = useState(video ? video.likes : 0);
  const [dislikes, setDislikes] = useState(video ? video.dislikes : 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(video ? video.comments : []);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);

      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setDisliked(true);

      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "CurrentUser",
      text: commentText,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleUpdateComment = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === editCommentId
        ? { ...comment, text: editText }
        : comment
    );

    setComments(updatedComments);
    setEditCommentId(null);
    setEditText("");
  };

  if (!video) {
    return <h2 style={{ padding: "20px" }}>Video not found</h2>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <video controls style={styles.videoPlayer}>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h2 style={styles.title}>{video.title}</h2>

        <div style={styles.channelRow}>
          <div>
            <h3 style={styles.channelName}>{video.channelName}</h3>
            <p style={styles.views}>{video.views} views</p>
          </div>

          <div style={styles.actions}>
            <button
              style={{
                ...styles.likeBtn,
                backgroundColor: liked ? "#3ea6ff" : "#272727",
                color: liked ? "black" : "white",
              }}
              onClick={handleLike}
            >
              👍 {likes}
            </button>

            <button
              style={{
                ...styles.dislikeBtn,
                backgroundColor: disliked ? "#ff4d4d" : "#272727",
                color: disliked ? "white" : "white",
              }}
              onClick={handleDislike}
            >
              👎 {dislikes}
            </button>
          </div>
        </div>

        <div style={styles.descriptionBox}>
          <p>{video.description}</p>
        </div>

        <div style={styles.commentsSection}>
          <h3>Comments ({comments.length})</h3>

          <textarea
            placeholder="Write a comment..."
            style={styles.commentInput}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <button style={styles.commentBtn} onClick={handleAddComment}>
            Post Comment
          </button>

          {comments.map((comment) => (
            <div key={comment.id} style={styles.commentBox}>
              <p>
                <strong>{comment.user}</strong>
              </p>

              {editCommentId === comment.id ? (
                <>
                  <textarea
                    style={styles.editInput}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button style={styles.saveBtn} onClick={handleUpdateComment}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{comment.text}</p>

                  <div style={styles.commentActions}>
                    <button
                      style={styles.editBtn}
                      onClick={() => handleEditComment(comment)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    color: "white",
  },
  leftSection: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  videoPlayer: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  channelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  channelName: {
    fontSize: "18px",
    marginBottom: "5px",
  },
  views: {
    color: "#aaaaaa",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  likeBtn: {
    padding: "10px 16px",
    borderRadius: "20px",
    color: "white",
  },
  dislikeBtn: {
    padding: "10px 16px",
    borderRadius: "20px",
    color: "white",
  },
  descriptionBox: {
    backgroundColor: "#272727",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "30px",
  },
  commentsSection: {
    marginTop: "20px",
  },
  commentInput: {
    width: "100%",
    minHeight: "80px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #444",
    backgroundColor: "#121212",
    color: "white",
    marginBottom: "10px",
    outline: "none",
  },
  commentBtn: {
    padding: "10px 16px",
    borderRadius: "20px",
    backgroundColor: "#3ea6ff",
    color: "black",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  commentBox: {
    backgroundColor: "#1f1f1f",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "12px",
  },
  commentActions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  editBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    backgroundColor: "#444",
    color: "white",
  },
  deleteBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    backgroundColor: "#cc0000",
    color: "white",
  },
  editInput: {
    width: "100%",
    minHeight: "60px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#121212",
    color: "white",
    marginTop: "10px",
    marginBottom: "10px",
  },
  saveBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    backgroundColor: "#3ea6ff",
    color: "black",
    fontWeight: "bold",
  },
};

export default VideoPage;