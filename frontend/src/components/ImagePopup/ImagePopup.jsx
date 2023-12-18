export default function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup__overlay popup popup_type_image ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container popup__container_type_image">
                <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть" />
                <img id="cardImage" className="popup__picture"
                    src={card.link}
                    alt={`на картинке ${card.name}`} />
                <figcaption className="popup__caption"> {`описание: ${card.name}`} </figcaption>
            </div>
        </div>
    )
}