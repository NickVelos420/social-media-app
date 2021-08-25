import { GetServerSideProps } from "next";
import { FC } from "react";
import Layout from "../components/Layout";
import Login from "../components/Login";
import { useCookies } from "../hooks/useCookies";
import { redirectIfUserIsLoggedIn } from "../randomFunctions/redirectIfUserIsLoggedIn";

const login: FC = () => {
	return (
		<Layout title="Sign In">
			<Login setCookie={useCookies} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsLoggedIn;

export default login;
