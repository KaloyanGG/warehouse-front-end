import { Container, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, MenuItem, Select, FormControl, TextField, InputAdornment, IconButton } from "@mui/material";
import { useState, useEffect, useContext, FormEvent } from "react";
import { getAllProducts, deleteProduct } from "../../../../utils/product-requests";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { types } from "../../../../enums/product-type-enum";
import './WarehouseItems.scss';
import { Clear } from "@mui/icons-material";
import { text } from "stream/consumers";


export const WarehouseItems = () => {
    const [itemsFromDb, setItemsFromDb] = useState([]);
    const [items, setItems] = useState([]);
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {

        getAllProducts()
            .then((response) => {
                setItems(response.data);
                setItemsFromDb(response.data);
                // console.log(items);
            })
            .catch((e) => {
                // console.log(e);
            })

    }, []);

    const deleteHandler = async (id: any) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
            setItems(items.filter((item: any) => item._id !== id));
            setItemsFromDb(itemsFromDb.filter((item: any) => item._id !== id));
        }

    }
    // function setSearchName(value: string) {
    //     console.log(items);
    //     setItems(items.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase())));
    // }
    // function setSearch(value: string) {
    //     switch (value) {
    //         case 'Всички':
    //             setItems(itemsFromDb);
    //             break;
    //         case 'Хранителни стоки':
    //             setItems(itemsFromDb.filter((item: any) => item.type === 'Хранителни стоки'));
    //             console.log(items);
    //             break;
    //         case 'Канцеларски материали':
    //             setItems(itemsFromDb.filter((item: any) => item.type === 'Канцеларски материали'));
    //             console.log(items);

    //             break;
    //         case 'Строителни материали':
    //             setItems(itemsFromDb.filter((item: any) => item.type === 'Строителни материали'));
    //             console.log(items);

    //             break;
    //         default:
    //             break;
    //     }
    // }
    function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            id: formData.get('id') as string,
        }
        if (data.id.trim()) {
            setItems(itemsFromDb.filter((item: any) => item._id === data.id));
            return;
        }
        setItems(itemsFromDb.filter((item: any) => item.name.toLowerCase().includes(data.name.toLowerCase()) && (data.type === 'Всички' || item.type === data.type)));

        console.log(data);
    }

    const [text, setText] = useState('');
    const handleClear = () => {
        setText('');
    };

    return (

        <>
            {/* <h1>{currentUser}</h1> */}
            <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button sx={{ width: 0.1 }} onClick={() => navigate('/products/add')} component={RouterLink} to="/products/add" variant="contained">Add new product</Button>
                <form className="search-form" onSubmit={search}>
                    <FormControl sx={{ width: 0.3 }} >
                        <TextField
                            sx={{ height: 1, margin: 0 }}
                            type="text"
                            margin="dense"
                            placeholder="Наименование"
                            id="name"
                            name="name"
                        />

                    </FormControl>
                    <FormControl sx={{ width: 0.3 }} >
                        <TextField
                            sx={{ height: 1, margin: 0 }}
                            type="text"
                            margin="dense"
                            placeholder="Код"
                            id="id"
                            name="id"
                        />

                    </FormControl>
                    <FormControl sx={{ width: 0.3 }} >
                        <Select
                            sx={{ height: 1, margin: 0 }}
                            defaultValue='Всички'
                            className='selectEmpty'
                            id="type"
                            name="type"
                        >

                            <MenuItem value="Всички" >
                                Всички
                            </MenuItem>
                            {types.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit">Търси</Button>
                </form>
            </Container>

            <TableContainer component={Paper} sx={{ height: 440 }}>
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

                        {items.length === 0 ?
                            <TableRow>
                                <TableCell colSpan={7} align='center'>Няма намерени продукти</TableCell>
                            </TableRow>
                            : items.map((item: any) => (
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