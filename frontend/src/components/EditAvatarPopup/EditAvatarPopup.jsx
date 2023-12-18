import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx"
import useFormValidation from "../../hooks/useFormValidation.js"
import { useRef } from 'react'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPublished }) {
    const input = useRef();
    const { values, error, isInputValid, isValidButton, reset, handleChange } = useFormValidation()

    // сброс ошибок и инпутов при закрытии 
    function resetCloseForm() {
        onClose()
        reset()
    }

    //обработка submit 
    function handleSubmit(evt) {
        evt.preventDefault()
        console.log('update аватар')
        onUpdateAvatar({ avatar: input.current.value }, reset)

    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={resetCloseForm}
            onSubmit={handleSubmit}
            isPublished={isPublished}
            isValidButton={isValidButton}
        >
            <input
                type="url"
                name="avatar"
                id="avatar"
                className={`popup__input popup__input_type_link ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_invalid'}`}
                placeholder="Ссылка на картинку"
                aria-label="ссылка"
                required
                value={values.avatar ? values.avatar : ''}
                disabled={isPublished}
                onChange={handleChange}
                ref={input}
            />
            <span
                className="popup__error popup__error_type_avatar"
                id="avatar-error">{error.avatar}
            </span>
        </PopupWithForm>
    )
}