import Card from '../Card/Card.jsx'
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

export default function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, openDelete, cards }) {

    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile" aria-label="данные профиля">
                <button className="profile__avatar-btn" onClick={onEditAvatar}>
                    <img className="profile__pic" alt="аватар профиля" src={currentUser.avatar ? currentUser.avatar : '#'} />
                </button>
                <div className="profile__info">
                    <div className="profile__form">
                        <h1 className="profile__person"> {currentUser.name ? currentUser.name : '#'} </h1>
                        <button
                            type="button"
                            className="profile__btn-edit"
                            aria-label="Редактировать профиль"
                            onClick={onEditProfile} />
                    </div>
                    <p className="profile__description"> {currentUser.about ? currentUser.about : '#'} </p>
                </div>
                <button
                    type="button"
                    className="profile__btn-add"
                    aria-label="Добавить карточку"
                    onClick={onAddPlace}
                />
            </section>
            <section className="groups">
                <ul className="groups">
                    {cards.map(element => {
                        return (
                            <li className="groups__element" key={element._id}>
                                <Card card={element} onCardClick={onCardClick}
                                    openDelete={openDelete} />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}