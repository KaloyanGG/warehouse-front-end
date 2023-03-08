import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from "@mui/material";
import { login } from "../../../../utils/user-requets";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserContext } from "../../../../context/UserContext";
import { useContext } from "react";


export const Login = () => {

    const user = useContext(UserContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            await login({ username: data.get("username") as string, password: data.get("password") as string });
            alert("Logged in");
        } catch (e: any) {
            if (e.response.status === 401) {
                alert("Invalid credentials");
            } else {
                alert("Unhandled error");
            }
        }


    };

    return (
        <Container sx={{ height: 1 }}>
            <CssBaseline />
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="/edit" variant="body2">
                  Forgot password?
                </Link> */}
                        </Grid>
                        <Grid item>
                            {/* <Link href="#" variant="body2">
                  {"Don't have an account? Register"}
                </Link> */}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}