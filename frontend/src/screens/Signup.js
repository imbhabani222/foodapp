import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
    email: "",
    geoLocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior, if necessary

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
          email: credentials.email,
          location: credentials.geoLocation,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user. Status: " + response.status);
      }

      const json = await response.json();

      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the user.");
    }
  };

  const handelChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            name="name"
            value={credentials.name}
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            onChange={handelChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            name="email"
            value={credentials.email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handelChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            name="password"
            value={credentials.password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={handelChange}
          />
        </div>

        <div className="form-group">
          <label for="location">Address</label>
          <input
            name="geoLocation"
            value={credentials.geoLocation}
            type="text"
            className="form-control"
            id="location"
            placeholder="Location"
            onChange={handelChange}
          />
        </div>

        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to={"/login"} className="m-3 btn btn-danger">
          Already a user!
        </Link>
      </form>
    </div>
  );
};

export default Signup;
