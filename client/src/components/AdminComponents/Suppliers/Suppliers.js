import React, {useState, useEffect} from 'react';
import './Suppliers.css';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import SupplierForm from '../SupplierForm/SupplierForm';
import {EditOutlined, DeleteOutlined, ArrowDownwardOutlined} from '@material-ui/icons';
import { CSVLink } from 'react-csv';
import SearchBar from "material-ui-search-bar";
import {useHistory} from 'react-router';

const Suppliers = ({suppliers, remove, setSuppliersState}) => {
    const [searched, setSearched] = useState("");
    const history = useHistory();

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'supplier_name', headerName: 'Supplier Name', width: 220, editable: true },
        { field: 'supplier_address', headerName: 'Supplier Address', width: 270, editable: true },
        { field: 'actions', headerName: 'Actions', width: 200, editable: true, sortable: false, 
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
                            <EditOutlined />
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
                            <DeleteOutlined />
                            Delete
                        </Button>
                    </>
                );
            }
        },
    ];

    const rows = suppliers.map(supplier => {
        return { id: supplier.supplierid, supplier_name: supplier.supplier_name, supplier_address: supplier.supplier_address, };
    });

    const [filRows, setFilRows] = useState(rows);

    useEffect(() => {
        setFilRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suppliers]);

    const requestSearch = (searchedVal) => {
        const filteredRows = rows.filter((row) => {
            return row.supplier_name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setFilRows(filteredRows);
    };
    
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleClick = (event, values, type) => {
        event.stopPropagation();
        // console.log(event);
        // console.log(values);
        if(type === "update") {
            history.push(`/admin?supplier_update=${values.id}`);
        };
        if(type === "delete") {
            remove(values.id);
        };
    };

    return (
        <div className="suppliers">
            <div className="suppliersWrapper">
                <div className="supplierExport">
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                        placeholder="Enter search key..."
                        className="searchBar"
                    />
                    <Button className="export-btn" variant="contained" color="secondary" size="medium">
                        <ArrowDownwardOutlined />&nbsp;
                        <CSVLink className="export" data={rows} filename="Suppliers">Export</CSVLink>
                    </Button>
                </div>
                <div className="supplierInfo">
                    <SupplierForm setSuppliersState={setSuppliersState} />
                    <div className="supplierList">
                        <DataGrid
                            rows={filRows.length > 0 ? filRows : rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Suppliers;
