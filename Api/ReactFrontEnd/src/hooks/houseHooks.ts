import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Config } from "../config";
import { House } from "../models/House";

export const useFetchHouses = () => {
	return useQuery<House[], AxiosError>("houses", () =>
		axios.get(`${Config.baseApiUrl}/houses`).then((resp) => resp.data)
	);
};

export const useFetchHouse = (id: number) => {
	return useQuery<House, AxiosError>(["houses", id], () =>
		axios.get(`${Config.baseApiUrl}/houses/${id}`).then((resp) => resp.data)
	);
};
