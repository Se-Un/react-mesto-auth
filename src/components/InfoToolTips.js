// импорты
import React from 'react';
import imgSucces from '../images/logo/success.svg';
import imgError from '../images/logo/error.svg';

function InfoToolTips(props) {

  const signResult = {
    success: 'Вы успешно зарегистрировались!',
    error: 'Что-то пошло не так! Попробуйте ещё раз.'
  };

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      
      <div className="popup__container popup__container_display_flex">
        <button className='popup__button-close' onClick={props.onClose}></button>
        <img className="popup__tool-img" src={props.isSuccess ? imgSucces : imgError} alt="тут была картинка" />
        <p className="popup__tool-text">{ props.isSuccess ? signResult.success : signResult.error }</p>
      </div>
    </div>
  )
}

export default InfoToolTips;