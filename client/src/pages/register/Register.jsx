import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { UseGlobelContext } from "../../context/FunctionAlContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Inputs from "./arrayInputs";
import InputForm from "./InputForm";

const Auth = () => {
  const [error, setError] = useState(false);
  const { setUser, URL } = UseGlobelContext();
  const history = useHistory();

  const [signup, setSignup] = useState(false);
  //
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (signup) {
      try {
        const res = await axios.post(URL + "/user/signup", {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          confirmPassword: formData.confirmPassword,
        });
        history.push("/");
        setUser(res.data);
      } catch (error) {
        console.log(error.message);
        setError(true);
      }
    } else {
      try {
        const res = await axios.post(URL + "/user/signin", {
          email: formData.email,
          password: formData.password,
        });
        history.push("/");
        setUser(res.data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  };

  const googleSuccess = async (res) => {
    try {
      const data = res?.profileObj;
      const token = res?.tokenId;
      history.push("/");
      setUser({ data, token });
    } catch (error) {
      console.log(error.message);
    }
  };

  const googleFailure = () => {
    console.log("failed sign in with google");
  };
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <h2 className="title">{signup ? "Sign Up" : "Sign In"}</h2>
          {signup === false && (
            <p className={error ? "error invisble" : "error"}>
              this account not found , Pleace Regisrer first
            </p>
          )}

          {signup
            ? Inputs.map((input) => {
                Inputs[3].pattern = formData.password;
                return (
                  <InputForm
                    handleChange={handleChange}
                    key={input.id}
                    {...input}
                    value={formData[input.name]}
                  />
                );
              })
            : Inputs.map((input) => {
                return (
                  (input.name === "email" || input.name === "password") && (
                    <InputForm
                      handleChange={handleChange}
                      key={input.id}
                      {...input}
                      value={formData[input.name]}
                    />
                  )
                );
              })}
          <div className="parent-buttons">
            <button type="submit" className="submit">
              {signup ? "Sign Up" : "Sign In"}
            </button>
            {/* */}
            <GoogleLogin
              clientId="928961494524-a20p1l15htev5n69liu27hmdupl4b5kh.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="submit auth-google"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Google Sign In
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <button
              className="change-mode"
              onClick={() => (
                setError(false),
                setSignup(!signup),
                setFormData({ ...formData, email: "", password: "" })
              )}
            >
              {signup
                ? "Already have an account? Sign In"
                : "Don't have an account? Sing Up"}
            </button>
          </div>
        </div>
      </form>
      {/* */}
    </div>
  );
};

export default Auth;
