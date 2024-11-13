import { useState, useEffect, Fragment } from 'react';
import ModelView from './ModelosView';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const ModelosContainer = () => {
    const [dataModel, setDataModel] = useState([]);
    const [loadingModel, setLoadingModel] = useState(true);
    const [showAddModelModal, setShowAddModelModal] = useState(false);
    const [newModel, setNewModel] = useState({ nombre: '', marca_id: '' });
    const [marcas, setMarcas] = useState([]); // Para cargar las opciones de marcas en el dropdown

    const getDataModel = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/modelos", {
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
            setDataModel(results);
        } catch (error) {
            console.error("Hubo un error en la API:", error);
        } finally {
            setLoadingModel(false);
        }
    };

    const getMarcas = async () => {
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
                console.error("Error al cargar marcas:", response.status);
                return;
            }

            const marcaResults = await response.json();
            setMarcas(marcaResults);
        } catch (error) {
            console.error("Error al obtener marcas:", error);
        }
    };

    // Función para agregar un nuevo modelo
    const handleAddModel = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/modelos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newModel)
            });

            if (response.ok) {
                setShowAddModelModal(false);
                setNewModel({ nombre: '', marca_id: '' });
                getDataModel();
            } else {
                const errorData = await response.json();
                console.error("Error al agregar el modelo:", errorData.mensaje || response.statusText);
            }
        } catch (error) {
            console.error("Hubo un error en la API:", error);
        }
    };

    useEffect(() => {
        getDataModel();
        getMarcas(); // Cargar las marcas para el dropdown al montar el componente
    }, []);

    return (
        <Fragment>
            {/* Botón para abrir el modal de agregar modelo */}
            <Button label="Agregar Modelo" icon="pi pi-plus" onClick={() => setShowAddModelModal(true)} />

            {/* Modal de agregar modelo */}
            <Dialog
                header="Agregar Modelo"
                visible={showAddModelModal}
                style={{ width: '400px' }}
                onHide={() => setShowAddModelModal(false)}
            >
                <div className="p-field">
                    <label htmlFor="nombre">Nombre del Modelo</label>
                    <InputText
                        id="nombre"
                        value={newModel.nombre}
                        onChange={(e) => setNewModel({ ...newModel, nombre: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="marca_id">Marca</label>
                    <Dropdown
                        id="marca_id"
                        value={newModel.marca_id}
                        options={marcas.map((marca) => ({
                            label: marca.nombre,
                            value: marca.id
                        }))}
                        onChange={(e) => setNewModel({ ...newModel, marca_id: e.target.value })}
                        placeholder="Seleccione una Marca"
                    />
                </div>
                <Button label="Agregar" icon="pi pi-check" onClick={handleAddModel} className="mt-3" />
            </Dialog>

            {/* Vista de modelos */}
            <ModelView loadingModel={loadingModel} dataModel={dataModel} getDataModel={getDataModel} />
        </Fragment>
    );
};

export default ModelosContainer;
