import axios from "axios";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { UseGlobelContext } from "../../../context/FunctionAlContext";
import loading from "../../../image/loading.gif";

const Form = () => {
  const { URL, currentPost, setCurrentPost, user, setPosts, posts, token } =
    UseGlobelContext();

  const [error, setError] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState(false);
  //
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectfile: "",
    tags: "",
  });

  useEffect(() => {
    if (currentPost) {
      setPostData({
        title: currentPost.title,
        message: currentPost.message,
        selectfile: currentPost.selectfile,
        tags: currentPost.tags,
      });
    }
  }, [currentPost]);

  //function for create post or update post
  const handelSubmit = async (e) => {
    setErrorFromServer(false);
    e.preventDefault();
    if (
      postData.title === "" &&
      postData.message === "" &&
      postData.selectfile === "" &&
      postData.tags === ""
    ) {
      setError(true);
    } else {
      if (currentPost) {
        try {
          await axios.put(
            URL + "/posts/" + currentPost._id,
            {
              title: postData.title,
              message: postData.message,
              tags: postData.tags,
              selectfile: postData.selectfile,
              name: user?.data?.name,
            },
            { headers: { authorization: token } }
          );
          clearInput();
          window.location.reload();
          setCurrentPost(null);
        } catch (error) {
          setErrorFromServer(true);
          console.log(error);
        }
      } else {
        try {
          const res = await axios.post(
            URL + "/posts/",
            {
              title: postData.title,
              message: postData.message,
              tags: postData.tags,
              selectfile: postData.selectfile,
              name: user?.data?.name,
            },
            { headers: { authorization: token } }
          );

          setPosts([...posts, res.data]);
          clearInput();
          //
        } catch (error) {
          setErrorFromServer(true);
          console.log(error);
        }
      }
    }
  };

  const handelDeleteAllPosts = async () => {
    try {
      await axios.delete(URL + "/posts", {
        headers: { authorization: token },
        data: { name: user.data.name },
      });

      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearInput = () => {
    setPostData({
      title: "",
      message: "",
      selectfile: "",
      tags: "",
    });
  };

  //
  return (
    <div className={currentPost ? "form current-post" : "form"}>
      {!user ? (
        <p className="not-user">
          Please Sign in to create your own memories and likes other's memories.
        </p>
      ) : (
        <div className="wrapper">
          <h4>
            {currentPost ? "Editing a Memory .." : "Creating a Memory"}
            <img src={loading} className="loading-form" />
          </h4>

          <form onSubmit={handelSubmit}>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              value={postData.title}
            />
            <input
              type="text"
              placeholder="Message"
              className="message"
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
              value={postData.message}
            />
            <input
              type="text"
              placeholder="Use coma (,) for tow tags"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />

            <FileBase
              type="file"
              multple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectfile: base64 })
              }
            />

            {error && (
              <p className="create-error">You must enter the information!</p>
            )}
            {currentPost && (
              <button
                onClick={() => (clearInput(), setCurrentPost(null))}
                className="cancel"
              >
                cancel{" "}
              </button>
            )}
            {errorFromServer && (
              <p className="error-from-server">
                {" "}
                Something is wrong or your image is larg!
              </p>
            )}
            <button type="submit" onClick={handelSubmit} className="submit">
              {currentPost ? "Update Post" : "Submit Post"}
            </button>
          </form>
          {posts.find((p) => p.name === user.data.name) && (
            <button className="clear" onClick={handelDeleteAllPosts}>
              Delete Your Posts
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
