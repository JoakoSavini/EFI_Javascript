import { ProgressSpinner } from "primereact/progressspinner";
import { Fragment } from "react";

const MarcaView = ({ loadingBrand, dataBrand }) => {
    return (
        <Fragment>
            {loadingBrand ? <ProgressSpinner /> : dataBrand.map((marca) => (
                <div key={marca.id}>
                    <h2>Nombre: {marca.nombre}</h2>
                </div>
            ))}
        </Fragment>
    );
};

export default MarcaView;
