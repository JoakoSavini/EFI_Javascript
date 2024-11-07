import { ProgressSpinner } from "primereact/progressspinner";
import { Fragment, useRef } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";

const ProvView = ({loadingProv, dataProv, getDataProv}) => {
    const toast = useRef(null);

    console.log("dataProv", dataProv); 
    
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

    const deleteProv = async (provId) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar este proveedor?',
            header: 'Eliminar Proveedor',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); // Recupera el token del Local Storage
                    
                    const response = await fetch(`http://localhost:5000/proveedores/${provId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
    
                    if (!response.ok) {
                        console.log("Error al eliminar el proveedor");
                        return;
                    }
    
                    const result = await response.json();
                    console.log("Proveedor eliminado", result);
    
                    toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Proveedor eliminado correctamente', life: 3000 });
                    getDataProv(); // Actualiza los proveedores en la vista
                } catch (error) {
                    console.log("Error en la eliminación", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al eliminar el proveedor', life: 3000 });
                }
            },
            reject
        });
    };
    
    const editProv = async (provId) => {
        confirmDialog({
            message: '¿Está seguro que desea editar este proveedor?',
            header: 'Editar Proveedor',
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
    
                    const response = await fetch(`http://localhost:5000/proveedores/${provId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedData) // Enviar los nuevos datos
                    });
    
                    if (!response.ok) {
                        console.log("Error al actualizar el proveedor");
                        return;
                    }
    
                    const updatedProv = await response.json();
                    console.log("Proveedor actualizado", updatedProv);
    
                    toast.current.show({ severity: 'success', summary: 'Actualización completada', detail: 'Proveedor actualizado correctamente', life: 3000 });
                    getDataProv(); // Actualiza los usuarios en la vista
                } catch (error) {
                    console.log("Error en la actualización", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el proveedor', life: 3000 });
                }
            },
            reject
        });
    };
    
    
   

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label="Editar" onClick={() => editProv(rowData.id)} className="p-button-info"/> {/*Llamada a la función de editar con el ID del proveedor */}
                <Button icon='pi pi-trash' label="Eliminar" onClick={() => deleteProv(rowData.id)} className="p-button-danger" /> {/* Llamada a la función de eliminar con el ID del proveedor */}
            </div>
        );
    };

    
    return (
        <Fragment>
            <h1>Proveedores</h1>
            <Button label="Agregar Proveedores" icon="pi pi-user-plus"/>
            
            {loadingProv ? 
                <ProgressSpinner /> : 
                <DataTable value={Array.isArray(dataProv) ? dataProv : []} tableStyle={{ minWidth: '50rem' }}>
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

export default ProvView