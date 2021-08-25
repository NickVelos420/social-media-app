import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "../../../hooks/useCookies";
import Layout from "../../../components/Layout";

const index: FC = () => {
	const [error, setError] = useState("");
	const router = useRouter();
	const { userId } = router.query;

	const userData = useCookies(false, false, false, true)?.user;

	useEffect(() => {
		if (userData) {
			// have to make req to backend to decrypt the cookie
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
		<Layout title="Chats">
			<div>{userId}</div>
		</Layout>
	);
};

export default index;
