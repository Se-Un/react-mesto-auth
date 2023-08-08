import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner._id === currentUser._id;
  const isLiked = props.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button ${isLiked && 'element__button_active'}`
  );
  function handleClick() {
    props.onCardClick(props);
  };
  function handleLike() {
    props.onCardLike(props);
  }
  function handleDelete() {
    props.onDelete(props);
  }

  return(
    <article className="element">
      
      { isOwn && <button className="element__delete" name="delete-btn" type="button" aria-label="Удалить" onClick={handleDelete}></button>}
      
        <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
        
        <div className="element__content">
          
            <h2 className="element__title">{props.name}</h2>
              <div className="element__likeBtn">
                <button className={cardLikeButtonClassName} name="like-btn" type="button" aria-label="Нравится" onClick={handleLike}>
                </button>
                <div className="element__counter-like">{props.likes.length}</div>
              </div>
        </div>
    
    </article>
  )
}

export default Card;