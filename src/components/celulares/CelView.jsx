import {ProgressSpinner } from "primereact/progressspinner"
import { Fragment, useRef } from "react"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";

const CelView = ({loadingCel, dataCel, getDataCel}) => {
    const toast = useRef(null);

    console.log("dataCel", dataCel); 
    
    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Accion completada', detail: 'Accion realizada correctamente', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Accion rechazada', detail: 'Se ha cancelado la accion', life: 3000 });
    };

    const deleteCel = async (celId) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar este celular?',
            header: 'Eliminar Celular',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); // Recupera el token del Local Storage
                    
                    const response = await fetch(`http://localhost:5000/celulares/${celId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
    
                    if (!response.ok) {
                        console.log("Error al eliminar el celular");
                        return;
                    }
    
                    const result = await response.json();
                    console.log("Celular eliminado", result);
    
                    toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Celular eliminado correctamente', life: 3000 });
                    getDataCel(); // Actualiza los celulares en la vista
                } catch (error) {
                    console.log("Error en la eliminación", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al eliminar el celular', life: 3000 });
                }
            },
            reject
        });
    };
    
    const editCel = async (celId) => {
        confirmDialog({
            message: '¿Está seguro que desea editar este celular?',
            header: 'Editar Celular',
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
    
                    const response = await fetch(`http://localhost:5000/celulares/${celId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedData) // Enviar los nuevos datos
                    });
    
                    if (!response.ok) {
                        console.log("Error al actualizar el celular");
                        return;
                    }
    
                    const updatedCel = await response.json();
                    console.log("Celular actualizado", updatedCel);
    
                    toast.current.show({ severity: 'success', summary: 'Actualización completada', detail: 'Celular actualizado correctamente', life: 3000 });
                    getDataModel(); // Actualiza los usuarios en la vista
                } catch (error) {
                    console.log("Error en la actualización", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el celular', life: 3000 });
                }
            },
            reject
        });
    };
    
    
    /* const bodyMarca = (rowData) => {
        return (
            <span>{rowData.nombre}</span>
        );
    }; */

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label="Editar" onClick={() => editCel(rowData.id)} className="p-button-info"/> {/*Llamada a la función de editar con el ID del modelo */}
                <Button icon='pi pi-trash' label="Eliminar" onClick={() => deleteCel(rowData.id)} className="p-button-danger" /> {/* Llamada a la función de eliminar con el ID del modelo */}
            </div>
        );
    };
    
    return (
        <Fragment>
            <h1>Celular</h1>
            <Button label="Agregar Celular" icon="pi pi-phone"/>
            
            {loadingCel ? 
                <ProgressSpinner /> : 
                <DataTable value={Array.isArray(dataCel) ? dataCel : []} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="usado" header="Uso"></Column>
                    <Column field="precio" header="Precio"></Column>
                    <Column field="proveedor_id" header="Proveedor"></Column>
                    <Column field="especificacion_id" header="Especificaciones"></Column>
                    <Column field="modelo_id" header="Modelo"></Column>
                    <Column field="gama_id" header="Gama"></Column>
                    <Column field="sistema_operativo_id" header="Sistema Operativo"></Column>
                    <Column header="Acciones" body={bodyActions}></Column>
                </DataTable>
            }

            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    )
}

export default CelView