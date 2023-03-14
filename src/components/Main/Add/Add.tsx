import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import './Add.scss';
import { useState } from 'react';
import { types } from '../../../enums/product-type-enum';
import productAddSchema from '../../../schema/product-add.schema';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addProduct } from '../../../utils/product-requests';
import { toBase64 } from '../../../utils/files-utils';



export default function Add() {


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState("");
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [count, setCount] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // for (const p of formData) {
        //     console.log(p);
        // }

        if (!formData.get('count')) {
            alert('Count is required');
            return;
        }
        //todo: accept!

        if ((formData.get('photo') as any).size > 0 && !['image/png', 'image/jpeg', 'image/jpg'].includes((formData.get('photo') as any).type)) {
            alert('The photo must be a png, jpg or jpeg file');
            return;
        }

        //todo: now make it work on the server!

        const data = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            photo: (formData.get('photo') as any).size > 0
                ? (await toBase64(formData.get('photo') as File) as string).replace('data:image/png;base64,', '')
                : "",
            buyPrice: Number(formData.get('buyPrice')),
            sellPrice: Number(formData.get('sellPrice')),
            count: Number(formData.get('count')),
            type: formData.get('type') as string,
        };

        try {
            // console.log(formData.get('photo'));
            // console.log(data);

            await productAddSchema.parseAsync(data);
            const response = await addProduct(data);

            //todo: clear the things, back end too, then show the photo and fix edit

            // if (response.ok) {
            //     navigate('/');
            // } else {
            //     console.log(response);
            // }

        } catch (error: any) {
            if (error instanceof ZodError) {
                alert(error.errors[0].message);
            } else {
                alert(error.message);
            }
        }

    };

    //todo: search refresh pagination
    function handleCapture(event: any) {
        setPhoto(event.target.files[0]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                margin="dense"
                name='name'
                id='name'
            />
            <TextField
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                fullWidth
                margin="dense"
                name='description'
                id='description'
            />
            <TextField
                // value={photo}
                // onChange={(event) => setPhoto(event.target.value)}
                onChange={handleCapture}
                fullWidth
                margin="dense"
                type='file'
                name='photo'
                id='photo'
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
                name='buyPrice'
                id='buyPrice'
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
                name='sellPrice'
                id='sellPrice'
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
                name='count'
                id='count'
            />
            <FormControl className="form-control" fullWidth margin="dense">
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    onChange={(event) => setType(event.target.value as any)}
                    name='type'
                    id='type'
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
