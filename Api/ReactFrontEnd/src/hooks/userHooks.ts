import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Config } from "../config";
import { Claim } from "../models/Claim";

export const useFetchUser = () => {
	return useQuery<Claim[], AxiosError>("user", () =>
		axios
			.get(`${Config.baseApiUrl}/account/getuser?slide=false`)
			.then((resp) => resp.data)
	);
};
