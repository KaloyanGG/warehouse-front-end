import { Container, Button, TableContainer, Paper, TablePagination, Table, TableFooter, TableHead, TableRow, TableCell, TableBody, MenuItem, Select, FormControl, TextField, SelectChangeEvent } from "@mui/material";
import { useState, useEffect, useContext, FormEvent } from "react";
import { getAllProducts, deleteProduct } from "../../../../utils/product-requests";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { types } from "../../../../enums/product-type-enum";
import './WarehouseItems.scss';
import { LastSearchContext } from "../../../../context/LastSearchContext";
import { styled } from '@mui/system';
import TablePaginationUnstyled, {
    tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';
import Image from 'mui-image';


const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;



export const WarehouseItems = () => {
    const [itemsFromDb, setItemsFromDb] = useState([]);
    const [items, setItems] = useState([]);

    const { lastSearch, setLastSearch } = useContext(LastSearchContext);
    const [name, setName] = useState(lastSearch.name);
    const [id, setId] = useState(lastSearch.id);

    const [type, setType] = useState(lastSearch.type);
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const navigate = useNavigate();
    useEffect(() => {
        getAllProducts()
            .then((response) => {
                setItems(response.data);
                setItemsFromDb(response.data);
            })
            .catch((e) => {
                console.log(e);
            })

    }, []);

    const deleteHandler = async (id: any) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
            setItems(items.filter((item: any) => item._id !== id));
            setItemsFromDb(itemsFromDb.filter((item: any) => item._id !== id));
            setPage(0);
        }
    }
    function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = { name, type, id }
        setLastSearch(data);
        if (data.id.trim()) {
            setItems(itemsFromDb.filter((item: any) => item._id === data.id));
            return;
        }
        setItems(itemsFromDb.filter((item: any) => item.name.toLowerCase().includes(data.name.toLowerCase()) && (data.type === 'Всички' || item.type === data.type)));
        //refresh the pagination
        setPage(0);
    }
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // console.log(items);

    return (

        <>
            <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button sx={{ width: 0.25 }} onClick={() => navigate('/products/add')} component={RouterLink} to="/products/add" variant="contained">Add new product</Button>
                <form className="search-form" onSubmit={search}>
                    <FormControl sx={{ width: 0.3 }} >
                        <TextField
                            disabled={!!id.trim()}
                            onChange={(e) => setName(e.target.value)}
                            defaultValue={name}
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
                            onChange={(e) => setId(e.target.value)}
                            defaultValue={id}
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
                            disabled={!!id.trim()}
                            onChange={handleChange}
                            value={type}
                            sx={{ height: 1, margin: 0 }}
                            className='selectEmpty'
                            id="type"
                            name="type"
                        >
                            <MenuItem value="Всички">
                                Всички
                            </MenuItem>
                            {types.map((typee) => (
                                <MenuItem key={typee} value={typee}>{typee}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit">Търси</Button>
                </form>
            </Container>

            <TableContainer component={Paper} sx={{ height: 440 }}>
                <Table stickyHeader aria-label="sticky table" sx={{ position: 'relative' }}>

                    <TableHead>
                        <TableRow>
                            <TableCell>Product name</TableCell>
                            <TableCell align='right'>count</TableCell>
                            <TableCell align='right'>Description</TableCell>
                            <TableCell align='right'>Buy price</TableCell>
                            <TableCell align='right'>Sell price</TableCell>
                            <TableCell align='right'>Type</TableCell>
                            <TableCell align='right'>Id</TableCell>
                            <TableCell align='right'>Photo</TableCell>
                            <TableCell align='right'>Actions</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {items.length === 0 ?
                            <TableRow>
                                <TableCell colSpan={7} align='center'>Няма намерени продукти</TableCell>
                            </TableRow>
                            : (rowsPerPage > 0
                                ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : items).map((item: any) => (
                                    <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{item.name}</TableCell>
                                        <TableCell align="right">{item.count}</TableCell>
                                        <TableCell align="right">{item.description}</TableCell>
                                        <TableCell align="right">{item.buyPrice}</TableCell>
                                        <TableCell align="right">{item.sellPrice}</TableCell>
                                        <TableCell align="right">{item.type}</TableCell>
                                        <TableCell align="right">{item._id}</TableCell>
                                        <TableCell align="right">
                                            <Image height="100%" fit="contain" duration={0} src={"data:image/png;base64," + item.photo} />
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button variant="outlined" color="success" component={RouterLink} to={`/edit/${item._id}`}>Редактиране</Button>
                                            <Button onClick={() => deleteHandler(item._id)} variant="outlined" color="success">Изтриване</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                    </TableBody>
                    <TableFooter sx={{ position: 'sticky', zIndex: 10, bottom: 0, backgroundColor: 'red' }}>

                        <TableRow>
                            <CustomTablePagination
                                rowsPerPageOptions={[3, 5, 7, { label: 'All', value: -1 }]}
                                colSpan={9}
                                align='center'
                                count={items.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        'aria-label': 'rows per page',
                                    },
                                    actions: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                    } as any,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>

                    </TableFooter>


                </Table>
            </TableContainer>


        </>


    )

}