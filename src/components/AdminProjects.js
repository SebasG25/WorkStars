import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
            title: 'ID Proyecto',
            field: 'id',
            align: 'center',
        },
        {
            title: 'Nombre del Proyecto',
            field: 'name'
        },
        {
            title: 'Cantidad de colaboradores',
            render: rowData => rowData.collaborators.length,
            align: 'center',
        }
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
                        onClick: (event, rowData) => MySwal.fire({
                            icon: 'success',
                            title: 'Has presionado editar al proyecto: ' + rowData.name,
                            showConfirmButton: false,
                            timer: 1000
                        }),
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
                            MySwal.fire({
                                title: `¿Estás seguro de que quieres eliminar el proyecto: ${rowData.name}?`,
                                icon: 'warning',
                                showDenyButton: true,
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonText: `Cancelar`,
                                denyButtonText: `Confirmar`,
                            }).then(async (result) => {
                                if (result.isDenied) {
                                    try {
                                        await axios.delete(`http://localhost:3001/projects/${rowData.id}`)
                                        MySwal.fire({
                                            icon: 'success',
                                            title: 'Usuario eliminado!',
                                            showConfirmButton: false,
                                            timer: 1000
                                        })
                                        getData();
                                    } catch (error) {
                                        console.log(error)
                                        MySwal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Algo salió mal!',
                                            footer: `<p>${error.name}: ${error.message}</p>`
                                        })
                                        
                                    }

                                }
                            })
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

