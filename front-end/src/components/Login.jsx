import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./Login.css";

//import fire
import fire from "./fire";

export default function Login(props) {
  const history = useHistory();
  const eye = <FontAwesomeIcon icon={faEye} />;
  const { register, handleSubmit, errors } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const onSubmit = (data, event) => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        props.validate(true);
        event.target.reset();
        axios
          .post(`http://localhost:9001/getregistereduser`, { data })
          .then((response) => {
            const user = response.data.user;
            const userType = response.data.user.usertype;
            if (userType === "learner") {
              history.push({ pathname: "/learner", state: { user } });
            } else if (userType === "educator") {
              history.push({ pathname: "/educator", state: { user } });
            }
          })
          .catch((error) => {
            console.log("error with axios in login", error);
          });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setEmailError("This is an invalid email");
            break;
          case "auth/user-disabled":
            setEmailError("User has been disabled");
            break;
          case "auth/user-not-found":
            setEmailError("User is not found");
            break;
          case "auth/wrong-password":
            setPasswordError("This is wrong password");
            break;
        }
      });
  };

  return (
    <div className="loginform-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="loginform-group">
          <div>Login</div>
          <input
            className="login-input"
            name="email"
            autoComplete="off"
            ref={register({
              required: true,
              maxLength: 255,
            })}
            placeholder="Email"
          />
          {/* errors will return when field validation fails  */}
          {errors.email && errors.email.type === "required" && (
            <span>Email is required</span>
          )}
          {errors.email && errors.email.type === "maxLength" && (
            <span>MaxLength of the email is 255</span>
          )}
          {/**handling email errors coming from Firebase */}
          <p>{emailError ? emailError : ""}</p>

          <div className="password-wrapper">
            <input
              className="login-input"
              name="password"
              autoComplete="off"
              ref={register({ required: true, minLength: 5, maxLength: 255 })}
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
            ></input>

            <i className="login-eye" onClick={togglePasswordVisiblity}>
              {eye}
            </i>
          </div>
          {errors.password && errors.password.type === "required" && (
            <span>Password is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span>MinLength of the password is 5</span>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <span>MaxLength of the password is 255</span>
          )}
          {/* *handling password errors from Firebase */}
          <p>{passwordError ? passwordError : ""}</p>
          <div className="login-btn-container">
            <input className="btn" type="submit" value="Login" />
          </div>
        </div>
      </form>
      <div className="new-user-container">
        <span>New user? </span>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
