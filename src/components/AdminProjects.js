import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Modal, Button } from "react-bootstrap";

const MySwal = withReactContent(Swal)

export default function AdminProjects(props) {

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [projectData, setProjectData] = useState({})

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
            align: 'center'
        }
    ]

    const handleClose = () => {
        setShow(!show);
    };

    const onInputChange = (e) => {
        setProjectData({
            ...projectData,
            name: e.target.value
        })
    }

    const editProject = async () => {
        try {
            delete projectData.tableData
            await axios.put(`http://localhost:3001/projects/${projectData.id}`, projectData)
            MySwal.fire({
                icon: 'success',
                title: 'Proyecto editado correctamente!',
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
        handleClose();
    };

    return (
        <div className="container">
            <MaterialTable
                localization={{
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
                        onClick: (event, rowData) => {
                            setShow(true)
                            setProjectData(rowData)
                        },
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
                                title: `${rowData.collaborators.length !== 0 ? 
                                `¿Estás seguro de que quieres eliminar el proyecto ${rowData.name} con ${rowData.collaborators.length} colaboradores?` 
                                : `¿Estás seguro de que quieres eliminar el proyecto ${rowData.name}` }`,
                                icon: 'warning',
                                showDenyButton: true,
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonText: `Cancelar`,
                                denyButtonText: `Eliminar`,
                            }).then(async (result) => {
                                if (result.isDenied) {
                                    try {
                                        await axios.delete(`http://localhost:3001/projects/${rowData.id}`)
                                        MySwal.fire({
                                            icon: 'success',
                                            title: 'Proyecto eliminado!',
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edita el nombre de tu proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row justify-content-center">
                        <input className="inp px-2" type="text" name="name" placeholder="Project Name" value={projectData?.name} onChange={onInputChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={editProject}>
                        Editar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

