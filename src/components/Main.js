import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    
    <>
    <main className="main">

        <section className="profile">

          <div className="profile__content">

            <div className="profile__avatar" onClick={props.onEditAvatar}>
              <img className="profile__avatar-image" src={currentUser.avatar} alt="тут должно быть ваше изображение" />
            </div>

            <div className="profile__info">

              <h1 className="profile__full-name">{currentUser.name}</h1>

              <p className="profile__description">{currentUser.about}</p>

              <button className="profile__edit-button" name="edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}>
              </button>

            </div>

          </div>

          <button className="profile__add-button" name="add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}>
          </button>

        </section>

        <section className="elements">

          {props.cards.map((card) => (
            <Card
            key={card._id} 
            {... card}
            onCardClick={props.onPictureClick}
            onCardLike={props.onCardLike}
            onDelete={props.onCardDelete}
            />
          ))}
        </section>
        
      </main>

      </>
  )
}

export default Main;