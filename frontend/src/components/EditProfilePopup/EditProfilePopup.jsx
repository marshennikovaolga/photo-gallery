import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx"
import useFormValidation from "../../hooks/useFormValidation.js"
import { useContext, useEffect } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isPublished }) {
    const currentUser = useContext(CurrentUserContext)
    const { values, error, isInputValid, isValidButton, reset, changeValues, handleChange } = useFormValidation()

    useEffect(() => {
        changeValues('username', currentUser.name)
        changeValues('job', currentUser.about)
    }, [currentUser, changeValues])

    // сброс ошибок и инпутов при закрытии 
    function resetCloseForm() {
        onClose()
        reset({
            username: currentUser.name,
            job: currentUser.about
        })
    }

    //обработка submit 
    function handleSubmit(evt) {
        evt.preventDefault()
        console.log('update информация о пользователе')
        onUpdateUser({ username: values.username, job: values.job }, reset)
    }


    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={resetCloseForm}
            isValidButton={isValidButton}
            isPublished={isPublished}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="username"
                id="name"
                className={`popup__input popup__input_type_name
          ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_invalid'}`}
                placeholder="имя автора"
                aria-label="Имя"
                required
                minLength={2}
                maxLength={40}
                value={values.username || ''} 
                disabled={isPublished}
                onChange={handleChange}
            />
            <span
                className="popup__error popup__error_type_name"
                id="username-error" >
                {error.username}
            </span>
            <input
                type="text"
                name="job"
                id="job"
                className={`popup__input popup__input_type_name
          ${isInputValid.job === undefined || isInputValid.job ? '' : 'popup__input_invalid'}`}
                placeholder="род деятельности"
                aria-label="Пофессия"
                required
                minLength={2}
                maxLength={200}
                value={values.job || ''} 
                disabled={isPublished}
                onChange={handleChange}
            />
            <span className="popup__error popup__error_type_job" id="job-error">
                {error.job}
            </span>
        </PopupWithForm>
    )
}
