import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'


export default function AdminProjects(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:3001/projects')
            setData(res.data)
        }
        fetchData()
    }, [])

    const columns = [
        {
            title: 'ID',
            field: 'id'
        },
        {
            title: 'Project Name',
            field: 'name'
        },
    ]

    return (
        <div className="container">
            <MaterialTable
                title='Projects'
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add Project',
                        isFreeAction: true,
                        onClick: (event) => props.history.push(`/admin/create/project`),
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit Project',
                        onClick: (event, rowData) => alert('Has presionado editar al proyecto: ' + rowData.name),
                        iconProps: { color: "primary" }
                    },
                    {
                        icon: 'search',
                        tooltip: 'View Collaborators',
                        onClick: (event, rowData) => props.history.push(`/admin/projects/${rowData.id}/collaboratorss`),
                        iconProps: { color: "primary" }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
            >

            </MaterialTable>
        </div>
    )
}

