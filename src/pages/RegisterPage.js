import { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import authOperations from "../redux/auth/authOperations";

const Div = styled.div`
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 700;
  }

  .formWrapper {
    padding: 20px;
    width: 450px;
    text-align: center;
    background-color: white;
    border: 1px solid black;
    border-radius: 4px;

    h1 {
      margin: 0;
      margin-bottom: 15px;
      font-size: 42px;
      font-style: italic;
    }

    h2 {
      margin: 0;
      color: #8e8e8e;
      margin-bottom: 5px;
    }

    p {
      margin: 0;
      margin-bottom: 20px;
      color: #8e8e8e;
      font-weight: 500;
      margin-bottom: 30px;
    }

    input {
      height: 40px;
      padding: 10px;
      background-color: #eae8e8;
      border: 0;
      border-radius: 2px;
      font-weight: 500;
      font-size: 16px;
    }

    button {
      width: 250px;
      height: 35px;
      border-radius: 4px;
      color: #fff;
      background-color: #0095f6;
      font-weight: 700;
      font-size: 14px;
    }
  }

  .regWrapper {
    width: 450px;
    height: 70px;
    padding: 10px;
    text-align: center;
    background-color: white;
    border: 1px solid black;
    border-radius: 4px;
    margin-top: 10px;

    .link {
      margin-left: 5px;
      text-decoration: none;
      font-weight: 500;
    }
  }
`;

class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleChange = (evt) => {
    const { name, value } = evt.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.props.onRegister({ ...this.state });
    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <Div>
        <div className="formWrapper">
          <h1>Phonebook</h1>
          <h2>Welcome to the Phonebook App</h2>
          <p>
            "<b>Save your contacts!</b> Don't keeped in head."
          </p>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="Name"
                required
              />
            </label>

            <label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email"
                required
              />
            </label>

            <label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
                required
              />
            </label>

            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="regWrapper">
          <p>
            Have an account?
            <Link className="link" to="/">
              Sign in
            </Link>
          </p>
        </div>
      </Div>
    );
  }
}

const mDTP = {
  onRegister: authOperations.register,
};

export default connect(null, mDTP)(RegisterForm);
