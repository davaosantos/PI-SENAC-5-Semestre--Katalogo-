import "./header.css";
import "./ResponsiveHeader.css";
import Modal from "react-modal";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Header = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header>
      <div className="wraper">
        <div className="logo">
          <h1>KataLogo</h1>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink className="btnLogin" to="/login">LOGIN</NavLink>
            </li>
          </ul>
        
        </nav>
      </div>
    </header>
  );
};
