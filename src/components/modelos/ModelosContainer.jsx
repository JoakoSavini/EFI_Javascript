import { useState, useEffect, Fragment } from 'react';
import ModelView from './ModelosView';

const ModelosContainer = () => {
    const [dataModel, setDataModel] = useState([]),
        [loadingModel, setLoadingModel] = useState(true);

    const getDataModel = async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera el token del Local Storage

            const response = await fetch("http://localhost:5000/modelos", {
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
            setDataModel(results);
        } catch (error) {
            console.log("Hubo un error en la api ", error);
        } finally {
            setLoadingModel(false);
        }
    };

    console.log("dataModel", dataModel);

    useEffect(() => {
        getDataModel();
    }, []);

    return (
        <ModelView loadingModel={loadingModel} dataModel={dataModel} />
    );
};

export default ModelosContainer;
