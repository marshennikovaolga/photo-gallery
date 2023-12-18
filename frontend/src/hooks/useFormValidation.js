import { useCallback, useState } from "react";

export default function useFormValidation() {

    const [ values, setValues ] = useState({})
    const [ error, setError ] = useState({})
    const [ isInputValid, setIsInputValid ] = useState({}) // стейт спанов
    const [ isValidButton, setIsValidButton ] = useState(false)

    function handleChange(evt) {
        const name = evt.target.name
        const value = evt.target.value
        const validationMessage = evt.target.validationMessage
        const valid = evt.target.validity.valid
        const form = evt.target.form

        setValues((initialValues) => {
            return { ...initialValues, [name]: value }
        })

        setError((initialError) => {
            return { ...initialError, [name]: validationMessage }
        })

        setIsInputValid((initialInput) => {
            return { ...initialInput, [name]: valid }
        })

        setIsValidButton(form.checkValidity())
    }

    // сброс ошибок
    function reset( data = {}) {
        setValues(data)
        setError({})
        setIsInputValid({})
        setIsValidButton(false)
    }

    const changeValues = useCallback((name, value) => {
        setValues((initialValues) => {
            return { ...initialValues, [name]: value }
        })
    }, [])

    return { values, error, isInputValid, isValidButton, reset, changeValues, handleChange }
}

