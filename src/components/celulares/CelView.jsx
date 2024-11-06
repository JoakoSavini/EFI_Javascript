import {ProgressSpinner } from "primereact/progressspinner"
import { Fragment } from "react"

const CelView = ({loadingCel, dataCel}) => {
    return (
        <Fragment>
            {loadingCel ? <ProgressSpinner/> : dataCel.map((cel) => (
                <div key={cel.id}>
                    <h2>Nombre: {cel.nombre}</h2>
                    <p>Usado: {cel.usado ? "Sí" : "No"}</p>
                        <p>Precio: ${cel.precio}</p>
                        <p>Proveedor: {cel.proveedor}</p>
                        <p>Especificación: {cel.especificacion}</p>
                        <p>Modelo: {cel.modelo}</p>
                        <p>Gama: {cel.gama}</p>
                        <p>Sistema Operativo: {cel.sistema_operativo}</p>
                </div>
            
            )) }
        </Fragment>
    )
}

export default CelView