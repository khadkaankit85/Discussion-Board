import { useContext } from "react";
import { UserInformationContext } from "../Configs/Contexts";

const UserProfile = () => {
  const userContext = useContext(UserInformationContext);

  if (!userContext?.userInformation) {
    return (
      <div> there is no user context in authenticated route which is wrong</div>
    );
  }
  return (
    <div> you are not supposed to be here unless you are authenticated</div>
  );
};
export default UserProfile;
