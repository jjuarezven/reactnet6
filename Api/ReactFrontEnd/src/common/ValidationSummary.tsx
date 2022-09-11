import { AxiosError } from "axios";
import React from "react";
import { Problem } from "../models/Problem";

type Args = {
	error: AxiosError<Problem>;
};

export const ValidationSummary = ({ error }: Args) => {
	if (error.response?.status !== 400) {
		return <></>;
	}
	const errors = error.response?.data.errors;

	return (
		<>
			<div className="text-danger">Please fix the following:</div>
			{Object.entries(errors).map(([key, value]) => (
				<ul key={key}>
					<li>
						{key}: {value.join(",")}
					</li>
				</ul>
			))}
		</>
	);
};
