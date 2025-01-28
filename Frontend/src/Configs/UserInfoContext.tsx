import { useState, ReactNode } from "react";
import { Userdata } from "../types/types";
import { UserInformationContext } from "./Contexts";
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
