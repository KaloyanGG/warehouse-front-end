import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from "react-router-dom";
import { Register } from "./components/Main/Register/Register";
import { getProductById } from "./utils/product-requests";
import Home from "./components/Main/Home/Home";
import { Edit } from "./components/Main/Edit/Edit";
import Add from "./components/Main/Add/Add";
import { Root } from "./Root";
import { UserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import { Error as ErrorComponent } from "./components/Error/Error";
import { whoAmI } from "./utils/user-requets";

//? on login -> set user in https://redux.js.org/api/store || use context because 
// make Router component, with the router provider and the router, and in it: determine the user routes and anonymous routes,
// with logic: session api call, determining wether the user is logged in or not, and then rendering the routes accordingly and
// setting the user in the context

export const RouterComponent = () => {

    const [myself, setMyself] = useState(undefined);
    const [error, setError] = useState(null);

    useEffect(() => {
        whoAmI().then((data) => {
            setMyself(data);
            console.log('myself: -> ', myself);
        }).catch((e) => {
            setError(e);
        })
    }, [])

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
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

    return (
        <> {error ? <ErrorComponent error={error as any} /> :
            myself === undefined
                ? <div>{typeof myself} Loading...</div>
                : <>
                    <UserContext.Provider value={myself}>
                        <RouterProvider router={router} />
                    </UserContext.Provider>
                </>}


        </>
    );
}