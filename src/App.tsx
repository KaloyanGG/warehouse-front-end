import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Register } from "./components/Main/Register/Register";
import { getProductById } from "./utils/product-requests";
import './App.scss';
import Home from "./components/Main/Home/Home";
import { Edit } from "./components/Main/Edit/Edit";
import Add from "./components/Main/Add/Add";


const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
//todo: continue the navigation

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit/:productId" element={<Edit />}
        loader={async ({ params }) => {
          const product = await getProductById(params.productId as any);
          if (product) {
            return product;
          } else {
            throw new Error("Product not found");
          }
        }} errorElement={<div>Product not found</div>} />
      <Route path="/products/add" element={<Add />} />
    </Route>

  )
);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;




