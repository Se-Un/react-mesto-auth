// импорт
import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const imageRef = React.useRef();
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: imageRef.current.value
    })
  }
  React.useEffect(() => {
    if(props.isOpen) {
      imageRef.current.value = "";
    }
  }, [props.isOpen])
  return (
    <PopupWithForm 
          name="changeAvatar" 
          title="Обновить аватар" 
          buttonSubmitText="Сохранить" 
          isOpen={props.isOpen} 
          onClose={props.onClose}
          onSubmit={handleSubmit}>
            
          <input 
          className="popup__input popup__input_avatar_margin" 
          id="avatar-input" 
          name="avatar" 
          type="url" 
          placeholder="Ссылка на изображение" 
          required
          ref={imageRef} />
          
          <label className="popup__input-error avatar-input-error" htmlFor="avatar-input"></label>
          
        </PopupWithForm>
  )
}
export default EditAvatarPopup;