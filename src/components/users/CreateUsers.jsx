import { Formik } from "formik"
import * as Yup from "yup"

const CreateUser = () => {
    /* esquema de validacion */
    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
        .required()
        .min(5, 'El username es demasiado corto')
        .max(50, 'El username es demasiado largo'),
        password: Yup.string()
        .required()
        .min(5, 'La contraseña es demasiado corta')
        .max(50, 'La contraseña es demasiado larga'),
    })

    const token = ''

    const RegisterUser = async (values) => {
        const bodyRegisterUser = {
            username: values.username,
            password: values.password
        }
        const response = await fetch('https://localhost:5000/users', {
            method:'POST',
            body:JSON.stringify(bodyRegisterUser),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        console.log("response:", response)
    }



    return (
        <Formik
        initialValues={{username:'', password:''}}
        validationSchema={ValidationSchema}
        >

            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
                isValid
            }) => (
                <form>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    />
                    {errors.username && touched.username && errors.username}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}

                    <button onClick={() => RegisterUser(values)} type="button" disabled={values.password === '' || values.username === '' || !isValid}>
                        Crear Usuario
                    </button>

                </form>

            )}

        </Formik>
    )
}

export default CreateUser