import axios from "axios";
import contactsActions from "./contactsActions";

const getContacts = () => async (dispatch) => {
  dispatch(contactsActions.getContactsRequest());

  try {
    const { data } = await axios.get("/contacts");

    dispatch(contactsActions.getContactsSuccess(data));
  } catch (error) {
    dispatch(contactsActions.getContactsError(error.message));
  }
};

const addContact = (contact) => async (dispatch) => {
  dispatch(contactsActions.addContactRequest());

  try {
    const { data } = await axios.post("/contacts", contact);

    dispatch(contactsActions.addContactSuccess(data));
  } catch (error) {
    dispatch(contactsActions.addContactError(error.message));
  }
};

const delContact = (id) => async (dispatch) => {
  dispatch(contactsActions.delContactRequest());

  try {
    await axios.delete(`/contacts/${id}`);

    dispatch(contactsActions.delContactSuccess(id));
  } catch (error) {
    dispatch(contactsActions.delContactError(error.message));
  }
};

export default { getContacts, addContact, delContact };
