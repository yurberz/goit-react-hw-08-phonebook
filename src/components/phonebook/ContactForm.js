import { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { Empty, ByUsed } from "./Notifications";
import styled from "styled-components";
import contactsOperations from "../../redux/contacts/contactsOperations";
import contactsSelectors from "../../redux/contacts/contactsSelectors";

const Div = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  width: 400px;
  text-align: center;
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;

  h1 {
    margin-bottom: 30px;
    font-size: 42px;
    font-style: italic;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 700;
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

  .ntf-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .ntf-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 250ms linear;
  }
  .ntf-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .ntf-exit-active {
    opacity: 0;
    transform: translateX(100%);
    transition: all 250ms linear;
  }
`;

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
    showEmptyNtf: false,
    showByUsedNtf: false,
  };

  handleChange = (evt) => {
    const { name, value } = evt.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { name, number } = this.state;

    if (
      this.props.contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      ) ||
      this.props.contacts.find((contact) => contact.number === number)
    ) {
      this.setState((state) => ({ showByUsedNtf: !state.showByUsedNtf }));
    } else if (name.trim() === "" || number.trim() === "") {
      this.setState((state) => ({ showEmptyNtf: !state.showEmptyNtf }));
    } else {
      this.props.onSubmit({ name, number });
    }

    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number, showByUsedNtf, showEmptyNtf } = this.state;

    return (
      <Div>
        <h1>Phonebook</h1>
        <form id="contact" onSubmit={this.handleSubmit}>
          <label className="label">
            <input
              className="input"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Type to name"
            />
          </label>

          <label className="label">
            <input
              className="input"
              type="text"
              name="number"
              value={number}
              onChange={this.handleChange}
              placeholder="Type to phone(e.g. 111-11-11)"
            />
          </label>

          <button type="submit" className="submitBtn">
            Add contact
          </button>
        </form>

        <CSSTransition
          in={showEmptyNtf}
          onEntered={() => this.setState({ showEmptyNtf: false })}
          timeout={2000}
          classNames="ntf"
          unmountOnExit
        >
          <Empty />
        </CSSTransition>

        <CSSTransition
          in={showByUsedNtf}
          onEntered={() => this.setState({ showByUsedNtf: false })}
          timeout={2000}
          classNames="ntf"
          unmountOnExit
        >
          <ByUsed />
        </CSSTransition>
      </Div>
    );
  }
}

const mSTP = (state) => {
  return {
    contacts: contactsSelectors.getContacts(state),
  };
};

const mDTP = {
  onSubmit: contactsOperations.addContact,
};

export default connect(mSTP, mDTP)(ContactForm);
