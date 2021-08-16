import { FC } from "react";
import RegisterForm from "./RegisterForm";

interface UserDataTypes {
	_id: string;
	id: string;
	username: string;
	email: string;
	__v: number;
}

interface getCookiesReturnTypes {
	user?: UserDataTypes;
}
interface propTypes {
	setCookie: (key: string, value: any, expirationDate: any) => string;
	getCookies: (
		key: boolean,
		value: any,
		expirationDate: any,
		getCookies: boolean
	) => getCookiesReturnTypes;
}

const Register: FC<propTypes> = ({ setCookie, getCookies }) => {
	return (
		<>
			<RegisterForm setCookie={setCookie} getCookies={getCookies} />
		</>
	);
};

export default Register;
