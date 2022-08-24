import "./App.css";
import { Header } from "./Header";
import { Constants } from "../common/constants";
import { HouseList } from "../house/HouseList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HouseDetail } from "../house/HouseDetail";

function App() {
	return (
		<BrowserRouter>
			<div className="container">
				<Header subtitle={Constants.headerTitle}></Header>
				<Routes>
					<Route path="/" element={<HouseList />}></Route>
					<Route path="/house/:id" element={<HouseDetail />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
