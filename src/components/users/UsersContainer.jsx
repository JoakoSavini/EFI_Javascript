import { useState, useEffect, Fragment } from 'react';
import UsersView from './UsersView';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const UsersContainer = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUser, setNewUser] = useState({ usuario: '', contrasenia: '' });

    const getDataUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/users", {
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
                setDataUsers(results);
            } else {
                console.error("La respuesta no es un array:", results);
            }
        } catch (error) {
            console.error("Hubo un error en la API:", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    // Función para agregar un nuevo usuario
    const handleAddUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                setShowAddUserModal(false);
                setNewUser({ usuario: '', contrasenia: '' });
                getDataUsers(); // Recargar los usuarios después de agregar uno nuevo
            } else {
                const errorData = await response.json();
                console.error("Error al agregar el usuario:", errorData.mensaje || response.statusText);
            }
        } catch (error) {
            console.error("Hubo un error en la API:", error);
        }
    };

    useEffect(() => {
        getDataUsers();
    }, []);

    return (
        <Fragment>
            {/* Botón para abrir el modal de agregar usuario */}
            <Button label="Agregar Usuario" icon="pi pi-user-plus" onClick={() => setShowAddUserModal(true)} />

            {/* Modal de agregar usuario */}
            <Dialog
                header="Agregar Usuario"
                visible={showAddUserModal}
                style={{ width: '400px' }}
                onHide={() => setShowAddUserModal(false)}
            >
                <div className="p-field">
                    <label htmlFor="usuario">Nombre de Usuario</label>
                    <InputText
                        id="usuario"
                        value={newUser.usuario}
                        onChange={(e) => setNewUser({ ...newUser, usuario: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="contrasenia">Contraseña</label>
                    <InputText
                        id="contrasenia"
                        type="password"
                        value={newUser.contrasenia}
                        onChange={(e) => setNewUser({ ...newUser, contrasenia: e.target.value })}
                    />
                </div>
                <Button label="Agregar" icon="pi pi-check" onClick={handleAddUser} className="mt-3" />
            </Dialog>

            {/* Vista de usuarios */}
            <UsersView loadingUsers={loadingUsers} dataUsers={dataUsers} getDataUsers={getDataUsers} />
        </Fragment>
    );
};

export default UsersContainer;
