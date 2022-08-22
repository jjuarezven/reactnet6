import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Config } from "../config";
import { House } from "../models/House";

export const useFetchHouses = () => {
  return useQuery<House[], AxiosError>("houses", () =>
    axios.get(`${Config.baseApiUrl}/houses`).then((resp) => resp.data)
  );
};
