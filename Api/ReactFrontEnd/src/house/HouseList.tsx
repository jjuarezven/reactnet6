import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ApiStatus } from "../ApiStatus";
import { currencyFormatter } from "../config";
import { useFetchHouses } from "../hooks/houseHooks";

export const HouseList = () => {
	const nav = useNavigate();
	const { data, status, isSuccess } = useFetchHouses();

	if (!isSuccess) {
		return <ApiStatus status={status} />;
	}

	return (
		<div>
			<div className="row mb-2">
				<h5 className="themeFontColor text-center">
					Houses currently on the market
				</h5>
			</div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Address</th>
						<th>Country</th>
						<th>Asking Price</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((house) => (
							<tr
								key={house.id}
								onClick={() => nav(`/house/${house.id}`)}
							>
								<td>{house.address}</td>
								<td>{house.country}</td>
								<td>{currencyFormatter.format(house.price)}</td>
							</tr>
						))}
				</tbody>
			</table>
			<Link className="btn btn-primary" to="/house/add">
				Add
			</Link>
		</div>
	);
};
