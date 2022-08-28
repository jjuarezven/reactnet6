import { House } from "../models/House";
import { useAddHouse } from "../hooks/houseHooks";
import { HouseForm } from "./HouseForm";

export const HouseAdd = () => {
	const addHouseMutation = useAddHouse();

	const newHouse: House = {
		address: "",
		country: "",
		description: "",
		price: 0,
		id: 0,
		photo: "",
	};

	return (
		<HouseForm
			house={newHouse}
			submitted={(h) => addHouseMutation.mutate(h)}
		/>
	);
};
