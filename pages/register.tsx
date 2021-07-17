import { FC } from "react";
import Register from "../components/Register";
import { useCookies } from "../hooks/useCookies";

const register: FC = () => {
	return (
		<div>
			<Register setCookie={useCookies} />
		</div>
	);
};

export default register;
