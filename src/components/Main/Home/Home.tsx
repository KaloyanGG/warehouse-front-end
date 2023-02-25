import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login } from '../../../utils/user-requets';
import { useEffect, useState } from 'react';
import './Home.scss'
import { getAllProducts } from '../../../utils/product-requests';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';


// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


export default function Home() {

  const [value, setValue] = useState(true);

  return (
    <>
      {value
        ? <WarehouseItems />
        : <Containerr />}


      {/* <div> sladowa nalichnost</div> */}
    </>

  );
}

function WarehouseItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {

    getAllProducts()
      .then((response) => {
        setItems(response.data);
        console.log(items);
      })
      .catch((e) => {
        console.log(e);
      })

  }, []);

  return (

    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table" >

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
          {items.map((item: any) => (
            <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{item.name}</TableCell>
              <TableCell align="right">{item.count}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">{item.buyPrice}</TableCell>
              <TableCell align="right">{item.sellPrice}</TableCell>
              <TableCell align="right">{item.type}</TableCell>
              <TableCell align="right">{item._id}</TableCell>
              <TableCell align='right'>
                <Button variant="outlined" color="success" component={RouterLink} to='/edit'>Редактиране</Button>
                <Button variant="outlined" color="success" >Изтриване</Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>


  )
}

function Containerr() {

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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