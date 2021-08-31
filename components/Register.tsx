import { FC } from "react";
import RegisterForm from "./RegisterForm";

interface propTypes {
	setCookie: (key: string, value: string, expirationDate: number, writeCookie: boolean) => string;
	getCookies: (
		key: string,
		value: string,
		expirationDate: number,
		writeCookie: boolean,
		getCookies: boolean
	) => void;
}

const Register: FC<propTypes> = ({ setCookie, getCookies }) => {
	return (
		<>
			<RegisterForm setCookie={setCookie} getCookies={getCookies} />
		</>
	);
};

export default Register;
