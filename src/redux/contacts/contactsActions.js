import { createAction } from "@reduxjs/toolkit";

const getContactsRequest = createAction("contacts/getRequest");
const getContactsSuccess = createAction("contacts/getSuccess");
const getContactsError = createAction("contacts/getError");

const addContactRequest = createAction("contact/addRequest");
const addContactSuccess = createAction("contact/addSuccess");
const addContactError = createAction("contact/addError");

const delContactRequest = createAction("contact/delRequest");
const delContactSuccess = createAction("contact/delSuccess");
const delContactError = createAction("contact/delError");

const changeFilter = createAction("contacts/changeFilter");

export default {
  addContactRequest,
  addContactSuccess,
  addContactError,
  getContactsRequest,
  getContactsSuccess,
  getContactsError,
  delContactRequest,
  delContactSuccess,
  delContactError,
  changeFilter,
};
