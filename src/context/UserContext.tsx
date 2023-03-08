import { createContext } from 'react';

// export const UserContext = createContext(null);

export const UserContext = createContext<{
    currentUser: any, userLogin: any, userLogout: any
}>({
    currentUser: undefined, userLogin: (data: any) => { }, userLogout: () => { }
} as any);

