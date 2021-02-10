import { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import authOperations from "../redux/auth/authOperations";

const Div = styled.div`
  display: flex;
  align-items: center;
  .img {
    margin-right: 30px;
    width: 480px;
    height: 480px;
    background-image: url("https://img.pngio.com/address-book-png-image-royalty-free-stock-png-images-for-your-design-phone-book-png-512_512.png");
    background-position: center;
    background-repeat: no-repeat;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 700;
  }

  .formWrapper {
    padding: 20px;
    width: 400px;
    text-align: center;
    background-color: white;
    border: 1px solid black;
    border-radius: 4px;

    h1 {
      margin: 0;
      margin-bottom: 30px;
      font-size: 42px;
      font-style: italic;
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
    width: 400px;
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

  .animationImg-appear {
    transform: translateX(-300%);
  }
  .animationImg-appear-active {
    transform: translateX(0);
    transition: transform 500ms linear;
  }

  .animationForm-appear {
    transform: translateX(300%);
  }
  .animationForm-appear-active {
    transform: translateX(0);
    transition: transform 500ms linear;
  }
`;

class HomePage extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (evt) => {
    const { name, value } = evt.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.props.onLogin({ ...this.state });
    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Div>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="animationImg"
          unmountOnExit
        >
          <div className="img"></div>
        </CSSTransition>

        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="animationForm"
          unmountOnExit
        >
          <div>
            <div className="formWrapper">
              <h1>Phonebook</h1>
              <form onSubmit={this.handleSubmit}>
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

                <button type="submit">Log In</button>
              </form>
            </div>

            <div className="regWrapper">
              <p>
                Don't have an account?
                <Link className="link" to="/register">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </CSSTransition>
      </Div>
    );
  }
}

const mDTP = {
  onLogin: authOperations.logIn,
};

export default connect(null, mDTP)(HomePage);
