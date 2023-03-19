import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import './SendEmail.scss'
import { Form } from 'react-router-dom';
import { sendEmail } from '../../../../../utils/user-requets';

interface IProps {
    popup: () => void;
}

export const SendEmail = ({ popup }: IProps) => {

    async function onSubmitHandle(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get("email"));

        const response = await sendEmail(formData.get("email") as string);

        if (response.status === 200) {
            alert("Email sent");
        } else {
            alert("Email sending failed");
        }

    }

    return (
        <div className="overlay" id="overlay">
            <Stack sx={{ padding: '3%' }} spacing={2} className="popup">
                <button className="close-btn" onClick={popup}>&times;</button>
                <Typography component="h1" textAlign={'center'} variant="h5">
                    Tell use your email!
                </Typography>
                <form onSubmit={onSubmitHandle}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <Button fullWidth variant='contained' type="submit">
                        Submit
                    </Button>
                </form>
            </Stack>
        </div>
    );
}