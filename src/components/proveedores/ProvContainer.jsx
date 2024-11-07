import { useState, useEffect, Fragment } from 'react';
import ProvView from './ProvView';

const ProveedoresContainer = () => {
    const [dataProv, setDataProv] = useState([]),
        [loadingProv, setLoadingProv] = useState(true);

    const getDataProv = async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera el token del Local Storage
            
            const response = await fetch("http://localhost:5000/proveedores", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Agrega el token en el encabezado
                }
            });
            console.log("response", response);
            if (!response.ok) {
                console.log("Hubo un error en la petición");
            }

            const results = await response.json();
            setDataProv(results);
        } catch (error) {
            console.log("Hubo un error en la api ", error);
        } finally {
            setLoadingProv(false);
        }
    };

    console.log("dataProv", dataProv);

    useEffect(() => {
        getDataProv();
    }, []);

    return (
        <ProvView loadingProv={loadingProv} dataProv={dataProv} getDataProv={getDataProv}/>
    );
};

export default ProveedoresContainer;
