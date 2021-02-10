import { createReducer, combineReducers } from "@reduxjs/toolkit";
import contactsActions from "./contactsActions";

const getContacts = (_, action) => {
  return action.payload;
};

const addContact = (state, { payload }) => {
  return [...state, payload];
};

const delContact = (state, { payload }) => {
  return state.filter((contact) => contact.id !== payload);
};

const items = createReducer([], {
  [contactsActions.getContactsSuccess]: getContacts,

  [contactsActions.addContactSuccess]: addContact,

  [contactsActions.delContactSuccess]: delContact,
});

const loading = createReducer(false, {
  [contactsActions.getContactsRequest]: () => true,
  [contactsActions.getContactsSuccess]: () => false,
  [contactsActions.getContactsError]: () => false,

  [contactsActions.addContactRequest]: () => true,
  [contactsActions.addContactSuccess]: () => false,
  [contactsActions.addContactError]: () => false,

  [contactsActions.delContactRequest]: () => true,
  [contactsActions.delContactSuccess]: () => false,
  [contactsActions.delContactError]: () => false,
});

const error = createReducer(null, {
  [contactsActions.getContactsError]: (_, { payload }) => payload,
  [contactsActions.getContactsRequest]: () => null,

  [contactsActions.addContactError]: (_, { payload }) => payload,
  [contactsActions.addContactRequest]: () => null,

  [contactsActions.delContactError]: (_, { payload }) => payload,
  [contactsActions.delContactRequest]: () => null,
});

const filter = createReducer("", {
  [contactsActions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  loading,
  error,
  filter,
});
