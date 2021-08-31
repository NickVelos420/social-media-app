import { GetServerSideProps } from "next";
import cookie from "cookie";
import Cookies from "cookies";
import axios, { AxiosResponse } from "axios";
import getURLFromEnv from "./getURLFromEnv";

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
			const res = await axios.post(`${getURLFromEnv(false)}/decrypt-user`, {
				encryptedUser,
			});

			userData = res.data;
		} catch (e) {
			// removing the cookies because the encrypted string is missing some thing
			console.error(e);
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
				destination: `/c/${userData?.id}`,
				permanent: false,
			},
		};
	}

	return { props: { url: context.resolvedUrl } };
};
