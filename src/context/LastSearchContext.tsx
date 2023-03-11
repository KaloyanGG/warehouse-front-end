import { createContext } from 'react';

export const LastSearchContext = createContext<{
    lastSearch: {
        name: string,
        type: string,
        id: string,
    }, setLastSearch: (data: any) => void
}>({
    lastSearch: { name: "", type: "Всички", id: "" },
    setLastSearch: (data: any) => { }
})

//TODO: made the context now give it to the app