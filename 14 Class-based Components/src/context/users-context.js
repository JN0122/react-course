import React from 'react';

const users = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' }
];

export const UsersContext = React.createContext({
  users: []
});

export const UserProvider = ({ children }) => {
  return <UsersContext.Provider value={{users}}>
    {children}
  </UsersContext.Provider>
}