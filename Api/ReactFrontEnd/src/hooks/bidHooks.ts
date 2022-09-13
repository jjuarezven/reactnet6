import { Problem } from "./../models/Problem";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Config } from "../config";
import { Bid } from "../models/Bid";

export const useFetchBids = (houseId: number) => {
	return useQuery<Bid[], AxiosError<Problem>>(["bids", houseId], () =>
		axios
			.get(`${Config.baseApiUrl}/house/${houseId}/bids`)
			.then((resp) => resp.data)
	);
};

export const useAddBid = () => {
	const queryClient = useQueryClient();

	return useMutation<AxiosResponse, AxiosError<Problem>, Bid>(
		(b) => axios.post(`${Config.baseApiUrl}/house/${b.houseId}/bids`, b),
		{
			onSuccess: (_, bid) => {
				queryClient.invalidateQueries(["bids", bid.houseId]);
			},
		}
	);
};
