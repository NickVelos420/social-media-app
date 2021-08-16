import { GetServerSideProps } from "next";
import cookie from "cookie";

export const redirectIfUserIsntLoggedIn: GetServerSideProps = async context => {
	interface IUserData {
		id: string;
		email: string;
		password: string;
		username: string;
	}

	type UserDataType = IUserData | undefined;

	let cookies: any;

	if (typeof context.req.headers.cookie === "string") {
		cookies = cookie.parse(context.req.headers.cookie);
	}

	let userData: UserDataType;

	if (cookies?.user) {
		userData = JSON.parse(cookies.user);
	}

	if (!userData) {
		return {
			redirect: {
				destination: `/`,
				permanent: false,
			},
		};
	}

	return { props: { url: context.resolvedUrl } };
};
