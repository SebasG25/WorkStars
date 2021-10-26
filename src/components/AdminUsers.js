import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'


export default function AdminProjects(props) {
    const [data, setData] = useState([])

    const getData = async () => {
        const res = await axios.get('http://localhost:3001/users')
        setData(res.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            title: 'ID',
            field: 'id'
        },
        {
            title: 'Nombre',
            field: 'name'
        },
        {
            title: 'Email',
            field: 'email'
        },
        {
            title: 'Contraseña',
            field: 'password'
        }
    ]

    return (
        <div className="container">
            <MaterialTable
                title='Usuarios'
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Agregar Usuario',
                        isFreeAction: true,
                        onClick: (event) => props.history.push(`/signup`),
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Editar Usuario',
                        onClick: (event, rowData) => alert('Has presionado editar al usuario: ' + rowData.name),
                        iconProps: { color: "primary" }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar Usuario',
                        onClick: async (event, rowData) => {
                            if (window.confirm("You want to delete " + rowData.name)) {
                                await axios.delete(`http://localhost:3001/users/${rowData.id}`)
                                getData();
                            }
                        },
                        iconProps: { color: "error" }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header: {
                        actions: 'Acciones'
                    }
                }}
            >

            </MaterialTable>
        </div>
    )
}

