import { FC } from "react";
import LoginForm from "./LoginForm";

interface propTypes {
	setCookie: (key: string, value: string, expirationDate: number, writeCookie: boolean) => void;
}

const Login: FC<propTypes> = ({ setCookie }) => {
	return (
		<>
			<LoginForm setCookie={setCookie} />
		</>
	);
};

export default Login;
