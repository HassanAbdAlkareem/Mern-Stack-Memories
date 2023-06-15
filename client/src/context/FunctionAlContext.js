import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AlContext = createContext();

const FunctionAlContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  //
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );

  // from user
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(user));
  }, [user]);

  const URL = "http://localhost:5000/api";
  const token = `Bearer ${user?.token}`;

  // for get posts pagination
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${URL}/posts?page=${pageNumber}`);
        const temp = [...res.data.posts];
        temp.reverse();
        setPosts(temp);
        setTotalPages(res.data.totalPage);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [pageNumber]);

  return (
    <AlContext.Provider
      value={{
        posts,
        setPosts,
        currentPost,
        setCurrentPost,
        user,
        setUser,
        totalPages,
        setTotalPages,
        pageNumber,
        setPageNumber,
        token,
        URL,
      }}
    >
      {children}
    </AlContext.Provider>
  );
};

const UseGlobelContext = () => {
  return useContext(AlContext);
};

export { FunctionAlContext, UseGlobelContext };
