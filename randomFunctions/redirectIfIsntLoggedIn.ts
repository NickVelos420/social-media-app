import { GetServerSideProps } from "next";
import cookie from "cookie";

export const redirectIfUserIsntLoggedIn: GetServerSideProps = async context => {
	type UserDataType = string | undefined;

	let cookies: any;

	if (typeof context.req.headers.cookie === "string") {
		cookies = cookie.parse(context.req.headers.cookie);
	}

	let userData: UserDataType = cookies?.user;

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
