import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from "@mui/material";
import { login } from "../../../../utils/user-requets";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserContext } from "../../../../context/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { userLoginSchema } from "../../../../schema/user-login.schema";


export const Login = () => {

    const { currentUser, userLogin } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            const data = {
                username: formData.get("username") as string,
                password: formData.get("password") as string,
            };
            await userLoginSchema.parseAsync(data);
            await login(data);
            userLogin({ username: data.username });

        } catch (e: any) {
            if (e instanceof ZodError) {
                console.log(e.errors);
                alert(e.errors[0].message);
            }
            else if (e.response.status === 401) {
                alert("Invalid credentials");
            } else {
                console.log(e.response.status);
                alert("Error");
            }
        }
    };


    //todo: stack instead of box

    return (
        <Container sx={{ height: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 1
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 0 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="/edit" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            Don't have account?
                            <Link to="/register">
                                {' Register'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}