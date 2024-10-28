import { Formik } from "formik"
import * as Yup from "yup"

const LoginUser = () => {
    
    const onLoginUser = async (values) => {
        /* recibimos los datos */
        const bodyLoginUser = btoa(`${values.username}:${values.password}`)
        /* codifico la cadena de txt */
        
        /* uso el endpoint */
        const response = await fetch('https://localhost:5000/login', {
            method:'POST',
            headers:{
                "Authorization": `Basic ${bodyLoginUser}`
            }
        }) /* ruta a mi endpoint y conexion a la cadena de txt */

        /* controlo el response */
        if (!response.ok) {
            throw new Error('hubo un error en la peticion')
        } 

        /* transormo mi response en un json para manipularlo */
        const data = await response.json()

        /* guardo en la localstorage el token */
        localStorage.setItem('token', JSON.stringify(data.Token))
    }

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
    
                        <button type="button" onClick={() => onLoginUser(values)} disabled={values.password === '' || values.username === '' || !isValid} >
                            Iniciar Sesión
                        </button>
                    </form>
    
                )}
    
            </Formik>
        )

}

export default LoginUser