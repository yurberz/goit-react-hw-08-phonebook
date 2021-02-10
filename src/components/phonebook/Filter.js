import { connect } from "react-redux";
import styled from "styled-components";
import contactsActions from "../../redux/contacts/contactsActions";
import contactsSelectors from "../../redux/contacts/contactsSelectors";

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  color: black;
  font-size: 22px;
  font-weight: 700;

  .input {
    margin-bottom: 20px;
    height: 40px;
    padding: 10px;
    background-color: #eae8e8;
    border: 0;
    border-radius: 2px;
    font-weight: 500;
    font-size: 16px;
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

const Filter = ({ value, onChange }) => {
  return (
    <Label>
      <input
        className="input"
        type="text"
        value={value}
        onChange={(evt) => onChange(evt.currentTarget.value)}
        placeholder="Find contacts by name"
      />
    </Label>
  );
};

const mSTP = (state) => ({
  value: contactsSelectors.getFilter(state),
});

const mDTP = {
  onChange: contactsActions.changeFilter,
};

export default connect(mSTP, mDTP)(Filter);
