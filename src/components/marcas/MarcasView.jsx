import { ProgressSpinner } from "primereact/progressspinner";
import { Fragment, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";

const MarcasView = ({ loadingBrand, dataBrand, getDataBrand }) => {

    const toast = useRef(null);
    
    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Marca eliminada correctamente', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Eliminación rechazada', detail: 'Se ha cancelado la eliminación', life: 3000 });
    };

    const deleteBrand = async (marcaId) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar esta marca?',
            header: 'Eliminar Marca',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token'); 
                    
                    const response = await fetch(`http://localhost:5000/marcas/${marcaId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
    
                    if (!response.ok) {
                        console.log("Error al eliminar la marca");
                        return;
                    }
    
                    const result = await response.json();
                    console.log("Marca eliminada", result);
    
                    toast.current.show({ severity: 'success', summary: 'Eliminación completada', detail: 'Marca eliminada correctamente', life: 3000 });
                    getDataBrand(); // Corrige aquí llamando al método correcto
                } catch (error) {
                    console.log("Error en la eliminación", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al eliminar la marca', life: 3000 });
                }
            },
            reject
        });
    };

    const editBrand = async (marcaId) => {
        confirmDialog({
            message: '¿Está seguro que desea editar esta marca?',
            header: 'Editar Marca',
            acceptLabel: 'Sí',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-info',
            accept: async () => {
                try {
                    const token = localStorage.getItem('token');
                    
                    const updatedData = { nombre: "NuevaMarca" };
    
                    const response = await fetch(`http://localhost:5000/marcas/${marcaId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedData)
                    });
    
                    if (!response.ok) {
                        console.log("Error al actualizar la marca");
                        return;
                    }
    
                    const updatedMarca = await response.json();
                    console.log("Marca actualizada", updatedMarca);
    
                    toast.current.show({ severity: 'success', summary: 'Actualización completada', detail: 'Marca actualizada correctamente', life: 3000 });
                    getDataBrand();
                } catch (error) {
                    console.log("Error en la actualización", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar la Marca', life: 3000 });
                }
            },
            reject
        });
    };

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label="Editar" onClick={() => editBrand(rowData.id)} className="p-button-info"/>
                <Button icon='pi pi-trash' label="Eliminar" onClick={() => deleteBrand(rowData.id)} className="p-button-danger" />
            </div>
        );
    };

    return (
        <Fragment>
            <h1>Marcas</h1>
            <Button label="Agregar Marca" icon="pi pi-user-plus"/>
            
            {loadingBrand ? 
                <ProgressSpinner /> : 
                <DataTable value={Array.isArray(dataBrand) ? dataBrand : []} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column header="Acciones" body={bodyActions}></Column>
                </DataTable>
            }

            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    );
};

export default MarcasView;
