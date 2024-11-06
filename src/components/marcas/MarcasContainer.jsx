import { useState, useEffect } from 'react';
import MarcaView from './MarcasView';

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
            }

            const results = await response.json();
            setDataBrand(results);
        } catch (error) {
            console.log("Hubo un error en la api ", error);
        } finally {
            setLoadingBrand(false);
        }
    };

    console.log("dataBrand", dataBrand);

    useEffect(() => {
        getDataBrand();
    }, []);

    return (
        <MarcaView loadingBrand={loadingBrand} dataBrand={dataBrand} />
    );
};

export default MarcasContainer;
