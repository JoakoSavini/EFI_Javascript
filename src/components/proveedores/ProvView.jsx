import {ProgressSpinner } from "primereact/progressspinner"
import { Fragment } from "react"

const ProvView = ({loadingProv, dataProv}) => {
    return (
        <Fragment>
            {loadingProv ? <ProgressSpinner/> : dataProv.map((prov) => (
                <div key={prov.id}>
                    <h2>Nombre: {prov.nombre}</h2>
                    <h3>Localidad: {prov.localidad}</h3>
                    <h3>Contacto: {prov.contacto}</h3>
                </div>
            
            )) }
        </Fragment>
    )
}

export default ProvView