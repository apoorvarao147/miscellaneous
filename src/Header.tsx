//@ts-nocheck
import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const disableButton = () => {
    setButtonDisabled(true);
  };

  const enableButton = () => {
    setButtonDisabled(false);
  };

  return (
    <div className="header">
      <Link to={"/"}>
        <button 
          className={isButtonDisabled ? "enabledButton" : "disabledButton"}
          onClick={disableButton}
          >Hangman Game</button>
      </Link>

      <Link to={"/todo"}>
        <button 
          className={!isButtonDisabled ? "enabledButton" : "disabledButton"}
          onClick={enableButton}
        >To Do App</button>
      </Link>
    </div>
  );
};

export default Header;
