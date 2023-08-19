// импорт 
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTips from './InfoToolTips';
import * as auth from '../utils/auth';
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
  // переменная состояния авторизации пользователя
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ loginForm, setLoginForm ] = React.useState('');
  const [ isSuccess, setIsSuccess ] = React.useState(false);
  const [ infoToolTipsOpen, setInfoToolTipsOpen ] = React.useState(false);
  const [ userEmail, setUserEmail ] = React.useState("");
  const navigate = useNavigate();
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
    setInfoToolTipsOpen(false);
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
  };
  // получение данных пользователя и карточек с сервера при помощи useEffect
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      }) 
      .catch(err => console.log(err));
  }, []);
   // проверка токена 
   React.useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if(jwtToken) {
      auth.checkToken(jwtToken)
      .then((res) => {
        if(res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", {replace: true});
        }
      })
      .catch(err => console.log(err));
    }
  }, [navigate]);
  // функция обработчик для переключения ссылок в header
  const handleMenuLink = () => {
    loginForm ? navigate("/sign-up", {replace: true}) : navigate("/sign-in", {replace: true});
  }
  // функция обработчик регистрации пользователя
  function handleRegister(email, password) {
    auth.register(email, password)
    .then(() => {
      setInfoToolTipsOpen(true);
      setIsSuccess(true);
      navigate('/sign-in', {replace: true});
    })
    .catch(() => {
      setInfoToolTipsOpen(true);
      setIsSuccess(false);
    })
  }
  // функция обработчик входа в аккаунт пользователя
  function handleLogin(email, password) {
    auth.login(email, password)
    .then((res) => {
      setUserEmail(email);
      setLoggedIn(true);
      localStorage.setItem("jwt", res.token);
      navigate("/", {replace: true})
    })
    .catch((err) => {
      console.log(err);
      setInfoToolTipsOpen(true);
      setIsSuccess(false);
    })
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLoggedIn(false);
    navigate("sign-in", {replace: true});
  }
  
  // вернуть JSX код с разметкой
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header src={logo} 
          alt="логотип отошёл на 5 минут" 
          loginForm={loginForm} 
          loggedIn={loggedIn}
          menuLink={handleMenuLink}
          email={userEmail}
          signOut={signOut} 
        />
        
        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onPictureClick={handleCardClick}
            onConfirmPopup={handleConfirmClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} 
            />} 
          />
          <Route path="/sign-up" element={<Register setLoginForm={setLoginForm} onSignUp={handleRegister} />} />
          <Route path="/sign-in" element={<Login setLoginForm={setLoginForm} onSignIn={handleLogin} />} />
        </Routes>
        
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
          <InfoToolTips
            isOpen={infoToolTipsOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
           />  
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
