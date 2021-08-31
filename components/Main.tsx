import { FC } from "react";
import Register from "./Register";

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

const Main: FC<propTypes> = ({ setCookie, getCookies }) => {
	return (
		<div>
			<Register setCookie={setCookie} getCookies={getCookies} />
		</div>
	);
};

export default Main;
