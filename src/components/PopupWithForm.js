import React from 'react';

function PopupWithForm(props) {
  return(
    <div className={`popup popup-${props.name} ${
      props.isOpen ? "popup_opened" : ""
    }`}>

      <div className="popup__container">

        <button className="popup__button-close" name="button-close" type="button" onClick={props.onClose} aria-label="Закрыть"></button>

        <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit}>

          <h2 className="popup__title">{props.title}</h2>

          {props.children}

          <button className="popup__submit submit-profile" name="submit" type="submit">{props.buttonSubmitText}</button>

        </form>

      </div>

    </div>
  )
}
export default PopupWithForm;