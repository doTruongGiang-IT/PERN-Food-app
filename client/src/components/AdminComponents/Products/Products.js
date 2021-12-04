import React, {useState, useEffect} from 'react';
import './Products.css';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router';
import {EditOutlined, DeleteOutlined, AddCircleOutline, ArrowDownwardOutlined} from '@material-ui/icons';
import { CSVLink } from 'react-csv';
import SearchBar from "material-ui-search-bar";

const Products = ({products, remove}) => {
    const history = useHistory();
    const [searched, setSearched] = useState("");

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'product_name', headerName: 'Name', width: 200, editable: true },
        { field: 'product_price', headerName: 'Price', width: 150, editable: true },
        { field: 'product_image', headerName: 'Image', width: 200, editable: true, sortable: false, renderCell: (params) => <img id="productIamgeAdmin" src={params.value} alt="foods" />},
        { field: 'product_size', headerName: 'Size', width: 100, sortable: false, },
        { field: 'product_desc', headerName: 'Description', width: 180, editable: true, sortable: false, },
        { field: 'product_type', headerName: 'Type', width: 100, editable: true, sortable: false, },
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

    const rows = products.map(product => {
        return { id: product.productid, product_name: product.product_name, product_price: `$${product.product_price}`, product_image: product.product_image, product_size: product.product_size, product_desc: product.product_desc, product_type: product.product_type, };
    });

    const [filRows, setFilRows] = useState(rows);

    useEffect(() => {
        setFilRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    const requestSearch = (searchedVal) => {
        const filteredRows = rows.filter((row) => {
            return row.product_name.toLowerCase().includes(searchedVal.toLowerCase());
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
            history.push(`/admin/product/update/${values.id}`);
        };
        if(type === "delete") {
            remove(values.id);
        };
    };

    return (
        <div className="products">
            <div className="productsWrapper">
                <div className="productCreate">
                    <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={() => history.push("/admin/product/create")}
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
                        <CSVLink className="export" data={rows} filename="Product List">Export</CSVLink>
                    </Button>
                </div>
                <div className="productList">
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

export default Products;
