//@ts-nocheck
import styled from "styled-components";
import { useState } from "react";

const H2 = styled.h2`
  margin: 1rem 2rem;
  font-size: 2rem;
  color: #ff2968;
`;
const Input = styled.input`
  width: 350px;
  height: 40px;
  margin: 0 1rem 0 2rem;
  padding: 0.5rem;
  border: 1.5px solid rgb(230, 230, 230);
  border-radius: 5px;
  font-size: 1rem;
`;
const Button = styled.button`
  width: 120px;
  height: 58px;
  color: white;
  font-size: 1.2rem;
  background-color: rgb(109, 165, 230);
  border: none;
  border-radius: 5px;
  margin: 0 1rem;
`;

const Wrapper = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    width: 370px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #ccc;
    gap: 2rem;
    font-size: 1.2rem;
    margin-left: 2rem;
    position: relative;
  }
  button {
    position: absolute;
    right: 5px;
    background-color: rgb(216, 83, 78);
    border: none;
    border-radius: 2px;
    color: white;
    padding: 6px 8px;
    font-size: 1.2rem;
  }
`;

const ExtendedButton = styled(Button)`
  width: 230px;
  height: 40px;
  margin: 2rem 0.9rem 1rem 2rem;
  background-color: red;
`;
const SaveButton = styled(Button)`
  width: 100px;
  height: 40px;
  background-color: green;
`;
const ViewListsButton = styled(Button)`
  width: 300px;
  height: 55px;
  margin: 1rem 0 0 2rem;
  background-color: rgb(246, 176, 18);
`;
const WrapperList = styled.div`
  width: 30%;
  border-bottom: 1px solid #ccc;
  margin: 0 0 1rem 2rem;
  padding-bottom: 1rem;

  ul {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin: 1rem;
  }
  li {
    font-size: 1.2rem;
  }

  button {
    width: 100px;
    height: 30px;
    border: none;
    color: white;
    border-radius: 5px;
    background-color: red;
    font-size: 1rem;
  }
`;

const ToDoApp = () => {
  const [state, setState] = useState({
    items: [],
    text: "",
  });

  const [savedLists, setSavedLists] = useState([]);

  const handleTextChange = (e) => {
    setState({
      ...state,
      text: e.target.value,
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    let newItem = {
      id: Date.now(),
      text: state.text,
      done: false,
    };

    setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: "",
    }));
  };

  const deleteItem = (id) => {
    let newItems = state.items.filter((item) => item.id !== id);
    setState({
      items: newItems,
    });
  };

  const markItemCompleted = (id) => {
    let updatedItems = state.items.map((item) => {
      if (item.id === id) item.done = !item.done;
      console.log(item);
      return item;
    });
    setState({
      items: [].concat(updatedItems),
    });
  };

  const deleteSelected = () => {
    let notSelectedItems = state.items.filter((item) => item.done === false);
    setState({
      items: notSelectedItems,
    });
  };

  const saveList = () => {
    setSavedLists([...savedLists, state.items]);
    setState({
      items: [],
      text: "",
    });
  };

  return (
    <>
      <H2>TO DO LIST</H2>
      <div>
        <Input
          type="text"
          placeholder="Add a to do..."
          onChange={handleTextChange}
          value={state.text}
        />
        <Button onClick={handleAddItem} disabled={!state.text}>
          Add #{state.items.length + 1}
        </Button>
      </div>

      {state.items.map((item) => (
        <div>
          <Wrapper>
            <ul key={item.id}>
              <li className={item.done ? "cut" : ""}>
                <input
                  type="checkbox"
                  onChange={() => markItemCompleted(item.id)}
                  value={item.done}
                />
                {item.text}
                <button onClick={() => deleteItem(item.id)}>x</button>
              </li>
            </ul>
          </Wrapper>
        </div>
      ))}
      <div>
        {state.items.length > 0 ? (
          <>
            <ExtendedButton onClick={deleteSelected}>
              Delete Selected items
            </ExtendedButton>
            <SaveButton onClick={saveList}>Save List</SaveButton>
          </>
        ) : (
          ""
        )}
      </div>
      <div>
        <Lists savedLists={savedLists} setSavedLists={setSavedLists} />
      </div>
    </>
  );
};

const Lists = ({ savedLists, setSavedLists }) => {
  const [view, setView] = useState(true);

  const viewLists = () => {
    setView(!view);
  };
  const deleteList = (index) => {
    let newList = [...savedLists];
    newList.splice(index, 1);
    setSavedLists(newList);
  };

  return (
    <>
      <ViewListsButton onClick={viewLists}>
        {view ? "Hide" : "View Saved"} Lists
      </ViewListsButton>
      {view &&
        savedLists.map((list, index) => (
          <div>
            <WrapperList>
              <ul key={index}>
                {list.map((item) => (
                  <li>{item.text}</li>
                ))}
              </ul>
              <button onClick={() => deleteList(index)}>Delete List</button>
            </WrapperList>
          </div>
        ))}
    </>
  );
};

export { ToDoApp };
