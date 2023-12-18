import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import AddLikeBtn from "../AddLikeBtn/AddLikeBtn.jsx"

export default function Card({ card, onCardClick, openDelete }) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <>
            {card.owner && currentUser._id === card.owner && < button className="groups__deletebtn" onClick={() => openDelete(card._id)} />}
            <img className="groups__image"
                onClick={() => onCardClick({ link: card.link, name: card.name })}
                src={card.link} alt={`на картинке ${card.name}`} />
            <div className="groups__description">
                <h3 className="groups__title"> {card.name} </h3>
                <div className="groups__counters">
                    <AddLikeBtn likes={card.likes} myId={currentUser._id} cardId={card._id} ></AddLikeBtn>
                </div>
            </div>
        </>
    )
}