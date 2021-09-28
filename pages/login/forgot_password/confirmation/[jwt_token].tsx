import { FC } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";

const jwt_token: FC = () => {
	return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	if (!req.url) return { redirect: { destination: "/login/forgot_password", permanent: false } };

	let temporaryUser;

	if (req.cookies?.temporaryUser && typeof req.cookies?.temporaryUser === "string") {
		temporaryUser = JSON.parse(req.cookies?.temporaryUser);
	}

	const url = req.url.split("/");
	const jwt_token = url[url.length - 1];

	try {
		const verifyJWTRes = await axios.post("http://localhost:4000/verify-jwt", {
			jwt_token,
		});

		if (!verifyJWTRes.data?.email)
			return { redirect: { destination: "/login/forgot_password", permanent: false } };

		axios.post("http://localhost:4000/change-password", {
			email: temporaryUser.email,
			newPassword: temporaryUser.password,
		});

		return { redirect: { destination: "/login", permanent: false } };
	} catch (e) {
		console.error(e);
		return { redirect: { destination: "/login/forgot_password", permanent: false } };
	}
	return { props: { hello: "hello" } };
};

export default jwt_token;
