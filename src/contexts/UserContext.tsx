import { createContext, useContext, useEffect, useState } from 'react';
import IChildren from '../interfaces/IChildren';
import { AuthClient } from '@dfinity/auth-client';
import { iiUrl } from '../configs/InternetIdentityConfig';
import IUser from '../interfaces/IUser';
import { backend_user } from '../declarations/backend_user';

interface IUserContext {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | null;
}

export function UserProvider({ children }: IChildren) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function login() {
    try {
      const authClient = AuthClient.create();
      (await authClient).login({
        identityProvider: iiUrl,
      });

      const identity = (await authClient).getIdentity();
      const principal = identity.getPrincipal().toString();

      let response: any;
      response = await backend_user.getUserByPrincipalId(principal);
      if ('err' in response) {
        await backend_user.createUser({
          id: BigInt(0),
          principalId: principal,
          balance: BigInt(0),
        });
        response = await backend_user.getUserByPrincipalId(principal);
      }

      const userData: IUser = {
        principalId: response.ok[1].principalId,
        balance: Number(response.ok[1].balance),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    setUser(null);
    localStorage.setItem('user', '');
  }

  const data = { user, login, logout };

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
