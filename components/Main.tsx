import { FC } from "react";
import Register from "./Register";
import { IUseCookiesObject } from "../hooks/useCookies";

interface propTypes {
	setCookie: (object: IUseCookiesObject) => void;
	getCookies: (object: IUseCookiesObject) => void;
}

const Main: FC<propTypes> = ({ setCookie, getCookies }) => {
	return (
		<div>
			<Register setCookie={setCookie} getCookies={getCookies} />
		</div>
	);
};

export default Main;
