import { useContext, useState } from 'react';
import './Home.scss'
import { WarehouseItems } from './WarehouseItems/WarehouseItems';
import { Login } from './Login/Login';
import { UserContext } from '../../../context/UserContext';


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

  // const [value, setValue] = useState(false);
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser
        ? <WarehouseItems />
        : <Login />}
    </>
  );
}

