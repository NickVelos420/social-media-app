import { GetServerSideProps } from "next";
import Cookies from "cookies";
import axios from "axios";

export const redirectIfUserIsLoggedIn: GetServerSideProps = async context => {
	const cookies = new Cookies(context.req, context.res);

	interface IUserData {
		id: string;
		email: string;
		password: string;
		username: string;
	}

	type UserDataType = IUserData | undefined;

	const encryptedUser = cookies.get("user");

	let userData: UserDataType;

	if (encryptedUser) {
		try {
			const res = await axios.post(`http://localhost:4000/decrypt-user`, {
				encryptedUser,
			});

			userData = res.data;
		} catch (e) {
			cookies.set("user", "", { expires: new Date(1969, 11, 12) });
			return {
				redirect: {
					destination: "/register",
					permanent: false,
				},
			};
		}
	}

	if (userData) {
		return {
			redirect: {
				destination: `/profile`,
				permanent: false,
			},
		};
	}

	return { props: { url: context.resolvedUrl } };
};
