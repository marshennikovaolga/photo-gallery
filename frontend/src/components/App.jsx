import api from '../utils/api.js'
import { registUser } from '../utils/auth.js'
import { authUser } from '../utils/auth.js'
import { getContent } from '../utils/auth.js'
import { Navigate, useNavigate } from 'react-router-dom'
import CurrentUserContext from '../contexts/CurrentUserContext.js'

import AuthHeader from './AuthHeader/AuthHeader.jsx'
import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx'
import Footer from './Footer/Footer.jsx'

import Login from './Login/Login.jsx'
import Register from './Register/Register.jsx'

import Loading from './Loading/Loading.jsx'

import { useCallback, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx'

import PopupWithForm from './PopupWithForm/PopupWithForm.jsx'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.jsx'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.jsx'
import ImagePopup from './ImagePopup/ImagePopup.jsx'
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx'

function App() {

  const navigate = useNavigate();

  // authorization states
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrationUserData, setRegistrationUserData] = useState({ _id: '', email: '' })
  const [loginUserData, setLoginUserData] = useState({ _id: '', email: '' })

  // context states
  const [currentUser, setCurrentUser] = useState({})

  // header state
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // popup states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  const [isDeleteCardId, seIsDeleteCardId] = useState('')

  const [isPublished, setIsPublished] = useState(false)

  // card states
  const [cards, setCards] = useState([])

  // закрытие попапов
  const setStatesForPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopupOpen(false)
    setDeleteOpen(false)
    setIsTooltipOpen(false)
  }, []);

  const closeByEscape = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setStatesForPopups()
      document.removeEventListener('keydown', closeByEscape)
    }
  }, [setStatesForPopups])

  const closeAllPopups = useCallback(() => {
    setStatesForPopups()
    document.removeEventListener('keydown', closeByEscape)
  }, [setStatesForPopups, closeByEscape])


  function setEventListenerForDocument() {
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_open')) {
        setStatesForPopups();
        document.removeEventListener('click', setStatesForPopups);
      }
    });
  }

  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      getContent(jwt)
        .then((data) => {
          const userData = {
            _id: data._id,
            email: data.email
          };
          setLoginUserData(userData);
          toLogin();
          navigate('react-mesto-auth', { replace: true });
        })
        .catch((err) => {
          console.log(`ошибка при проверке токена: ${err}`);
        })
        .finally(() => {
          setIsLoading();
        });
    }
  }, [navigate]);

  // авторизация при обновлении страницы
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt);
    }
  }, [checkToken]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([api.getUserInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([resDataUser, resDataCard]) => {
          setCurrentUser(resDataUser);
          setCards(resDataCard);
        })
        .catch(err => console.log(`Ошибка при загрузке данных пользователя или карточек: ${err}`))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  function toLogin() {
    setLoggedIn(true);
  }

  function handleRegistration(data) {
    const { email, password } = data;

    //registration
    registUser(email, password)
      .then((res) => {
        if (res) {
          setLoginUserData({ _id: '', email: '' });
          localStorage.removeItem('jwt');
          setIsRegistrationSuccess(true);
          setRegistrationUserData({ _id: res._id, email });
          openTooltip();
          const timeoutId = setTimeout(() => {
            navigate('sign-in', { replace: false });
            closeAllPopups();
          }, 1300);
          return timeoutId;
        }
      })
      .catch((err) => {
        console.log(`ошибка регистрации: ${err}`);
        openTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAuthorization(data) {
    const { email, password } = data;

    authUser(email, password)
      .then((jwt) => {
        if (jwt) {
          localStorage.setItem('jwt', jwt);
          const token = checkToken();
          if (token) {
            toLogin();
            setLoginUserData({ _id: token._id, email });
            openTooltip();
            const timeoutId = setTimeout(() => {
              navigate('react-mesto-auth', { replace: false });
              closeAllPopups();
            }, 1300);
            return timeoutId;
          }
        }
      })
      .catch((err) => {
        console.log(`ошибка авторизации: ${err}`);
        setIsRegistrationSuccess(false);
        openTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // sign out
  function logOut() {
    localStorage.removeItem('jwt');
  }

  // opened popup
  function openTooltip() {
    setIsTooltipOpen(true)
    setEventListenerForDocument()
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListenerForDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleDeletePopupClick(cardId) {
    seIsDeleteCardId(cardId)
    setDeleteOpen(true)
    setEventListenerForDocument()
  }

  // удаление карточки
  function handleCardDelete(evt) {
    evt.preventDefault()
    setIsPublished(true)
    api.deleteCard(isDeleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== isDeleteCardId
        }))
        closeAllPopups()
        setIsPublished(false)
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
      .finally(() => setIsPublished(false))
  }

  // обновление информации о пользователе
  function handleUpdateUser(dataUser, reset) {
    setIsPublished(true)
    api.editProfileInfo(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsPublished(false)
      })
      .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
      .finally(() => setIsPublished(false))
  }

  // обновление аватара
  function handleUpdateAvatar(dataUser, reset) {
    setIsPublished(true)
    api.editAvatar(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsPublished(false)
      })
      .catch(err => console.log(`Ошибка при обновлении аватара: ${err}`))
      .finally(() => setIsPublished(false))
  }

  // добавление карточки
  function handleUpdateCards(dataCard, reset) {
    setIsPublished(true)
    api.addNewCard(dataCard, localStorage.jwt)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
        reset()
        setIsPublished(false)
      })
      .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
      .finally(() => setIsPublished(false))
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/react-mesto-auth' />} />
        <Route path="/sign-in" element={
          <>
            <AuthHeader />
            <Login onAuthorization={handleAuthorization} />
          </>
        } />
        <Route path="/sign-up" element={
          <>
            <AuthHeader />
            <Register onRegistration={handleRegistration} />
          </>
        } />
        <Route path="/react-mesto-auth" element={
          loggedIn ? (
            <>
              <ProtectedRoute loggedIn={loggedIn} />
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <CurrentUserContext.Provider value={currentUser}>
                    <Header loginUserData={loginUserData} logOut={logOut} />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onEditAvatar={handleEditAvatarClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      openDelete={handleDeletePopupClick}
                      cards={cards}
                    />
                  </CurrentUserContext.Provider>
                  <Footer />
                  <CurrentUserContext.Provider value={currentUser}>
                    <EditProfilePopup
                      onUpdateUser={handleUpdateUser}
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      isPublished={isPublished}
                    />
                    <EditAvatarPopup
                      onUpdateAvatar={handleUpdateAvatar}
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      isPublished={isPublished}
                    />
                    <AddPlacePopup
                      onAddPlace={handleUpdateCards}
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      isPublished={isPublished}
                    />
                    <PopupWithForm
                      name="delete"
                      title="Вы уверены?"
                      submitBtn="Да"
                      isOpen={isDeleteOpen}
                      onClose={closeAllPopups}
                      onCardDelete={handleCardDelete}
                      isPublished={isPublished}
                    />
                  </CurrentUserContext.Provider>
                  <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                  />
                </>
              )}
            </>
          ) : (<Navigate to='/sign-in' />)} />
      </Routes>
      <InfoTooltip
        isSuccess={isRegistrationSuccess}
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;