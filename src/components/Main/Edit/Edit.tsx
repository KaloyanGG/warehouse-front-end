import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../utils/product-requests";
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, makeStyles } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import { count } from "console";
import './Edit.scss';
import { Type } from "../../../enums/product-type-enum";
import { Product } from "../../../interfaces/product-interface";
import productUpdateSchema from "../../../schema/product-update.schema";
import { ZodError } from "zod";

const types = Object.values(Type);

export function Edit() {
    const product = useLoaderData() as Product;

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [photo, setPhoto] = useState(product.photo);
    const [buyPrice, setBuyPrice] = useState(product.buyPrice);
    const [sellPrice, setSellPrice] = useState(product.sellPrice);
    const [count, setCount] = useState(product.count);
    const [type, setType] = useState(product.type);

    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            _id: product._id,
            name,
            description,
            photo,
            buyPrice: Number(buyPrice),
            sellPrice: Number(sellPrice),
            count: Number(count),
            type
        } as Product;
        try {
            await productUpdateSchema.parseAsync(data);
            const response = await updateProduct(data);
            switch (response.status) {
                case 400:
                    alert('Invalid product');
                    break;
                case 409:
                    alert('Product with this name already exists');
                    break;
                case 500:
                    alert('Server error');
                    break;
                default:
                    navigate('/');
                    break;
            }

        } catch (error: any) {
            if (error instanceof ZodError) {
                alert(error.errors[0].message);
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                margin="dense"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                fullWidth
                margin="dense"
            />
            <TextField
                label="Photo"
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
                fullWidth
                margin="dense"
            />
            <TextField
                label="Buying Price"
                value={buyPrice}
                onChange={(event) => setBuyPrice(event.target.value as any)}
                type="number"
                InputProps={{
                    inputProps: { min: 0 }
                }}
                fullWidth
                margin="dense"
            />
            <TextField
                label="Selling Price"
                value={sellPrice}
                onChange={(event) => setSellPrice(event.target.value as any)}
                type="number"
                InputProps={{
                    inputProps: { min: 0 }
                }}
                fullWidth
                margin="dense"
            />
            <TextField
                label="Count"
                value={count}
                onChange={(event) => setCount(event.target.value as any)}
                type="number"
                InputProps={{
                    inputProps: { min: 0 }
                }}
                fullWidth
                margin="dense"
            />
            <FormControl className="form-control" fullWidth margin="dense">
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    onChange={(event) => setType(event.target.value as any)}
                    className='selectEmpty'
                >
                    <MenuItem value="" disabled>
                        Select a type
                    </MenuItem>
                    {types.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Select the type of product</FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}