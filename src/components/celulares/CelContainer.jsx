import { useState, useEffect, Fragment } from 'react';
import CelularView from './CelView';

const CelularesContainer = () => {
    const [dataCel, setDataCel] = useState([]),
        [loadingCel, setLoadingCel] = useState(true);

    const getDataCel = async () => {
        try {
            const response = await fetch("https://localhost:5000/celulares");
            console.log("response", response);
            if (!response.ok) {
                console.log("Hubo un error en la petición");
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
        <CelularView loadingCel={loadingCel} dataCel={dataCel} />
    );
};

export default CelularesContainer;
