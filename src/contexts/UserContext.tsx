import { createContext, useContext, useState } from 'react';
import IChildren from '../interfaces/IChildren';
import { AuthClient } from '@dfinity/auth-client';
import { iiUrl } from '../configs/InternetIdentityConfig';
import IUser from '../interfaces/IUser';

interface IUserContext {
  login: () => Promise<void>;
  register: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | null;
  principal: string | null;
}

export function UserProvider({ children }: IChildren) {
  const authClient = AuthClient.create();
  const [user, setUser] = useState<IUser | null>({} as IUser);
  const [principal, setPrincipal] = useState<string>('');

  async function login() {
    try {
      (await authClient).login({
        identityProvider: iiUrl,
      });

      const identity = (await authClient).getIdentity();
      const principal = identity.getPrincipal().toString();

      console.log('Principal: ', principal);
      setPrincipal(principal);
    } catch (error) {
      console.error(error);
    }
  }

  async function register(username: string) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    setPrincipal('');
  }

  const data = { login, register, user, logout, principal };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
