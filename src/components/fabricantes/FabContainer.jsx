import { useState, useEffect, Fragment } from 'react';
import FabView from './FabView';

const FabricantesContainer = () => {
    const [dataFab, setDataFab] = useState([]),
        [loadingFab, setLoadingFab] = useState(true);

    const getDataFab = async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera el token del Local Storage

            const response = await fetch("http://localhost:5000/fabricantes", {
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
            setDataFab(results);
        } catch (error) {
            console.log("Hubo un error en la api ", error);
        } finally {
            setLoadingFab(false);
        }
    };

    console.log("dataFab", dataFab);

    useEffect(() => {
        getDataFab();
    }, []);

    return (
        <FabView loadingFab={loadingFab} dataFab={dataFab} getDataFab={getDataFab} />
    );
};

export default FabricantesContainer;
