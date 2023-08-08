// импорт
import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [ title, setTitle ] = React.useState('');
  const [ link, setLink ] = React.useState('');

  function changeCardTitle(evt) {
    setTitle(evt.target.value);
  }

  function changeCardLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: title,
      link: link
    })
  }

  React.useEffect(() => {
    if(props.isOpen) {
      setTitle('');
      setLink('');
    }
  }, [props.isOpen])

  return (
    <PopupWithForm 
          name="element" 
          title="Новое место" 
          buttonSubmitText="Сохранить" 
          isOpen={props.isOpen} 
          onClose={props.onClose}
          onSubmit={handleSubmit}
          >
            
          <input 
          className="popup__input" 
          id="title-input" name="name" 
          type="text" 
          placeholder="Название" 
          minLength="2"
          maxLength="30" 
          required
          value={title}
          onChange={changeCardTitle}
          />
          
          <label className="popup__input-error title-input-error" htmlFor="title-input"></label>
          
          <input  
          className="popup__input" 
          id="link-input" name="link" 
          type="url" 
          placeholder="Ссылка на изображение" 
          required
          value={link}
          onChange={changeCardLink}
          />
          
          <label className="popup__input-error link-input-error" htmlFor="link-input"></label>
          
        </PopupWithForm>
  )
}
export default AddPlacePopup;