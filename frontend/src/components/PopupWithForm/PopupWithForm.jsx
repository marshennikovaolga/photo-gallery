export default function PopupWithForm({ name, title, submitBtn, children, isOpen, onClose,
    onCardDelete, isPublished, onSubmit, isValidButton = true }) {
    return (
        <div className={`popup__overlay popup popup_type_${name} ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__content">
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
                <form name={name} onSubmit={onSubmit}
                    className={`popup__container popup__container_type_${name}`}
                    noValidate>
                    <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
                    {children}
                    <button className={`popup__submit popup__submit_${name} ${isValidButton ? '' : 'popup__submit_disabled'}`}
                        type="submit"
                        disabled={isPublished} //деактивация кнопки во время сохранения 
                        onClick={onCardDelete ? onCardDelete : null} >
                        {isPublished ? (name === 'delete' ? 'Удаление...' : 'Сохранение...') : submitBtn || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}