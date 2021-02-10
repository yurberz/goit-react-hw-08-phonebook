import { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import styled from "styled-components";
import ContactForm from "../components/phonebook/ContactForm";
import ContactList from "../components/phonebook/ContactList";
import Filter from "../components/phonebook/Filter";
import UserMenu from "../components/phonebook/UserMenu";
import contactsOperations from "../redux/contacts/contactsOperations";
import contactsSelectors from "../redux/contacts/contactsSelectors";
import authSelectors from "../redux/auth/authSelectors";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .loading {
    position: absolute;
    left: 10%;
    top: 10%;
    color: orangered;
    font-size: 21px;
  }
  .error {
    color: salmon;
    font-size: 18px;
    font-weight: 700;
    font-style: oblique;
  }

  .h2Title {
    margin: 0;
    margin-bottom: 30px;
    font-size: 32px;
    color: black;
  }

  .filterScale-enter {
    opacity: 0;
    transform: scale(0.1);
  }
  .filterScale-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all 250ms linear;
  }
  .filterScale-exit {
    opacity: 1;
    transform: scale(1);
  }
  .filterScale-exit-active {
    opacity: 0;
    transform: scale(0.1);
    transition: all 250ms linear;
  }
`;

class ContactsPage extends Component {
  componentDidMount() {
    this.props.onGetContacts();
  }

  render() {
    return (
      <>
        <UserMenu />

        <Div>
          {this.props.isLoadingContacts && (
            <p className="loading">Loading...</p>
          )}

          <ContactForm />

          <h2 className="h2Title">Contacts</h2>

          <CSSTransition
            in={this.props.contacts.length > 1}
            classNames="filterScale"
            timeout={250}
            unmountOnExit
          >
            <Filter />
          </CSSTransition>

          {!this.props.isError && <ContactList />}
          {!!this.props.contacts.length && this.props.isError && (
            <p className="error">ERR! Something went wrong...</p>
          )}

          {!this.props.isLoadingContacts && !this.props.contacts.length && (
            <p className="text">Your phonebook is empty. Please add contact.</p>
          )}
        </Div>
      </>
    );
  }
}

const mSTP = (state) => {
  return {
    contacts: contactsSelectors.getContacts(state),
    isLoadingContacts: contactsSelectors.getLoading(state),
    isError: contactsSelectors.getError(state),
    isAuth: authSelectors.isAuth(state),
  };
};

const mDTP = {
  onGetContacts: contactsOperations.getContacts,
};

export default connect(mSTP, mDTP)(ContactsPage);
