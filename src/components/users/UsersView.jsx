import { ProgressSpinner } from "primereact/progressspinner";
import { Fragment, useRef } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";

const UsersView = ({ loadingUsers, dataUsers, getDataUsers }) => {
    
    const toast = useRef(null);

    console.log("dataUsers", dataUsers); 
    
    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Usuario eliminado correctamente', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Eliminación rechazada', detail: 'Se ha cancelado la eliminación', life: 3000 });
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

    const deleteUsers = async (userId) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar este usuario?',
            header: 'Eliminar Usuario',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); // Recupera el token del Local Storage
                    
                    const response = await fetch(`http://localhost:5000/users/${userId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
    
                    if (!response.ok) {
                        console.log("Error al eliminar el usuario");
                        return;
                    }
    
                    const result = await response.json();
                    console.log("Usuario eliminado", result);
    
                    toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Usuario eliminado correctamente', life: 3000 });
                    getDataUsers(); // Actualiza los usuarios en la vista
                } catch (error) {
                    console.log("Error en la eliminación", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al eliminar el usuario', life: 3000 });
                }
            },
            reject
        });
    };
    
    const editUsers = async (userId) => {
        confirmDialog({
            message: '¿Está seguro que desea editar este usuario?',
            header: 'Editar Usuario',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-info',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); // Recupera el token del Local Storage
                    
                    // Aquí puedes obtener los nuevos valores (puedes usar un formulario o valores por defecto)
                    const updatedData = {
                        usuario: "NuevoNombre", // Nuevo nombre de usuario
                        contrasenia: "NuevaContraseña", // Nueva contraseña
                    };
    
                    const response = await fetch(`http://localhost:5000/users/${userId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedData) // Enviar los nuevos datos
                    });
    
                    if (!response.ok) {
                        console.log("Error al actualizar el usuario");
                        return;
                    }
    
                    const updatedUser = await response.json();
                    console.log("Usuario actualizado", updatedUser);
    
                    toast.current.show({ severity: 'success', summary: 'Actualización completada', detail: 'Usuario actualizado correctamente', life: 3000 });
                    getDataUsers(); // Actualiza los usuarios en la vista
                } catch (error) {
                    console.log("Error en la actualización", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el usuario', life: 3000 });
                }
            },
            reject
        });
    };
    
    
    const bodyIsAdmin = (rowData) => {
        return (
            
            rowData.isAdmin ? 
                <span>Administrador</span> :
                <span>Usuario</span>
        );
    };

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label="Editar" onClick={() => editUsers(rowData.id)} className="p-button-info"/> {/*Llamada a la función de editar con el ID del usuario */}
                <Button icon='pi pi-trash' label="Eliminar" onClick={() => deleteUsers(rowData.id)} className="p-button-danger" /> {/* Llamada a la función de eliminar con el ID del usuario */}
            </div>
        );
    };

    return (
        <Fragment>
            <h1>Usuarios</h1>
            <Button label="Agregar Usuario" icon="pi pi-user-plus"/>
            
            {loadingUsers ? 
                <ProgressSpinner /> : 
                <DataTable value={Array.isArray(dataUsers) ? dataUsers : []} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="username" header="Nombre"></Column>
                    <Column field="idAdmin" body={bodyIsAdmin} header="Rol"></Column>
                    <Column header="Acciones" body={bodyActions}></Column>
                </DataTable>
            }

            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    );
};

export default UsersView;