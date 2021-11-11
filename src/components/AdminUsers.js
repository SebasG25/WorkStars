import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
            title: 'ID Usuario',
            field: 'id',
            align: 'center',
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
                        icon: 'delete',
                        tooltip: 'Eliminar Usuario',
                        onClick: async (event, rowData) => {
                            MySwal.fire({
                                title: `¿Estás seguro de que quieres eliminar al usuario: ${rowData.name}?`,
                                icon: 'warning',
                                showDenyButton: true,
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonText: `Cancelar`,
                                denyButtonText: `Eliminar`,
                            }).then(async (result) => {
                                if (result.isDenied) {
                                    try {
                                        await axios.delete(`http://localhost:3001/users/${rowData.id}`)
                                        MySwal.fire({
                                            icon: 'success',
                                            title: 'Usuario eliminado!',
                                            showConfirmButton: false,
                                            timer: 1000
                                        })
                                        getData();
                                    } catch (error) {
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
                    actionsColumnIndex: -1,
                    exportButton: true
                }}
                localization={{
                    header: {
                        actions: 'Acciones'
                    },
                    toolbar: {
                        addRemoveColumns: 'Agregar o eliminar columnas',
                        exportAriaLabel: 'Exportar',
                        exportName: 'Exportar a CSV',
                        exportTitle: 'Exportar',
                        nRowsSelected: '{0} filas seleccionadas',
                        searchPlaceholder: 'Buscar',
                        searchTooltip: 'Buscar',
                        showColumnsAriaLabel: 'Mostrar columnas',
                        showColumnsTitle: 'Mostrar columnas',
                    }
                }}
            >

            </MaterialTable>
        </div>
    )
}

