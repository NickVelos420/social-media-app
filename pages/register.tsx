import { GetServerSideProps } from "next";
import { FC } from "react";
import Register from "../components/Register";
import { useCookies } from "../hooks/useCookies";
import { redirectIfUserIsLoggedIn } from "../randomFunctions/redirectIfUserIsLoggedIn";

const register: FC = () => {
	return (
		<div>
			<Register setCookie={useCookies} getCookies={useCookies} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsLoggedIn;

export default register;
