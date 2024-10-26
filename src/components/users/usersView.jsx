import {ProgressSpiner } from "primereact/progressspinner"
import { Fragment } from "react"

const UsersView = ({loadingUsers, dataUsers}) => {
    return (
        <Fragment>
            {loadingUsers ? <ProgressSpiner/> : dataUsers.map((user) => (
                <div key={user.id}>
                    <h3>Nombre: {user.username}</h3>
                    <h5>Rol: {user.idAdmin ? "Admin" : "Usuario"}</h5>
                </div>
            
            )) }
        </Fragment>
    )
}

export default UsersView