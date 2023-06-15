import React, { useState } from "react";
import axios from "axios";
import {
  AiFillDelete,
  AiFillLike,
  FaEdit,
  FcViewDetails,
} from "react-icons/all";
import { Link } from "react-router-dom";
import { UseGlobelContext } from "../../../context/FunctionAlContext";

const Post = ({ post }) => {
  const { posts, setPosts, setCurrentPost, user, token, URL } =
    UseGlobelContext();
  const [like, setLike] = useState(post.likeCount);
  //

  const handelLike = async () => {
    try {
      const res = await axios.put(
        URL + "/posts/like/" + post._id,
        { likeCount: post.likeCount + 1 },
        { headers: { authorization: token } }
      );
      setLike(res.data.likeCount);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handelDeleted = async () => {
    try {
      const res = await axios.delete(URL + "/posts/" + post._id, {
        data: { name: user.data.name },
        headers: { authorization: token },
      });

      const postFilter = posts.filter((el) => el._id !== res.data._id);
      setPosts(postFilter);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOne = () => {
    const findOne = posts.find((p) => {
      return (
        (p._id === post._id && p.name === user.data.name) ||
        (p._id === post._id && user.data.isAdmin === true)
      );
    });
    setCurrentPost(findOne);
  };

  return (
    <div className="coling col-sm-12 col-md-12 col-lg-6 col-xl-4">
      <div className="post">
        <div className="wrapper">
          {/* */}
          <div className="img">
            <img src={post.selectfile ? post.selectfile : null} />
            <div className="wrapper-img-info">
              <div className="img-info">
                <p>{post.name}</p>
                <p>{new Date(post.createdAt).toDateString()}</p>
              </div>
              <div className="img-options">
                {user ? (
                  <FaEdit
                    className={
                      user?.data?.name === post.name ||
                      user?.data?.isAdmin === true
                        ? "edit"
                        : "not-user"
                    }
                    onClick={getOne}
                  ></FaEdit>
                ) : (
                  <FaEdit className="not-user"></FaEdit>
                )}
              </div>
            </div>
          </div>
          {/* */}
          <div className="wrapper-info">
            <div className="info">
              {post.tags.length < 3 ? (
                post.tags.map((tag, i) => (
                  <span key={i} className="tag">{`  #${tag.substring(
                    0,
                    20
                  )}`}</span>
                ))
              ) : (
                <Link
                  to={"/detailspost/" + post._id}
                  style={{ color: "#333", cursor: "pointer" }}
                >
                  <strong>Show all Tags</strong>
                </Link>
              )}
              <p className="title">
                {post.title.substring(0, 20)}
                {post.title.length > 20 && (
                  <Link className="show-more" to={"/detailspost/" + post._id}>
                    Show More .
                  </Link>
                )}
                <p className="desc">
                  {post.message.substring(0, 50)}
                  {post.message.length >= 50 ? (
                    <Link to={"/detailspost/" + post._id} className="show-more">
                      Show More
                    </Link>
                  ) : post.message.length < 35 ? (
                    <div className="height"></div>
                  ) : null}
                </p>
              </p>
            </div>
            <div className="buttons">
              <button
                className={user ? "button" : "not-user"}
                onClick={user ? handelLike : null}
              >
                {like} Like <AiFillLike className="icon" />
              </button>
              <button>
                <Link className="link" to={"/detailspost/" + post._id}>
                  Details <FcViewDetails className="icon" />
                </Link>
              </button>
              {user?.data?.name === post.name ||
              user?.data?.isAdmin === true ? (
                <button onClick={handelDeleted}>
                  Delete <AiFillDelete className="icon" />
                </button>
              ) : (
                <AiFillDelete className="icon-not-user" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
