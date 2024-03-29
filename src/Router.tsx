import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider } from "react-router-dom";
import { Register } from "./components/Main/Register/Register";
import { getProductById } from "./utils/product-requests";
import Home from "./components/Main/Home/Home";
import { Edit } from "./components/Main/Edit/Edit";
import Add from "./components/Main/Add/Add";
import { Root } from "./Root";
import { useContext, useEffect, useState } from "react";
import { Error as ErrorComponent } from "./components/Error/Error";
import { whoAmI } from "./utils/user-requets";
import { UserContext } from "./context/UserContext";
import { LastSearchContext } from "./context/LastSearchContext";
import { ResetPassword } from "./components/Main/ResetPassword/ResetPassword";

//? on login -> set user in https://redux.js.org/api/store || use context because 
// make Router component, with the router provider and the router, and in it: determine the user routes and anonymous routes,
// with logic: session api call, determining wether the user is logged in or not, and then rendering the routes accordingly and
// setting the user in the context

export const RouterComponent = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [lastSearch, setLastSearch] = useState({
        name: "",
        id: "",
        type: "Всички"
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        whoAmI().then((data) => {
            setCurrentUser(data);
        }).catch((e) => {
            console.log('Error: ', e);
            setError(e);
        })
    }, []);

    const PrivateRoutes = () => {
        const { currentUser } = useContext(UserContext);
        if (currentUser) {
            return <Outlet />
        } else {
            return <Navigate to="/" />
        }
    }
    const PublicRoutes = () => {
        const { currentUser } = useContext(UserContext);
        if (currentUser) {
            return <Navigate to="/" />
        } else {
            return <Outlet />
        }
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route element={<PublicRoutes />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/resetPassword/:token" element={<ResetPassword />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                    <Route path="/products/add" element={<Add />} />
                    <Route path="/edit/:productId" element={<Edit />}
                        loader={async ({ params }) => {
                            const product = await getProductById(params.productId as any);
                            if (product) {
                                return product;
                            } else {
                                throw new Error("Product not found");
                            }
                        }} errorElement={<div>Product not found</div>} />
                </Route>
            </Route>

        )
    );

    function userLogin(data: any) {
        setCurrentUser(data);
    }
    function userLogout() {
        setCurrentUser(null as any);
        setLastSearch({ name: "", type: "Всички", id: "" });
    }

    // const Second = () => {
    //     console.log('Are we here 2 times?');
    //     return <div>Second</div>;
    // }

    return (
        <>
            {error ? <ErrorComponent error={error as any} /> :
                currentUser === undefined
                    ? <div>{typeof currentUser} Loading...</div>
                    : <>
                        <LastSearchContext.Provider value={{
                            lastSearch,
                            setLastSearch
                        }}>
                            {/* the moment we update current user, this refreshes */}
                            <UserContext.Provider value={{
                                currentUser,
                                userLogin,
                                userLogout
                            }}>
                                {/* <Second /> */}
                                <RouterProvider router={router} />
                            </UserContext.Provider>
                        </LastSearchContext.Provider>
                    </>}

        </>
    );
}