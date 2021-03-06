import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  //hook
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        //we have new value based on the name, if we change the title we set title to value & same for content
        [name]: value
      };
    });
  };

  const handleClick = (event) => {
    //prevent default state of the event
    event.preventDefault();
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form>
        <div className="form-group">
          <input name="email" autoComplete="off"
            className="form-control"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
          >
          </input>
        </div>
        <div className="form-group">
          <input name="password" autoComplete="off"
            className="form-control" 
            placeholder="password"
            value={input.password}
            onChange={handleChange}
          ></input>
        </div>
        <button className="btn btn-lg btn-info" onClick={handleClick}>Login</button>
      </form>
    </div>

  );
}