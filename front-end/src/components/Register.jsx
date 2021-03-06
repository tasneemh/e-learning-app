import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "./Register.css";
import "antd/dist/antd.css";
import fire from "./fire";

export default function Register() {
  const eye = <FontAwesomeIcon icon={faEye} />;
  const { register, handleSubmit, errors } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [toggle, setToggle] = useState(false);
  const toggler = () => (toggle ? setToggle(false) : setToggle(true));

  const [userType, setUserType] = useState("learner");
  const getUserType = () => {
    toggle ? setUserType("learner") : setUserType("educator");
  };

  const clearErrors = () => {
    setTimeout(() => {
      setEmailError("");
      setPasswordError("");
    }, 10000);
  };

  const history = useHistory();

  const onSubmit = (data, event) => {
    data["usertype"] = userType;
    fire
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        event.target.reset();
        axios
          .post(`http://localhost:9001/savenewuser`, { data })
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
            console.log(error);
          });
      })

      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setEmailError("Email is already in use");
            clearErrors();
            break;
          case "auth/invalid-email":
            setEmailError("This is an invalid email");
            clearErrors();
            break;
          case "auth/weak-password":
            setPasswordError("Password is weak");
            clearErrors();
            break;
        }
      });
  };

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-container">
          <input
            className="input"
            name="firstname"
            autoComplete="off"
            ref={register({
              required: true,
              maxLength: 255,
            })}
            placeholder="First Name"
          ></input>
          {errors.firstname && errors.firstname.type === "required" && (
            <span className="errorMsg">First Name is required</span>
          )}
          {errors.firstname && errors.firstname.type === "maxLength" && (
            <span className="errorMsg">MaxLength of the firstname is 255</span>
          )}
          <input
            className="input"
            name="lastname"
            autoComplete="off"
            ref={register({
              required: true,
              maxLength: 255,
            })}
            placeholder="Last Name"
          ></input>
          {errors.lastname && errors.lastname.type === "required" && (
            <span className="errorMsg">Last Name is required</span>
          )}
          {errors.lastname && errors.lastname.type === "maxLength" && (
            <span className="errorMsg">MaxLength of the lastname is 255</span>
          )}
          <input
            className="input"
            name="email"
            autoComplete="off"
            ref={register({
              required: true,
              minLength: 5,
              maxLength: 255,
            })}
            placeholder="Email"
          ></input>
          {/* errors will return when field validation fails  */}
          {errors.email && errors.email.type === "required" && (
            <span className="errorMsg">Email is required</span>
          )}
          {errors.email && errors.email.type === "minLength" && (
            <span className="errorMsg">MinLength of the email is 5</span>
          )}
          {errors.email && errors.email.type === "maxLength" && (
            <span className="errorMsg">MaxLength of the email is 255</span>
          )}
          {/**handling email errors coming from Firebase */}
          <p className="errorMsg">{emailError ? emailError : ""}</p>

          {/*errors.email && errors.email.type === "pattern" && (<span>Email can have </span>)*/}
          <div className="password-container">
            <input
              className="input"
              name="password"
              autoComplete="off"
              ref={register({ required: true, minLength: 5, maxLength: 255 })}
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
            ></input>
            <i className="eye" onClick={togglePasswordVisiblity}>
              {eye}
            </i>
          </div>
          {errors.password && errors.password.type === "required" && (
            <span className="errorMsg">Password is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className="errorMsg">MinLength of the password is 5</span>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <span className="errorMsg">MaxLength of the password is 255</span>
          )}
          {/**handling password errors from Firebase */}
          <p className="errorMsg">{passwordError ? passwordError : ""}</p>
        </div>
        <div className="btn-container">
          <div className="toggle-container">
            <Switch
              className="register-toggle"
              onClick={toggler}
              onChange={getUserType}
            />
            {toggle ? <span>Educator</span> : <span>Learner</span>}
          </div>
          <input className="btn" type="submit" value="REGISTER" />
        </div>
        <div className="login-container">
          <p>Returning user?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
