import { createContext } from "react";
import { Userdata } from "../types/types";

//context and type related to user information
interface UserInformationContextType {
  userInformation: Userdata | undefined;
  setUserInformation: React.Dispatch<
    React.SetStateAction<Userdata | undefined>
  >;
}
export const UserInformationContext = createContext<
  UserInformationContextType | undefined
>(undefined);
