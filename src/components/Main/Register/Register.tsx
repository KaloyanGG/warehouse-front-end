import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import './Register.scss';
import { register } from '../../../utils/user-requets';
import { useNavigate } from 'react-router-dom';
import userRegisterSchema from '../../../schema/user-register.schema';
import { ZodError } from 'zod';



export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const data = {
                username: formData.get('username') as string,
                password: formData.get('password') as string,
                repeatPassword: formData.get('repeatPassword') as string
            };
            await userRegisterSchema.parseAsync(data);

            const response = await register(data);
            if (response.status === 409) {
                throw new Error('Username already exists');
            }
            if (response.status !== 201) {
                throw new Error('Failed to register');
            }

            console.log('Registration successful!');
            navigate('/');

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
            <Typography variant="h4">Register</Typography>
            <TextField
                name='username'
                label="Username"
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value);
                    console.log(username);
                }}
                fullWidth={true}
                sx={{ m: 1 }}
                required
            />
            <TextField
                name='password'
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth={true}
                sx={{ m: 1 }}
                required
            />
            <TextField
                name='repeatPassword'
                label="Repeat Password"
                type="password"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                fullWidth={true}
                sx={{ m: 1 }}
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Register
            </Button>
        </form>
    );
};

