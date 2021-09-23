import Router from "next/router";
import { useCookies } from "../hooks/useCookies";

export const logout = (cookieName: string) => {
	useCookies({ name: cookieName, deleteCookie: true });
	Router.push("/login");
};

interface passwordReqReturnTypes {
	message: string;
	booleanValue: boolean;
}

export const addPasswordRequirements = (password: string): passwordReqReturnTypes => {
	const passwordValidationRegex =
		/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*?|])[a-zA-Z0-9!@#$%^&*?|]/g;

	if (password.length <= 7) {
		return { message: "The password is too small", booleanValue: false };
	} else if (password.length > 300) {
		return { message: "The password is too long", booleanValue: false };
	} else if (!passwordValidationRegex.test(password)) {
		return { message: "password doesn't match the validation rules", booleanValue: false };
	}
	return { message: "none", booleanValue: true };
};
