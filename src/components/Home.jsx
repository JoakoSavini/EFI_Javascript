import React, { useState, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Manejar el envío del formulario
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                mode: 'cors'
            });
    
            if (response.ok) {
                const data = await response.json();
                // Almacenar el token recibido
                localStorage.setItem('token', data.token); // usa data.token en lugar de data.Token
                console.log("Login exitoso, token recibido:", data.token);

                navigate('/usuarios');
            } else {
                setErrorMessage("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            setErrorMessage("Hubo un error al intentar conectarse con el servidor.");
        }
    };
    
    
    return (
        <Fragment>    
            <div className="card">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText 
                            id="username" 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-12rem" 
                        />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-12rem" 
                        />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <Button 
                        label="Login" 
                        icon="pi pi-user" 
                        className="w-10rem mx-auto"
                        onClick={handleLogin} 
                    />
                </div>
            </div>
        </Fragment>
        )
}

export default Home