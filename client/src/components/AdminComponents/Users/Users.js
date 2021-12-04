import React, {useState, useEffect} from 'react';
import './Users.css';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router';
import {EditOutlined, DeleteOutlined, AddCircleOutline, ArrowDownwardOutlined} from '@material-ui/icons';
import { CSVLink } from 'react-csv';
import SearchBar from "material-ui-search-bar";

const Users = ({users, remove}) => {
    const history = useHistory();
    const [searched, setSearched] = useState("");

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'username', headerName: 'Username', width: 150, editable: true },
        { field: 'email', headerName: 'Email', width: 250, editable: true },
        { field: 'password', headerName: 'Password', width: 250, editable: true, sortable: false, },
        { field: 'role', headerName: 'Role', width: 160, sortable: false, },
        { field: 'is_active', headerName: 'Active', width: 100, editable: true, sortable: false, },
        { field: 'actions', headerName: 'Actions', width: 220, sortable: false, 
            renderCell: (cellValues) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={(event) => {
                                handleClick(event, cellValues, "update");
                            }}
                        >
                            <EditOutlined />&nbsp;
                            Edit
                        </Button>
                        &emsp;
                        <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            onClick={(event) => {
                                handleClick(event, cellValues, "delete");
                            }}
                        >
                            <DeleteOutlined />&nbsp;
                            Delete
                        </Button>
                    </>
                );
            }
        },
    ];

    const rows = users.map((user) => {
        return { id: user.userid, username: user.username, email: user.email, password: user.password, role: user.role, is_active: user.is_active ? "Active" : "BLock" };
    });

    const [filRows, setFilRows] = useState(rows);

    useEffect(() => {
        setFilRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users])

    const requestSearch = (searchedVal) => {
        const filteredRows = rows.filter((row) => {
            return row.username.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setFilRows(filteredRows);
    };
    
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleClick = (event, values, type) => {
        event.stopPropagation();
        // console.log(type);
        // console.log(values);
        if(type === "update") {
            history.push(`/admin/user/update/${values.id}`);
        };
        if(type === "delete") {
            remove(values.id);
        };
    };

    return (
        <div className="users">
            <div className="usersWrapper">
                <div className="userCreate">
                    <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={() => history.push("/admin/user/create")}
                    ><AddCircleOutline />&nbsp; Create</Button>
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                        placeholder="Enter search key..."
                        className="searchBar"
                    />
                    <Button className="export-btn" variant="contained" color="secondary" size="medium">
                        <ArrowDownwardOutlined />&nbsp;
                        <CSVLink className="export" data={rows} filename="UserAccount">Export</CSVLink>
                    </Button>
                </div>
                <div className="userList">
                    <DataGrid
                        rows={filRows.length > 0 ? filRows : rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </div>
    )
}

export default Users;
