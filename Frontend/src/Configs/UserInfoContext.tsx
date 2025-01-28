import { createContext, useState, ReactNode } from "react";
import { Userdata } from "../types/types";

interface UserInformationContextType {
  userInformation: Userdata | undefined;
  setUserInformation: React.Dispatch<
    React.SetStateAction<Userdata | undefined>
  >;
}

const UserInformationContext = createContext<
  UserInformationContextType | undefined
>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export default function UserInformationProvider({
  children,
}: ContextProviderProps) {
  const [userInformation, setUserInformation] = useState<Userdata | undefined>(
    undefined,
  );

  return (
    <UserInformationContext.Provider
      value={{ userInformation, setUserInformation }}
    >
      {children}
    </UserInformationContext.Provider>
  );
}
