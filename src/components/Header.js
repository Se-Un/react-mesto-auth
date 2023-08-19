import React from "react";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={props.src} alt={props.alt} />
      <div className="header__auth">
        <h2 className="header__auth-email">{props.loggedIn ? `${props.email}` : ''}</h2>
        <button className="header__auth-button" onClick={props.loggedIn ? props.signOut : props.menuLink}>
          {props.loggedIn ? "Выйти" : props.loginForm ? "Регистрация" : "Войти"}
        </button>
      </div>
    </header>
  )
}
export default Header