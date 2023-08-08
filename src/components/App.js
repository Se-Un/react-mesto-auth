// импорт 
import React from 'react';
import api from '../utils/api';
import Header from "./Header";
import logo from '../images/logo/logo.svg';
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
// функция App.js
function App() {
  // переменные состояния для открытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopup, setIsConfirmPopup ] = React.useState(false); 
  // переменная состояния для открытия попапа увеличеной картинки
  const [selectedCard, setSelectedCard] = React.useState(null);
  // переменная состояния для получения данных о пользователе
  const [ currentUser, setCurrentUser ] = React.useState({});
  //  переменная состояния для получения данных карточек
  const [ cards, setCards ] = React.useState([]);
  // функция обработчик открытия попапа profile
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  // функция обработчик открытия попапа element
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  // функция обработчик открытия попапа avatar
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  // функция обработчик открытия попапа scale-picture
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  // функция обработчик открытия формы подтверждения
  const handleConfirmClick = () => {
    setIsConfirmPopup(true);
  }
  // функция обработчик закрытия попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsConfirmPopup(false);
  };
  // функция обработчик кнопки лайка
  const handleCardLike = (card) => {
    // переменная для хранения данных о лайке
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    // 
   if(!isLiked) {
    api.likeState(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
   }
   else {
    api.dislikeState(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
   }
  };
  // функция обработчик удаления карточки
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c._id === card._id ? "" : newCard));
    })
    .catch(err => console.log(err));
  };
  // функция обработчик отправки данных пользователя на сервер
  const handleUpdateUser = (data) => {
    api.patchDataUser(data)
    .then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  };
  // функция обработчик для изменения аватара пользователя
  const handleUpdateAvatar = (data) => {
    api.changeAvatar(data)
    .then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  };
  // функция обработчик для добавления карточки
  const handleAddPlaceSubmit = (data) => {
    api.postDataCards(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }
  // получение данных пользователя и карточек с сервера при помощи useEffect
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      }) 
      .catch(err => console.log(err));
  }, [])
  // вернуть JSX код с разметкой
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header src={logo} alt="логотип отошёл на 5 минут" />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onPictureClick={handleCardClick}
          onConfirmPopup={handleConfirmClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        /> 
        
        <Footer text="&#169; 2020 Mesto Russia" />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} 
          />
        
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
         />
        
        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        />
        
        <PopupWithForm 
          name="deleteCard" 
          title="Вы уверены?" 
          buttonSubmitText="Да"
          isOpen={isConfirmPopup}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          />
          
          <ImagePopup 
            name="scale-picture" 
            card={selectedCard} 
            onClose={closeAllPopups} />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
