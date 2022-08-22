import { ApiStatusTypes } from "./models/ApiStatusTypes";

export const ApiStatus = ({ status }: ApiStatusTypes) => {
  switch (status) {
    case "error":
      return <div>Error communicating with the data backend</div>;
    case "idle":
      return <div>Idle</div>;
    case "loading":
      return <div>Loading...</div>;
    default:
      throw Error("Unlnown API state");
  }
};
