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
            title: 'Name',
            field: 'name'
        },
        {
            title: 'Email',
            field: 'email'
        },
        {
            title:'Password',
            field: 'password'
        }
    ]

    return (
        <div className="container">
            <MaterialTable
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => props.history.push(`/signup`),
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => alert('Has presionado editar al usuario: ' + rowData.name),
                        iconProps: {color: "primary"}
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: async (event, rowData) => {
                            if(window.confirm("You want to delete " + rowData.name)){
                                await axios.delete(`http://localhost:3001/users/${rowData.id}`)
                                getData();
                            } 
                        },
                        iconProps: {color: "error"}
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

