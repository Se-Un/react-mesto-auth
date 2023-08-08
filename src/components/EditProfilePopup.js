// импорт
import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [ profileName, setProfileName ] = React.useState("");
  const [ profileDescription, setProfileDescription ] = React.useState("");

  function changeProfileName(event) {
    setProfileName(event.target.value);
  }

  function changeProfileDescription(event) {
    setProfileDescription(event.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: profileName,
      about: profileDescription
    })
  }

  React.useEffect(() => {
    if(props.isOpen) {
      setProfileName(currentUser.name);
      setProfileDescription(currentUser.about);
    }
    
  }, [props.isOpen, currentUser])

  return (
    <PopupWithForm 
          name="profile" 
          title="Редактировать профиль" 
          buttonSubmitText="Сохранить" 
          isOpen={props.isOpen} 
          onClose={props.onClose}
          onSubmit={handleSubmit}>
            
          <input 
          className="popup__input" 
          id="name" name="name" type="text" 
          placeholder="Введите Ваше имя" 
          minLength="2" 
          maxLength="40" 
          required 
          autoComplete="on"
          value={profileName}
          onChange={changeProfileName} />
          
          <label className="popup__input-error name-error" htmlFor="name"></label>
          
          <input 
          className="popup__input" 
          id="about" 
          name="about" 
          type="text" 
          placeholder="Укажите Вашу деятельность" 
          minLength="2" 
          maxLength="200" 
          required
          value={profileDescription}
          onChange={changeProfileDescription} />
          
          <label className="popup__input-error about-error" htmlFor="about"></label>
          
        </PopupWithForm>
  )
}
export default EditProfilePopup;