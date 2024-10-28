import {ProgressSpinner } from "primereact/progressspinner"
import { Fragment } from "react"

const MarcaView = ({loadingMarca, dataMarca}) => {
    return (
        <Fragment>
            {loadingMarca ? <ProgressSpinner/> : dataMarca.map((marca) => (
                <div key={marca.id}>
                    <h2>Nombre: {marca.nombre}</h2>
                </div>
            
            )) }
        </Fragment>
    )
}

export default MarcaView