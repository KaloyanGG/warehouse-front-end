import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { logout, resetPassword } from "../../../utils/user-requets";
import { UserContext } from "../../../context/UserContext";
import passwordResetSchema from "../../../schema/reset-password.schema";
import { ZodError } from "zod";




export const ResetPassword = () => {

    const navigate = useNavigate();

    const params = useParams();
    const { userLogout } = useContext(UserContext);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        // if (formData.get("password") !== formData.get("repeatPassword")) {
        //     alert("Passwords do not match");
        //     return;
        // }

        try {
            const password = formData.get("password") as string;
            const repeatPassword = formData.get("repeatPassword") as string;

            await passwordResetSchema.parseAsync({ password, repeatPassword });

            const response = await resetPassword(password, params.token as string);

            if (response.status === 200) {
                alert("Password reset successful");
                navigate('/');
            } else {
                alert("Password reset failed");
            }


        } catch (err: any) {
            if (err instanceof ZodError) {
                alert(err.errors[0].message);
            } else {
                alert(err.message);
            }
        }

    };

    //todo: stack instead of box

    return (
        <Stack
            sx={{
                width: '50%',
                margin: 'auto'
            }}
        >
            <Typography component="h1" variant="h5" align="center">
                Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 0 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="repeatPassword"
                    label="Repeat password"
                    type="password"
                    id="repeatPassword"
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>

            </Box>
        </Stack>
    );
}