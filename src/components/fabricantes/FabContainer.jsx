import { useState, useEffect, Fragment } from 'react';
import FabView from './FabView';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const FabricantesContainer = () => {
    const [dataFab, setDataFab] = useState([]);
    const [loadingFab, setLoadingFab] = useState(true);
    const [showAddFabModal, setShowAddFabModal] = useState(false);
    const [newFab, setNewFab] = useState({ nombre: '', localidad: '', contacto: '' });

    const getDataFab = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/fabricantes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.error("Hubo un error en la petición:", response.status);
                return;
            }

            const results = await response.json();
            setDataFab(results);
        } catch (error) {
            console.error("Hubo un error en la API:", error);
        } finally {
            setLoadingFab(false);
        }
    };

    // Función para agregar un nuevo fabricante
    const handleAddFab = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/fabricantes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newFab)
            });

            if (response.ok) {
                setShowAddFabModal(false);
                setNewFab({ nombre: '', localidad: '', contacto: '' });
                getDataFab();
            } else {
                const errorData = await response.json();
                console.error("Error al agregar el fabricante:", errorData.mensaje || response.statusText);
            }
        } catch (error) {
            console.error("Hubo un error en la API:", error);
        }
    };

    useEffect(() => {
        getDataFab();
    }, []);

    return (
        <Fragment>
            {/* Botón para abrir el modal de agregar fabricante */}
            <Button label="Agregar Fabricante" icon="pi pi-plus" onClick={() => setShowAddFabModal(true)} />

            {/* Modal de agregar fabricante */}
            <Dialog
                header="Agregar Fabricante"
                visible={showAddFabModal}
                style={{ width: '400px' }}
                onHide={() => setShowAddFabModal(false)}
            >
                <div className="p-field">
                    <label htmlFor="nombre">Nombre del Fabricante</label>
                    <InputText
                        id="nombre"
                        value={newFab.nombre}
                        onChange={(e) => setNewFab({ ...newFab, nombre: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="localidad">Localidad</label>
                    <InputText
                        id="localidad"
                        value={newFab.localidad}
                        onChange={(e) => setNewFab({ ...newFab, localidad: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="contacto">Contacto</label>
                    <InputText
                        id="contacto"
                        value={newFab.contacto}
                        onChange={(e) => setNewFab({ ...newFab, contacto: e.target.value })}
                    />
                </div>
                <Button label="Agregar" icon="pi pi-check" onClick={handleAddFab} className="mt-3" />
            </Dialog>

            {/* Vista de fabricantes */}
            <FabView loadingFab={loadingFab} dataFab={dataFab} getDataFab={getDataFab} />
        </Fragment>
    );
};

export default FabricantesContainer;
