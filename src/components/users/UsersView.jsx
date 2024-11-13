import { ProgressSpinner } from "primereact/progressspinner";
import { Fragment, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const UsersView = ({ loadingUsers, dataUsers, getDataUsers }) => {
    const toast = useRef(null);
    
    // Estado para manejar el modal de edición
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState({ id: null, usuario: '', contrasenia: '' });

    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Usuario eliminado correctamente', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Eliminación rechazada', detail: 'Se ha cancelado la eliminación', life: 3000 });
    };

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
                    const token = localStorage.getItem('token');
                    
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

    // Función para abrir el modal de edición con los datos del usuario seleccionado
    const editUsers = (user) => {
        setUserToEdit({ id: user.id, usuario: user.username, contrasenia: '' });
        setShowEditModal(true);
    };

    const handleEditUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/users/${userToEdit.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    usuario: userToEdit.usuario,
                    contrasenia: userToEdit.contrasenia
                })
            });

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Actualización completada', detail: 'Usuario actualizado correctamente', life: 3000 });
                getDataUsers(); // Recargar los usuarios después de la edición
                setShowEditModal(false); // Cerrar el modal
            } else {
                const errorData = await response.json();
                toast.current.show({ severity: 'error', summary: 'Error', detail: errorData.Mensaje, life: 3000 });
            }
        } catch (error) {
            console.log("Error al actualizar el usuario", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el usuario', life: 3000 });
        }
    };

    const bodyIsAdmin = (rowData) => {
        return rowData.isAdmin ? <span>Administrador</span> : <span>Usuario</span>;
    };

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon="pi pi-pencil" label="Editar" onClick={() => editUsers(rowData)} className="p-button-info" />
                <Button icon="pi pi-trash" label="Eliminar" onClick={() => deleteUsers(rowData.id)} className="p-button-danger" />
            </div>
        );
    };

    return (
        <Fragment>
            <h1>Usuarios</h1>

            {loadingUsers ? (
                <ProgressSpinner />
            ) : (
                <DataTable value={Array.isArray(dataUsers) ? dataUsers : []} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="username" header="Nombre" />
                    <Column field="idAdmin" body={bodyIsAdmin} header="Rol" />
                    <Column header="Acciones" body={bodyActions} />
                </DataTable>
            )}

            {/* Modal de edición */}
            <Dialog
                header="Editar Usuario"
                visible={showEditModal}
                style={{ width: '400px' }}
                onHide={() => setShowEditModal(false)}
            >
                <div className="p-field">
                    <label htmlFor="usuario">Nombre de Usuario</label>
                    <InputText
                        id="usuario"
                        value={userToEdit.usuario}
                        onChange={(e) => setUserToEdit({ ...userToEdit, usuario: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="contrasenia">Contraseña</label>
                    <InputText
                        id="contrasenia"
                        type="password"
                        value={userToEdit.contrasenia}
                        onChange={(e) => setUserToEdit({ ...userToEdit, contrasenia: e.target.value })}
                    />
                </div>
                <Button label="Actualizar" icon="pi pi-check" onClick={handleEditUser} className="mt-3" />
            </Dialog>

            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    );
};

export default UsersView;
