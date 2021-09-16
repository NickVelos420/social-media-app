import { FC } from "react";
import { IUseCookiesObject } from "../hooks/useCookies";
import RegisterForm from "./RegisterForm";

interface propTypes {
	setCookie: (object: IUseCookiesObject) => void;
	getCookies: (object: IUseCookiesObject) => void;
}

const Register: FC<propTypes> = ({ setCookie, getCookies }) => {
	return (
		<>
			<RegisterForm setCookie={setCookie} getCookies={getCookies} />
		</>
	);
};

export default Register;
