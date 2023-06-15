import Post from "./Post";
import Loading from "../../cmp-loading/Loading";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.length === 0 ? (
        <div className="no-posts">
          <h4>There are no posts yet</h4>
          <Loading className="loading-from-posts" />
        </div>
      ) : (
        <div className="row">
          {posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Posts;
