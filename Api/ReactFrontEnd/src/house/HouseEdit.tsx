import React from "react";
import { useParams } from "react-router-dom";
import { ApiStatus } from "../ApiStatus";
import { ValidationSummary } from "../common/ValidationSummary";
import { useFetchHouse, useUpdateHouse } from "../hooks/houseHooks";
import { HouseForm } from "./HouseForm";

export const HouseEdit = () => {
	const { id } = useParams();
	if (!id) {
		throw Error("Need a house id");
	}
	const houseId = parseInt(id);

	const { data, status, isSuccess } = useFetchHouse(houseId);
	const updateHouseMutation = useUpdateHouse();
	if (!isSuccess) {
		return <ApiStatus status={status} />;
	}

	return (
		<>
			{updateHouseMutation.isError && (
				<ValidationSummary error={updateHouseMutation.error} />
			)}

			<HouseForm
				house={data!}
				submitted={(h) => updateHouseMutation.mutate(h)}
			/>
		</>
	);
};
