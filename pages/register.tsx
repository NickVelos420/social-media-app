import { GetServerSideProps } from "next";
import { FC } from "react";
import Layout from "../components/Layout";
import Register from "../components/Register";
import { useCookies } from "../hooks/useCookies";
import { redirectIfUserIsLoggedIn } from "../utils/redirectIfUserIsLoggedIn";

const register: FC = () => {
	return (
		<Layout title="Sign Up">
			<Register setCookie={useCookies} getCookies={useCookies} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsLoggedIn;

export default register;
