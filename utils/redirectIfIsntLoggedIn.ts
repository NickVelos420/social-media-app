import { GetServerSideProps } from "next";
import cookie from "cookie";
import Cookies from "cookies";
import axios from "axios";
import getURLFromEnv from "./getURLFromEnv";

export const redirectIfUserIsntLoggedIn: GetServerSideProps = async context => {
	const cookies = new Cookies(context.req, context.res);

	interface IUserData {
		id: string;
		username: string;
		password: string;
		email: string;
	}

	type UserDataType = IUserData | undefined;

	const userCookie = cookies.get("user");

	let userData: UserDataType;

	if (userCookie) {
		try {
			const res = await axios.post(`http://localhost:4000/decrypt-user`, {
				encryptedUser: userCookie,
			});
			userData = res.data;
		} catch (e) {
			// removing the cookies because the encrypted string is missing some thing
			cookies.set("user", "", { expires: new Date(1969, 11, 12) });
			return {
				redirect: {
					destination: "/register",
					permanent: false,
				},
			};
		}
	}

	if (!userData) {
		return {
			redirect: {
				destination: `/`,
				permanent: false,
			},
		};
	}

	return {
		props: {
			url: context.resolvedUrl,
			user: { username: userData.username, email: userData.email, id: userData.id },
		},
	};
};
