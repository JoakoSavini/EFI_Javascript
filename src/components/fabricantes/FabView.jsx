import { ProgressSpinner } from "primereact/progressspinner";
import { Fragment, useRef } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";

const FabView = ({loadingFab, dataFab, getDataFab}) => {
    const toast = useRef(null);

    console.log("dataFab", dataFab); 
    
    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Accion completada', detail: 'Accion realizada correctamente', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Accion rechazada', detail: 'Se ha cancelado la accion', life: 3000 });
    };

    /* const editUsers = () => {
        confirmDialog({
            message: '¿Está seguro?',
            header: 'Editar Usuario',
            acceptLabel: 'Si',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    }; */

    const deleteFab = async (fabId) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar este Fabricante?',
            header: 'Eliminar Fabricante',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); // Recupera el token del Local Storage
                    
                    const response = await fetch(`http://localhost:5000/fabricantes/${fabId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
    
                    if (!response.ok) {
                        console.log("Error al eliminar el fabricante");
                        return;
                    }
    
                    const result = await response.json();
                    console.log("fabricante eliminado", result);
    
                    toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Fabricante eliminado correctamente', life: 3000 });
                    getDataFab(); // Actualiza los fabricantes en la vista
                } catch (error) {
                    console.log("Error en la eliminación", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al eliminar el fabricante', life: 3000 });
                }
            },
            reject
        });
    };
    
    const editFab = async (fabId) => {
        confirmDialog({
            message: '¿Está seguro que desea editar este fabricante?',
            header: 'Editar Fabricante',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-info',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); // Recupera el token del Local Storage
                    
                    // Aquí puedes obtener los nuevos valores (puedes usar un formulario o valores por defecto)
                    const updatedData = {
                        nombre: "NuevoNombre", // Nuevo nombre 
                        localidad: "NuevaLocalidad", // Nueva localidad
                        contacto: "NuevoContacto", //Nuevo COntacto
                    };
    
                    const response = await fetch(`http://localhost:5000/fabricantes/${fabId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedData) // Enviar los nuevos datos
                    });
    
                    if (!response.ok) {
                        console.log("Error al actualizar el fabricante");
                        return;
                    }
    
                    const updatedFab = await response.json();
                    console.log("Fabricante actualizado", updatedFab);
    
                    toast.current.show({ severity: 'success', summary: 'Actualización completada', detail: 'Fabricante actualizado correctamente', life: 3000 });
                    getDataFab(); // Actualiza los fabricantes en la vista
                } catch (error) {
                    console.log("Error en la actualización", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el fabricante', life: 3000 });
                }
            },
            reject
        });
    };
    
    
   

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label="Editar" onClick={() => editFab(rowData.id)} className="p-button-info"/> {/*Llamada a la función de editar con el ID del fabricante */}
                <Button icon='pi pi-trash' label="Eliminar" onClick={() => deleteFab(rowData.id)} className="p-button-danger" /> {/* Llamada a la función de eliminar con el ID del fabricante */}
            </div>
        );
    };

    
    return (
        <Fragment>
            <h1>Fabricante</h1>
            <Button label="Agregar Fabricantes" icon="pi pi-user-plus"/>
            
            {loadingFab ? 
                <ProgressSpinner /> : 
                <DataTable value={Array.isArray(dataFab) ? dataFab : []} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="localidad" header="Localidad"></Column>
                    <Column field="contacto" header="Contacto"></Column>
                    <Column header="Acciones" body={bodyActions}></Column>
                </DataTable>
            }

            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    )
}

export default FabView