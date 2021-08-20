import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "../../../hooks/useCookies";

const index: FC = () => {
	const [error, setError] = useState("");
	const router = useRouter();
	const { userId } = router.query;

	const userData = useCookies(false, false, false, true)?.user;

	useEffect(() => {
		if (userData) {
			const userDataJSONId = JSON.parse(userData).id;

			// not using the userId variable declared above because when the useEffect runs
			// it's value is undefined
			const userId = window.location.pathname.split("/").filter(e => e.trim() !== "")[1];
			if (userId !== userDataJSONId) {
				return setError("The id provided in the search parameters is not valid");
			}
		}
	}, []);

	if (error) {
		return <h1>{error}</h1>;
	}

	return (
		<>
			<div>{userId}</div>
		</>
	);
};

export default index;
