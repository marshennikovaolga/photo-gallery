import iconSuccess from '../../images/success.svg';
import iconError from '../../images/error.svg';

export default function InfoTooltip({ isSuccess, isOpen, onClose }) {

    return (
        <div className={`popup ${isOpen ? 'popup_open' : ''}`} onClick={onClose}>
            <div className="popup__content popup__content_tooltip">
                <img
                    className='popup__icon'
                    src={isSuccess ? iconSuccess : iconError}
                    alt={`При авторизации ${isSuccess ? 'всё прошло успешно' : 'произошла ошибка'}`}
                />
                <h2 className='popup__title popup__title_tooltip'>
                    {`${isSuccess ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}`}
                </h2>
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
            </div>
        </div>
    )
}