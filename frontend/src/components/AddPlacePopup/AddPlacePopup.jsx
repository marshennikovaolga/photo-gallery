import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx"
import useFormValidation from "../../hooks/useFormValidation.js"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isPublished }) {
    const { values, error, isInputValid, isValidButton, reset, handleChange } = useFormValidation()

    // сброс ошибок и инпутов при закрытии 
    function resetCloseForm() {
        reset()
        onClose()
    }

    //обработка submit 
    function handleSubmit(evt) {
        evt.preventDefault()
        console.log('update карточек')
        onAddPlace({ name: values.name, link: values.link }, reset)
    }

    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            submitBtn='Создать'
            isValidButton={isValidButton}
            isOpen={isOpen}
            onClose={resetCloseForm}
            onSubmit={handleSubmit}
            isPublished={isPublished}
        >
            <input
                name="name"
                type="text"
                id="card"
                required
                minLength={2}
                maxLength={30}
                className={`popup__input popup__input_type_card
                ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_invalid'}`}
                placeholder="Название"
                aria-label="подпись к картинке"
                onChange={handleChange}
                disabled={isPublished}
                value={values.name || ''} 
            />
            <span className="popup__error popup__error_type_card" id="name-error">
                {error.name}
            </span>
            <input
                name="link"
                type="url"
                id="url"
                required
                className={`popup__input popup__input_type_link
                ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_invalid'}`}
                placeholder="Ссылка на картинку"
                aria-label="ссылка"
                onChange={handleChange}
                disabled={isPublished}
                value={values.link || ''} 
            />
            <span className="popup__error popup__error_type_job" id="job-error">
                {error.link}
            </span>
        </PopupWithForm>
    )
}