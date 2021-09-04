import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Logout from "../../../components/profile/Logout";
import { useCookies } from "../../../hooks/useCookies";
import { redirectIfUserIsntLoggedIn } from "../../../utils/redirectIfIsntLoggedIn";

const logout: FC = () => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		(async () => {
			const encryptedUser = useCookies("user", undefined, undefined, false, true);

			try {
				const res = await axios.post("http://localhost:4000/decrypt-user", { encryptedUser });

				setUsername(res.data.username);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	if (!username) {
		return (
			<Layout title="Error Occurred - Logout">
				<h1>An Error has occurred please try again later!</h1>
				<Link href="/">Home</Link>
			</Layout>
		);
	}

	return (
		<Layout title="Logout">
			<Logout username={username} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default logout;
