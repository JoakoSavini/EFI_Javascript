import { useState, useEffect, Fragment } from 'react';
import CelularView from './CelView';

const CelularesContainer = () => {
    const [dataCel, setDataCel] = useState([]),
        [loadingCel, setLoadingCel] = useState(true);

    const getDataCel = async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera el token del Local Storage

            const response = await fetch("http://localhost:5000/celulares", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Agrega el token en el encabezado
                }
            });

            console.log("response", response);
            if (!response.ok) {
                console.log("Hubo un error en la peticiÃ³n");
            }

            const results = await response.json();
            setDataCel(results);
        } catch (error) {
            console.log("Hubo un error en la api ", error);
        } finally {
            setLoadingCel(false);
        }
    };

    console.log("dataCel", dataCel);

    useEffect(() => {
        getDataCel();
    }, []);

    return (
        <CelularView loadingCel={loadingCel} dataCel={dataCel} getDataCel={getDataCel} />
    );
};

export default CelularesContainer;