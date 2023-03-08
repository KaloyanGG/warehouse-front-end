
export const Error = ({ error }: any) => {
    // console.log('Error: \n');
    // console.log(error);
    return (
        <div>
            <h1>Something went wrong</h1>
            <h2>{error.message}</h2>
        </div>
    )
}