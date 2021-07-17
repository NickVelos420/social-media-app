import { FC } from "react";
import RegisterForm from "./RegisterForm";

interface propTypes {
	setCookie: (key: string, value: any) => string;
}

const Login: FC<propTypes> = ({ setCookie }) => {
	return (
		<>
			<RegisterForm setCookie={setCookie} />
		</>
	);
};

export default Login;
