import React from "react";

function ImagePopup(props) {

  return(
    <div className={`popup popup-${props.name} popup_opacity ${props.card ? "popup_opened" : ""}`}>
      
      <div className="popup__container popup__container_image">
        
        <button className="popup__button-close popup__button-close_position_top" name="button" type="button" aria-label="Закрыть" onClick={props.onClose}>
        </button>
        
        <figure className="popup__content">
          <img className="popup__image" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} />
          <figcaption className="popup__caption">{props.card ? props.card.name : ""}</figcaption>
          </figure>
      </div>
    </div>
  )
};

export default ImagePopup;