import {ProgressSpiner } from "primereact/progressspinner"
import { Fragment } from "react"

const ModelView = ({loadingModel, dataModel}) => {
    return (
        <Fragment>
            {loadingModel ? <ProgressSpiner/> : dataModel.map((model) => (
                <div key={prov.id}>
                    <h2>Nombre: {model.nombre}</h2>
                    <h2>Marca: {model.marca.nombre}</h2>
                </div>
            
            )) }
        </Fragment>
    )
}

export default ModelView