import { FC } from "react";
import Register from "./Register";

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

const Main: FC<propTypes> = ({ setCookie, getCookies }) => {
	return (
		<div>
			<Register setCookie={setCookie} getCookies={getCookies} />
		</div>
	);
};

export default Main;
