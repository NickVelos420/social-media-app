import { FC } from "react";
import { IUseCookiesObject } from "../hooks/useCookies";
import LoginForm from "./LoginForm";

interface propTypes {
	setCookie: (object: IUseCookiesObject) => void;
}

const Login: FC<propTypes> = ({ setCookie }) => {
	return (
		<>
			<LoginForm setCookie={setCookie} />
		</>
	);
};

export default Login;
