import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header({loginUserData, logOut}) {

    return (
        <header className='header'>
        <img className="header__logo"
            src={logo}
            alt="Лого проекта"
        />
        <div className='header__menu'>
        <p className='header__email'>{loginUserData.email}</p>
         <Link onClick={logOut} className='header__button' to='/sign-in'>Выйти</Link>
        </div>
    </header>
    )
}