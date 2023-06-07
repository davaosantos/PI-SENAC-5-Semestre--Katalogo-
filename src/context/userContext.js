import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null); // Adicione o estado do profile

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const updateProfile = (newProfile) => { // Adicione a função para atualizar o profile
    setProfile(newProfile);
  };

  return (
    <UserContext.Provider value={{ username, updateUsername, profile, updateProfile }}> 
      {children}
    </UserContext.Provider>
  );
};
