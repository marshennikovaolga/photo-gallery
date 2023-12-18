import WelcomeForm from "../WelcomeForm/WelcomeForm.jsx";
import useFormValidation from "../../hooks/useFormValidation.js";
import { Link } from 'react-router-dom';

export default function Register({ onRegistration }) {
    const { values, error, isInputValid, handleChange, isValidButton } = useFormValidation();

    function handleSubmit(evt) {
        evt.preventDefault()

        const { email, password } = values;

        onRegistration({
            email: email.trim().replace(/\s+/g, ' '),
            password: password
        })
    }

    return (
        <WelcomeForm
            title={'Регистрация'}
            submitBtn={'Зарегистрироваться'}
            submitLabel={'Создайте учётную запись'}
            onSubmit={handleSubmit}
            isValidBtn={isValidButton}
        >
            <div className="welcome__auth-inputs">
                <input
                    className={`welcome__input ${isInputValid?.email && 'welcome__input_error'}`}
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="on"
                    onChange={handleChange}
                    value={values?.email || ''}
                    required
                />
                <span className="welcome__errorspan">
                    {error?.email && 'Введите корректный адрес электронной почты'}
                </span>
            </div>
            <div className="welcome__auth-inputs">
                <input
                    className={`welcome__input ${isInputValid?.email && 'welcome__input_error'}`}
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    minLength="3"
                    onChange={handleChange}
                    value={values?.password || ''}
                    required
                />
                <span className="welcome__errorspan">
                    {error?.password && 'Пароль не может быть короче 3 симв.'}
                </span>
            </div>
            <p className="welcome__question">Уже зарегистрированы?&nbsp;
                <Link className='welcome__link' to='../sign-in'>Войти</Link>
            </p>
        </WelcomeForm>
    )
}