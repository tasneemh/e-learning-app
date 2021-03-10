import React, { useState } from "react";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Drawer, Button } from "antd";
import "./newRegister.css";
import 'antd/dist/antd.css';

export default function Register() {
  const eye = <FontAwesomeIcon icon={faEye} />;
  const { register, handleSubmit, errors } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [toggle, setToggle] = useState(false);
  const toggler = () => toggle ? setToggle(false) : setToggle(true);

  const [userType, setUserType] = useState("learner");
  const getUserType = () => {
    toggle ? setUserType("learner") : setUserType("educator");
  };

  const [drawer, setDrawer] = useState(false);

  const showDrawer = () => {
    setDrawer({
      visible: true,
    });
  };

  const onClose = () => {
    setDrawer({
      visible: false,
    });
  };
  const history = useHistory();

  const onSubmit = (data) => {
    data["usertype"] = userType;
    axios.post(`http://localhost:9001/savenewuser`, { data })
      .then(response => {
        const user = response.data.user;
        const userType = response.data.user.usertype;
        if (userType === "learner") {
          console.log("inside learner");
          history.push({ pathname: "/learner", state: { user } });
        } else if (userType === "educator") {
          console.log("inside educator");
          history.push({ pathname: "/educator", state: { user } });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Drawer
      title="Register"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={showDrawer}
      //getContainer={false}
      width={500}
    >
      <div className="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>
          <div className="login-container">
            <input className="input" name="firstname" autoComplete="off"
              ref={register({ required: true, maxLength: 255, /*pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i*/ })}
              placeholder="First Name"
            >
            </input>
            {errors.firstname && errors.firstname.type === "required" && (<span>Firstname is required</span>)}
            {errors.firstname && errors.firstname.type === "minLength" && (<span>MinLength of the firstname is 5</span>)}
            {errors.firstname && errors.firstname.type === "maxLength" && (<span>MaxLength of the firstname is 255</span>)}
            <input className="input" name="lastname" autoComplete="off"
              ref={register({ required: true, maxLength: 255, /*pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i*/ })}
              placeholder="Last Name"
            >
            </input>
            {errors.lastname && errors.lastname.type === "required" && (<span>Lastname is required</span>)}
            {errors.lastname && errors.lastname.type === "maxLength" && (<span>MaxLength of the lastname is 255</span>)}
            <input className="input" name="email" autoComplete="off"
              ref={register({ required: true, minLength: 5, maxLength: 255, /*pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i*/ })}
              placeholder="Email"
            >
            </input>
            {/* errors will return when field validation fails  */}
            {errors.email && errors.email.type === "required" && (<span className="errorMsg">Email is required</span>)}
            {errors.email && errors.email.type === "minLength" && (<span className="errorMsg">MinLength of the email is 5</span>)}
            {errors.email && errors.email.type === "maxLength" && (<span className="errorMsg">MaxLength of the email is 255</span>)}
            {/*errors.email && errors.email.type === "pattern" && (<span>Email can have </span>)*/}

            <input className="input" name="password" autoComplete="off"
              ref={register({ required: true, minLength: 5, maxLength: 255 })}
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
            >
            </input>
            <i onClick={togglePasswordVisiblity}>{eye}</i>

            {errors.password && errors.password.type === "required" && (<span className="errorMsg">Password is required</span>)}
            {errors.password && errors.password.type === "minLength" && (<span className="errorMsg">MinLength of the password is 5</span>)}
            {errors.password && errors.password.type === "maxLength" && (<span className="errorMsg">MaxLength of the password is 255</span>)}
          </div>
          <div>
            <Switch onClick={toggler} onChange={getUserType} />
            {toggle ? <span>Educator</span> : <span>Learner</span>}
            <input className="btnContainer button" type="submit" value="Register" />
          </div>
          <p>Returning user?</p>
          <Link to="/login">Login</Link>
        </form>
      </div>
    </Drawer>

  );
}