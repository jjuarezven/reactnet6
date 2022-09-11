import { House } from "../models/House";
import { useAddHouse } from "../hooks/houseHooks";
import { HouseForm } from "./HouseForm";
import { ValidationSummary } from "../common/ValidationSummary";

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
		<>
			{addHouseMutation.isError && (
				<ValidationSummary error={addHouseMutation.error} />
			)}
			<HouseForm
				house={newHouse}
				submitted={(h) => addHouseMutation.mutate(h)}
			/>
		</>
	);
};
