import {ProgressSpiner } from "primereact/progressspinner"
import { Fragment } from "react"

const FabView = ({loadingFab, dataFab}) => {
    return (
        <Fragment>
            {loadingFab ? <ProgressSpiner/> : dataFab.map((fab) => (
                <div key={fab.id}>
                    <h2>Nombre: {fab.nombre}</h2>
                </div>
            
            )) }
        </Fragment>
    )
}

export default FabView