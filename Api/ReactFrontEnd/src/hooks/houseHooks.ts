import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

export const useAddHouse = () => {
	const nav = useNavigate();
	const queryClient = useQueryClient();

	return useMutation<AxiosResponse, AxiosError, House>(
		(h) => axios.post(`${Config.baseApiUrl}/houses`, h),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("houses");
				nav("/");
			},
		}
	);
};

export const useUpdateHouse = () => {
	const nav = useNavigate();
	const queryClient = useQueryClient();

	return useMutation<AxiosResponse, AxiosError, House>(
		(h) => axios.put(`${Config.baseApiUrl}/houses/`, h),
		{
			onSuccess: (_, house) => {
				queryClient.invalidateQueries("houses");
				nav(`/house/${house.id}`);
			},
		}
	);
};

export const useDeleteHouse = () => {
	const nav = useNavigate();
	const queryClient = useQueryClient();

	return useMutation<AxiosResponse, AxiosError, House>(
		(h) => axios.delete(`${Config.baseApiUrl}/houses/${h.id}`),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("houses");
				nav("/");
			},
		}
	);
};
