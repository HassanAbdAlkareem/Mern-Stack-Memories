import React, { useEffect, useState } from "react";
import Posts from "../../components/cmp-home/cmp-posts/Posts";
import Form from "../../components/cmp-home/cmp-form/Form";
import Pagination from "../../components/cmp-home/cmp-form/Pagination";
import Search from "../../components/cmp-home/cmp-form/Search";
import { UseGlobelContext } from "../../context/FunctionAlContext";
//

const Home = () => {
  console.log("renderr");
  const { posts } = UseGlobelContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  //for get Search Posts
  useEffect(() => {
    if (searchTerm !== "") {
      const filterPosts = posts.filter((post) => {
        return Object.values(post)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setResultSearch(filterPosts);
    } else {
      setResultSearch(posts);
    }
  }, [searchTerm]);

  return (
    <div className="home">
      <React.Fragment>
        <Posts posts={searchTerm.length < 1 ? posts : resultSearch} />
        <div className="parent-side-form">
          <div className="wrapper-side">
            <div className="search">
              <Search setSearchTerm={setSearchTerm} />
            </div>
            <div className="parent-form">
              <Form />
            </div>
            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Home;
