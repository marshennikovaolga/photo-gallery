import { useEffect, useState } from "react"
import api from "../../utils/api.js"

export default function AddLikeBtn({ likes, myId, cardId }) {
    const [isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes ? likes.length : 0)

    useEffect(() => {
        setIsLike(likes && likes.some((element) => myId === element))
    }, [likes, myId])

    function handleCardLike() {
        if (isLike) {
            api.deleteLike(cardId, localStorage.jwt)
                .then(res => {
                    setIsLike(false);
                    setCount(prevCount => prevCount - 1);
                })
                .catch((err) => console.error(`Невозможно убрать лайк ${err}`))
        } else {
            api.addLike(cardId, localStorage.jwt)
                .then(res => {
                    setIsLike(true);
                    setCount(prevCount => prevCount + 1);
                })
                .catch((err) => console.error(`Невозможно поставить лайк ${err}`))
        }
    }

    return (
        <>
            <button onClick={handleCardLike} className={
                `groups__like ${isLike ? 'groups__like_active' : ''}`} type="button"/>
            <p className="groups__like-counter">{count}</p>
        </>
    )
}