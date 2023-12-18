import WelcomeForm from "../WelcomeForm/WelcomeForm.jsx";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function Login({ onAuthorization }) {
    const { values, error, handleChange, isValidButton } = useFormValidation();

    function handleSubmit(evt) {
        evt.preventDefault()


        const { email, password } = values;
        if (!email || !password) return;

        onAuthorization({
            email: email.trim().replace(/\s+/g, ' '),
            password: password
        })
    }

    return (
        <WelcomeForm
            title={'Вход'}
            submitBtn={'Войти'}
            submitLabel={'Авторизуйтесь'}
            onSubmit={handleSubmit}
            isValidBtn={isValidButton}
        >
            <div className="welcome__auth-inputs">
                <input
                    className={`welcome__input ${error?.email && 'welcome__input_error'}`}
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
                    className={`welcome__input ${error?.email && 'welcome__input_error'}`}
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
        </WelcomeForm>
    )
}
