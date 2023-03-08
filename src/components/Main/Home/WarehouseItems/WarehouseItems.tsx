import { Container, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { getAllProducts, deleteProduct } from "../../../../utils/product-requests";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";


export const WarehouseItems = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        getAllProducts()
            .then((response) => {
                setItems(response.data);
                // console.log(items);
            })
            .catch((e) => {
                // console.log(e);
            })

    }, []);

    const deleteHandler = async (id: any) => {
        await deleteProduct(id);
        setItems(items.filter((item: any) => item._id !== id));
    }

    return (

        <>
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => navigate('/products/add')} component={RouterLink} to="/products/add" variant="contained">Add new product</Button>
            </Container>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">

                    <TableHead>
                        <TableRow>
                            <TableCell>Product name</TableCell>
                            <TableCell align='right'>count</TableCell>
                            <TableCell align='right'>Description</TableCell>
                            <TableCell align='right'>Buy price</TableCell>
                            <TableCell align='right'>Sell price</TableCell>
                            <TableCell align='right'>Type</TableCell>
                            <TableCell align='right'>Id</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items.map((item: any) => (
                            <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{item.name}</TableCell>
                                <TableCell align="right">{item.count}</TableCell>
                                <TableCell align="right">{item.description}</TableCell>
                                <TableCell align="right">{item.buyPrice}</TableCell>
                                <TableCell align="right">{item.sellPrice}</TableCell>
                                <TableCell align="right">{item.type}</TableCell>
                                <TableCell align="right">{item._id}</TableCell>
                                <TableCell align='right'>
                                    <Button variant="outlined" color="success" component={RouterLink} to={`/edit/${item._id}`}>Редактиране</Button>
                                    <Button onClick={() => deleteHandler(item._id)} variant="outlined" color="success">Изтриване</Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer></>


    )
}