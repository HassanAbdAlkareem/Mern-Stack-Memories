import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ButImg from "../../image/user.png";
import Loading from "../../components/cmp-loading/Loading.jsx";
import { UseGlobelContext } from "../../context/FunctionAlContext";
import { AiFillDelete, IoMdArrowRoundBack } from "react-icons/all";

const PostDetails = () => {
  const { user, URL } = UseGlobelContext();
  //
  const [postDetails, setPostDetails] = useState(null);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [comments, setComments] = useState([]);
  const [writeComment, setWriteComment] = useState("");

  const commentRef = useRef();
  useEffect(() => {
    const getDetailsPostAndComments = async () => {
      try {
        const { data } = await axios.get(URL + "/posts/" + path);
        setPostDetails(data);
        const res = await axios.get(URL + "/posts/comment/" + path);
        setComments(res.data.comments);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDetailsPostAndComments();
  }, [path]);

  const handleClick = async () => {
    try {
      const res = await axios.post(URL + "/posts/comment/" + postDetails?._id, {
        value: writeComment,
        username: user.data.name,
      });
      setComments(res.data.comments);
      setWriteComment("");
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (index) => {
    const filter = comments.filter((c, i) => i !== index);
    await axios.delete(URL + "/posts/comment/" + postDetails._id, {
      data: { index },
    });
    setComments(filter);
  };
  //
  return (
    <div className="post-details">
      <Link className="back" to="/posts">
        <IoMdArrowRoundBack /> Back
      </Link>
      {postDetails ? (
        <div className="wrapper">
          <div className="info">
            <h2 className="title">
              {postDetails.title ? postDetails.title : "Title is Empty"}
            </h2>
            <p className="message">
              {postDetails.message ? postDetails.message : "Message is Empty"}
            </p>
            {postDetails.tags.length > 1 && (
              <div className="parent-tags">
                <h5 className="title-tags">Tigs</h5>
                {postDetails.tags.map((tag) => (
                  <span className="tags">{`#${tag} `}</span>
                ))}
              </div>
            )}
            <div className="create-comment">
              <p>
                Create by : <span>{postDetails.name}</span>{" "}
              </p>
              <p>Comments</p>
            </div>

            <div className="parent-comments">
              {comments.length > 0 ? (
                <div className="text-comment">
                  {comments.map((comment, index) => (
                    <React.Fragment>
                      <div className="info-comment">
                        <p className="comment">
                          <span className="comment-user">
                            {comment.username} :
                          </span>
                          {` ${comment.value}`}
                        </p>
                        {user ? (
                          (user.data.name === comment.username ||
                            user.data.isAdmin === true) && (
                            <AiFillDelete
                              onClick={() => deleteComment(index)}
                              className="icon"
                            />
                          )
                        ) : (
                          <AiFillDelete className="icon icon-not-user" />
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                  <div ref={commentRef} />
                </div>
              ) : (
                <p className="no-comment">No Comments yet ...</p>
              )}
              <div className="write-comment">
                <input
                  onChange={(e) =>
                    user ? setWriteComment(e.target.value) : ""
                  }
                  type="text"
                  value={writeComment}
                  placeholder="Write The Comment"
                />
                <button
                  className={!user && "not-user"}
                  onClick={user ? handleClick : ""}
                >
                  {!user ? " Sign in to write comment ..." : "Submit Comment"}
                </button>
              </div>
            </div>
          </div>
          <div className="img">
            <img
              src={postDetails.selectfile ? postDetails.selectfile : ButImg}
            />
          </div>
        </div>
      ) : (
        <Loading className="loading-from-post-details" />
      )}
    </div>
  );
};

export default PostDetails;
