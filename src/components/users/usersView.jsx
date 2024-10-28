import {ProgressSpiner } from "primereact/progressspinner"
import { Fragment, useRef } from "react"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from "primereact/toast";
        


const UsersView = ({loadingUsers, dataUsers}) => {
    
    const toast = useRef(null)
    
    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Usuario eliminado correctamente', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Eliminación rechazada', detail: 'Se ha cancelado la eliminación', life: 3000 });
    }

    const editUsers = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    }
    
    const deleteUsers = () => {
        confirmDialog({
            message: '¿Está seguro?',
            header: 'Eliminar Usuario',
            acceptLabel: 'Si',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    }
    
    const bodyIsAdmin = (rowData) => {
        return (
            rowData.idAdmin ? 
                <span>Administrador</span>
                :
                <span>Usuario</span>
            
        )
    }

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' Editar />
                <Button icon='pi pi-trush' Eliminar onClick={() => deleteUsers()} />
            </div>
        )
    }

    return (
        <Fragment>
            
            <h1>Usuarios</h1>
            <Button label="Agregar Usuario" icon="pi pi-user-plus"/>
            
            {loadingUsers ? 
            <ProgressSpiner/> : 
                <DataTable value={dataUsers} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="username" header="Nombre"></Column>
                    <Column field="idAdmin" body={bodyIsAdmin} header="Rol"></Column>
                    <Column header="Acciones" body={bodyActions}></Column>
                </DataTable>
            }

            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    )
}

export default UsersView