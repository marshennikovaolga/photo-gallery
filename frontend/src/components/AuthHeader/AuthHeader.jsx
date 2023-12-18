import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

export default function AuthHeader() {
    const { pathname } = useLocation();
    const isCurrentPage = pathname.endsWith('/sign-in');

    return (
        <header className='header'>
            <img className="header__logo"
                src={logo}
                alt="Лого проекта"
            />
            <Link className='header__button' to={isCurrentPage ? '/sign-up' : '/sign-in'}>
                {isCurrentPage ? 'Регистрация' : 'Войти'}
            </Link>
        </header>
    );
}