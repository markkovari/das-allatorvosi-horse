import { useState } from "react";
import "./App.css";
import { Axios } from "axios";

// type GetNameResponse = { message: { name: number } };
type GetNamesResponse = { message: { [key: string]: number } };

console.log(import.meta.env.VITE_URL_BACKEND);

const axiosInstance = new Axios({
	baseURL: import.meta.env.VITE_URL_BACKEND,
});

// const getName = async (name: string) => {
// 	const response = await axios.get<GetNameResponse>(`/api/count?name=${name}`);
// 	return response.data.message;
// };

const getNames = async () => {
	const response = await axiosInstance.get<GetNamesResponse>("/count");
	return response.data.message;
};

function App() {
	const fetchNames = async () => {
		const counts = await getNames();
		console.log({ counts });
		setCounts(counts);
	};
	const [name, setName] = useState("");
	const [counts, setCounts] = useState<{ [key: string]: number }>({});

	return (
		<>
			<p>{name}</p>
			<input
				type="text"
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<button type="submit" onClick={() => fetchNames()}>
				get names
			</button>
			{counts && Object.entries(counts).map(([k, v]) => <p key={k}>{v}</p>)}
		</>
	);
}

export default App;
