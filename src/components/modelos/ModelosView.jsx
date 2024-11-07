import {ProgressSpinner } from "primereact/progressspinner"
import { Fragment, useRef } from "react"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";

const ModelView = ({loadingModel, dataModel, getDataModel}) => {
    const toast = useRef(null);

    console.log("dataModels", dataModel); 
    
    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Accion completada', detail: 'Accion realizada correctamente', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Accion rechazada', detail: 'Se ha cancelado la accion', life: 3000 });
    };

    const deleteModel = async (modelId) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar este modelo?',
            header: 'Eliminar Modelo',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); // Recupera el token del Local Storage
                    
                    const response = await fetch(`http://localhost:5000/modelos/${modelId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
    
                    if (!response.ok) {
                        console.log("Error al eliminar el modelo");
                        return;
                    }
    
                    const result = await response.json();
                    console.log("Modelo eliminado", result);
    
                    toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Modelo eliminado correctamente', life: 3000 });
                    getDataModel(); // Actualiza los usuarios en la vista
                } catch (error) {
                    console.log("Error en la eliminación", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al eliminar el modelo', life: 3000 });
                }
            },
            reject
        });
    };
    
    const editModel = async (modelId) => {
        confirmDialog({
            message: '¿Está seguro que desea editar este modelo?',
            header: 'Editar Modelo',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-info',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); // Recupera el token del Local Storage
                    
                    // Aquí puedes obtener los nuevos valores (puedes usar un formulario o valores por defecto)
                    const updatedData = {
                        nombre: "NuevoNombre", // Nuevo nombre de usuario
                        localidad: "NuevaLocalidad", // Nueva contraseña
                        contacto: "NuevoContacto" //Nuevo contacto
                    };
    
                    const response = await fetch(`http://localhost:5000/modelos/${modelId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedData) // Enviar los nuevos datos
                    });
    
                    if (!response.ok) {
                        console.log("Error al actualizar el modelo");
                        return;
                    }
    
                    const updatedUser = await response.json();
                    console.log("Modelo actualizado", updatedUser);
    
                    toast.current.show({ severity: 'success', summary: 'Actualización completada', detail: 'Modelo actualizado correctamente', life: 3000 });
                    getDataModel(); // Actualiza los usuarios en la vista
                } catch (error) {
                    console.log("Error en la actualización", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el modelo', life: 3000 });
                }
            },
            reject
        });
    };
    
    
    const bodyMarca = (rowData) => {
        return (
            <span>{rowData.nombre}</span>
        );
    };

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label="Editar" onClick={() => editModel(rowData.id)} className="p-button-info"/> {/*Llamada a la función de editar con el ID del modelo */}
                <Button icon='pi pi-trash' label="Eliminar" onClick={() => deleteModel(rowData.id)} className="p-button-danger" /> {/* Llamada a la función de eliminar con el ID del modelo */}
            </div>
        );
    };
    
    return (
        <Fragment>
            <h1>Modelos</h1>
            <Button label="Agregar Modelo" icon="pi pi-object-column"/>
            
            {loadingModel ? 
                <ProgressSpinner /> : 
                <DataTable value={Array.isArray(dataModel) ? dataModel : []} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column header="Acciones" body={bodyActions}></Column>
                </DataTable>
            }

            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    )
}

export default ModelView