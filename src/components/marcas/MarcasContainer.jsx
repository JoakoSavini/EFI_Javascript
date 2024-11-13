import { useState, useEffect, Fragment } from 'react';
import MarcasView from "./MarcasView";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const MarcasContainer = () => {
    const [dataBrand, setDataBrand] = useState([]);
    const [loadingBrand, setLoadingBrand] = useState(true);
    const [showAddBrandModal, setShowAddBrandModal] = useState(false);
    const [newBrand, setNewBrand] = useState({ nombre: '' });

    const getDataBrand = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/marcas", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.error("Error en la petición:", response.status);
                return;
            }

            const results = await response.json();
            if (Array.isArray(results)) {
                setDataBrand(results);
            } else {
                console.error("La respuesta no es un array:", results);
            }
        } catch (error) {
            console.error("Hubo un error en la API:", error);
        } finally {
            setLoadingBrand(false);
        }
    };

    // Función para agregar una nueva marca
    const handleAddBrand = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/marcas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newBrand)
            });

            if (response.ok) {
                setShowAddBrandModal(false);
                setNewBrand({ nombre: '' });
                getDataBrand(); // Recarga la lista de marcas
            } else {
                const errorData = await response.json();
                console.error("Error al agregar la marca:", errorData.mensaje || response.statusText);
            }
        } catch (error) {
            console.error("Hubo un error en la API:", error);
        }
    };

    useEffect(() => {
        getDataBrand();
    }, []);

    return (
        <Fragment>
            <Button label="Agregar Marca" icon="pi pi-plus" onClick={() => setShowAddBrandModal(true)} />

            <Dialog
                header="Agregar Marca"
                visible={showAddBrandModal}
                style={{ width: '400px' }}
                onHide={() => setShowAddBrandModal(false)}
            >
                <div className="p-field">
                    <label htmlFor="nombre">Nombre de la Marca</label>
                    <InputText
                        id="nombre"
                        value={newBrand.nombre}
                        onChange={(e) => setNewBrand({ ...newBrand, nombre: e.target.value })}
                    />
                </div>
                <Button label="Agregar" icon="pi pi-check" onClick={handleAddBrand} className="mt-3" />
            </Dialog>

            <MarcasView loadingBrand={loadingBrand} dataBrand={dataBrand} getDataBrand={getDataBrand} />
        </Fragment>
    );
};

export default MarcasContainer;
