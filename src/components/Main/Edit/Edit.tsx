import { useLoaderData } from "react-router-dom";

export function Edit() {
    let product = useLoaderData();
    return (
        <div>
            <h1>{product as any}</h1>
        </div>
    )
}