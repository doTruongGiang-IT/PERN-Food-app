import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import {EditOutlined, DeleteOutlined, ArrowDownwardOutlined} from '@material-ui/icons';
import { CSVLink } from 'react-csv';
import SearchBar from "material-ui-search-bar";
import {useHistory} from 'react-router';
import './Ingredients.css';
import IngredientForm from '../IngredientForm/IngredientForm';
import { useSelector } from 'react-redux';
import { selectSuppliers } from '../../../features/supplier/supplierSlice';

const Ingredients = ({ingredients, remove, setIngredientsState}) => {
    const [searched, setSearched] = useState("");
    const history = useHistory();
    const suppliers = useSelector(selectSuppliers);

    const columns = [
        { field: 'id', headerName: 'Ingredient ID', width: 160 },
        { field: 'supp_id', headerName: 'Supplier ID', width: 170 },
        { field: 'ingredient_name', headerName: 'Name', width: 120, editable: true },
        { field: 'ingredient_price', headerName: 'Price', width: 120, editable: true },
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

    const rows = ingredients.map(ingredient => {
        let ingredientRow = { id: ingredient.ingredientid, supp_id: ingredient.supplierid, ingredient_name: ingredient.ingredient_name, ingredient_price: `$${ingredient.ingredient_price}` };
        let index = suppliers.findIndex(supplier => supplier.supplierid === ingredientRow.supp_id); 
        const name = suppliers[index].supplier_name;
        return { id: ingredient.ingredientid, supp_id: name, ingredient_name: ingredient.ingredient_name, ingredient_price: `$${ingredient.ingredient_price}` };
    });

    const [filRows, setFilRows] = useState(rows);

    useEffect(() => {
        setFilRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredients]);

    const requestSearch = (searchedVal) => {
        const filteredRows = rows.filter((row) => {
            return row.ingredient_name.toLowerCase().includes(searchedVal.toLowerCase());
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
            history.push(`/admin?ingredin_update=${values.id}`);
        };
        if(type === "delete") {
            remove(values.id);
        };
    };


    return (
        <div className="ingredients">
            <div className="ingredientsWrapper">
                <div className="ingredientExport">
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                        placeholder="Enter search key..."
                        className="searchBar"
                    />
                    <Button className="export-btn" variant="contained" color="secondary" size="medium">
                        <ArrowDownwardOutlined />&nbsp;
                        <CSVLink className="export" data={rows} filename="Ingredients">Export</CSVLink>
                    </Button>
                </div>
                <div className="ingredientInfo">
                    <IngredientForm setIngredientsState={setIngredientsState} />
                    <div className="ingredientList">
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

export default Ingredients;
