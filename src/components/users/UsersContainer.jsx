import { useState, useEffect, Fragment } from 'react';
import UsersView from './UsersView';

const UsersContainer = () => {
    const [dataUsers, setDataUsers] = useState([]),
        [loadingUsers, setLoadingUsers] = useState(true);

    const getDataUsers = async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera el token del Local Storage
            
            const response = await fetch("http://localhost:5000/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Agrega el token en el encabezado
                }
            });
            console.log("response", response);

            if (!response.ok) {
                console.log("Hubo un error en la petición");
                return;
            }

            const results = await response.json();
            // Asegúrate de que results sea un array
            if (Array.isArray(results)) {
                setDataUsers(results);
            } else {
                console.log("La respuesta no es un array", results);
            }
        } catch (error) {
            console.log("Hubo un error en la API ", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    console.log("dataUsers", dataUsers);

    useEffect(() => {
        getDataUsers();
    }, []);

    return (
        <UsersView loadingUsers={loadingUsers} dataUsers={dataUsers} getDataUsers={getDataUsers} />
    );
};

export default UsersContainer;