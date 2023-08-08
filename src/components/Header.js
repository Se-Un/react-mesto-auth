import React from "react";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={props.src} alt={props.alt} />
    </header>
  )
}
export default Header