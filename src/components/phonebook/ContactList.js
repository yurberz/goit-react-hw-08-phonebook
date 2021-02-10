import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import contactsActions from "../../redux/contacts/contactsActions";
import contactsOperations from "../../redux/contacts/contactsOperations";
import contactsSelectors from "../../redux/contacts/contactsSelectors";

const Div = styled.div`
  .contactList__item {
    width: 400px;
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    background-color: white;
    border-radius: 4px;
    color: black;
    font-size: 19px;
    font-weight: 500;

    p {
      margin: 0;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  button {
    padding: 5px, 3px;
    border-radius: 4px;
    color: #fff;
    background-color: #0095f6;
    font-weight: 500;
    font-size: 12px;
  }

  .itemFade-enter {
    opacity: 0;
    transform: translateX(200%);
  }
  .itemFade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 250ms linear;
  }
  .itemFade-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .itemFade-exit-active {
    opacity: 0;
    transform: translateX(-200%);
    transition: all 250ms linear;
  }
`;

const ContactList = ({ contacts, value, onDeleteContact, onChange }) => {
  const onHandleDelete = (evt) => {
    const { id } = evt.currentTarget;

    onDeleteContact(id);

    if (
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      ).length < 2
    ) {
      onChange("");
    }
  };

  return (
    <Div>
      <TransitionGroup component="ul">
        {contacts.map(({ id, name, number }) => (
          <CSSTransition key={id} timeout={250} classNames="itemFade">
            <li className="contactList__item">
              <p>
                {name}: {number}
              </p>
              <button type="button" id={id} onClick={onHandleDelete}>
                Delete
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Div>
  );
};

const mSTP = (state) => {
  return {
    contacts: contactsSelectors.getVisibleContacts(state),
    value: contactsSelectors.getFilter(state),
  };
};

const mDTP = {
  onDeleteContact: contactsOperations.delContact,
  onChange: contactsActions.changeFilter,
};

export default connect(mSTP, mDTP)(ContactList);
