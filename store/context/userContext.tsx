import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

export interface UserData {
  idToken: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  teamName?: string;
  birthDate?: string;
}

interface UserContextType {
  user: UserData;
  setUser: Dispatch<SetStateAction<UserData>>;
}

const defaultUserValues: UserData = {
  idToken: '',
  email: '',
  displayName: '',
  firstName: '',
  lastName: '',
  teamName: '',
  birthDate: '',
};

export const UserContext = createContext<UserContextType>({
  user: defaultUserValues,
  setUser: () => {},
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData>(defaultUserValues);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
