import React from "react";
import userImg from "../../image/user.png";
import { Link } from "react-router-dom";
import { UseGlobelContext } from "../../context/FunctionAlContext";

const Navbar = () => {
  const { user, setUser } = UseGlobelContext();

  return (
    <div className="Navbar">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img
              alt={null}
              src={user?.data?.imageUrl ? user.data.imageUrl : userImg}
            />
          </Link>
          <h3>Memories</h3>
        </div>
        {user ? (
          <div className="user-here">
            <button className="logout" onClick={() => setUser(null)}>
              LogOut
            </button>
          </div>
        ) : (
          <Link to="/auth" className="link">
            <button className="sign-in">SignIn</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
