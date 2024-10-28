import { useState, useEffect, Fragment } from 'react';
import ModelView from './ModelosView';

const ModelosContainer = () => {
    const [dataModel, setDataModel] = useState([]),
        [loadingModel, setLoadingModel] = useState(true);

    const getDataModel = async () => {
        try {
            const response = await fetch("https://localhost:5000/modelos");
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
