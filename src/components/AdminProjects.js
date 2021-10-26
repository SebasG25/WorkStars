import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'


export default function AdminProjects(props) {

    const [data, setData] = useState([])

    const getData = async () => {
        const res = await axios.get('http://localhost:3001/projects')
        await setData(res.data)
    }

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:3001/projects')
            await setData(res.data)
        }
        fetchData()
    }, [])

    const columns = [
        {
            title: 'ID',
            field: 'id'
        },
        {
            title: 'Nombre del Proyecto',
            field: 'name'
        },
    ]

    return (
        <div className="container">
            <MaterialTable
                title='Proyectos'
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Agregar Proyecto',
                        isFreeAction: true,
                        onClick: (event) => props.history.push(`/admin/create/project`),
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Editar Proyecto',
                        onClick: (event, rowData) => alert('Has presionado editar al proyecto: ' + rowData.name),
                        iconProps: { color: "primary" }
                    },
                    {
                        icon: 'search',
                        tooltip: 'Ver Colaboradores',
                        onClick: (event, rowData) => props.history.push(`/admin/projects/${rowData.id}/collaborators`),
                        iconProps: { color: "primary" }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar Proyecto',
                        onClick: async (event, rowData) => {
                            if (window.confirm("You want to delete " + rowData.name)) {
                                await axios.delete(`http://localhost:3001/projects/${rowData.id}`)
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

