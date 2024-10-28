import { useState, useEffect, Fragment } from 'react';
import FabView from './FabView';

const FabricantesContainer = () => {
    const [dataFab, setDataFab] = useState([]),
        [loadingFab, setLoadingFab] = useState(true);

    const getDataFab = async () => {
        try {
            const response = await fetch("https://localhost:5000/fabricantes");
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
        <FabView loadingFab={loadingFab} dataFab={dataFab} />
    );
};

export default FabricantesContainer;
