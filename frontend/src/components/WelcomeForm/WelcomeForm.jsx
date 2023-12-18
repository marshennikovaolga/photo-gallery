export default function WelcomeForm({ children, title, submitBtn, submitLabel, onSubmit, isValidBtn }) {
    const inputs = [children[0], children[1]];
    const loginLink = children[2];

    return (
        <div className="welcome">
            <h2 className="welcome__title">{title}</h2>
            <form className="welcome__form" onSubmit={onSubmit}>
                <fieldset className="welcome__inputs">
                    {inputs}
                </fieldset>
                <button
                    className={`welcome__submit ${!isValidBtn && 'welcome__submit_disabled'}`}
                    aria-label={submitLabel}
                    disabled={!isValidBtn}
                    type="submit">
                    {submitBtn}
                </button>
            </form>
            {loginLink}
        </div>
    )
}