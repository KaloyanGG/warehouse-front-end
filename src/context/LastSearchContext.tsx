import { createContext } from 'react';

export const LastSearchContext = createContext<{
    lastSearch: {
        name: string,
        type: string,
        id: string,
    } | null, setSearch: (data: any) => void
}>({
    lastSearch: null, setSearch: (data: any) => { }
})

//TODO: made the context now give it to the app