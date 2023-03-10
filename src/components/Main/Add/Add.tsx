import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { type } from '@testing-library/user-event/dist/type';
import { count } from 'console';
import './Add.scss';
import { useState } from 'react';
import { Product } from '../../../interfaces/product-interface';
import { types } from '../../../enums/product-type-enum';
import { addProduct } from '../../../utils/product-requests';
import productAddSchema from '../../../schema/product-add.schema';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';

export default function Add() {


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [buyPrice, setBuyPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const [count, setCount] = useState(0);
    const [type, setType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            name,
            description,
            photo,
            buyPrice: Number(buyPrice),
            sellPrice: Number(sellPrice),
            count: Number(count),
            type
        } as any;

        try {
            await productAddSchema.parseAsync(data);
            const response = await addProduct(data);
            if (response.ok) {
                navigate('/');
            } else {
                console.log(response);
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
        <form onSubmit={handleSubmit}>
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
