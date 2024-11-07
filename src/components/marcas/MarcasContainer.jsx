import { useState, useEffect, Fragment } from 'react';
import MarcasView from "./MarcasView"

const MarcasContainer = () => {
    const [dataBrand, setDataBrand] = useState([]),
        [loadingBrand, setLoadingBrand] = useState(true);

    const getDataBrand = async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera el token del Local Storage
            
            const response = await fetch("http://localhost:5000/marcas", {
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
                setDataBrand(results);
            } else {
                console.log("La respuesta no es un array", results);
            }
        } catch (error) {
            console.log("Hubo un error en la API ", error);
        } finally {
            setLoadingBrand(false);
        }
    };

    console.log("dataBrand", dataBrand);

    useEffect(() => {
        getDataBrand();
    }, []);

    return (
        <MarcasView loadingBrand={loadingBrand} dataBrand={dataBrand} getDataBrand={getDataBrand} />
    );
};

export default MarcasContainer;