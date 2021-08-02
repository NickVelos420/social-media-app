import { FC } from "react";
import Login from "../components/Login";
import { useCookies } from "../hooks/useCookies";

const login: FC = () => {
	return (
		<div>
			<Login setCookie={useCookies} />
		</div>
	);
};

export default login;
