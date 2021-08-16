import { GetServerSideProps } from "next";
import { FC } from "react";
import Login from "../components/Login";
import { useCookies } from "../hooks/useCookies";
import { redirectIfUserIsLoggedIn } from "../randomFunctions/redirectIfUserIsLoggedIn";

const login: FC = () => {
	return (
		<div>
			<Login setCookie={useCookies} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsLoggedIn;

export default login;
