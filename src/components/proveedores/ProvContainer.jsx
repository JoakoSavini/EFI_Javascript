import { useState, useEffect, Fragment } from 'react';
import ProvView from './ProvView';

const ProveedoresContainer = () => {
    const [dataProv, setDataProv] = useState([]),
        [loadingProv, setLoadingProv] = useState(true);

    const getDataProv = async () => {
        try {
            const response = await fetch("https://localhost:5000/proveedores");
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
        <ProvView loadingProv={loadingProv} dataProv={dataProv} />
    );
};

export default ProveedoresContainer;
