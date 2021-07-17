import { FC } from "react";
import LoginForm from "./LoginForm";

interface propTypes {
	setCookie: (key: string, value: any) => string;
}

const Login: FC<propTypes> = ({ setCookie }) => {
	return (
		<>
			<LoginForm setCookie={setCookie} />
		</>
	);
};

export default Login;
