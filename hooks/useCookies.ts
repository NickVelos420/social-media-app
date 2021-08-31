import Cookies from "universal-cookie";

export const useCookies = (
	name: string,
	value: string | undefined,
	expirationDate: number | undefined,
	writeCookie: boolean,
	getCookie?: boolean,
	updateCookie?: boolean,
	deleteCookie?: boolean
) => {
	const cookies = new Cookies();

	if (getCookie) {
		if (name === "all cookies") return cookies.getAll();
		return cookies.get(name);
	}

	if (writeCookie || updateCookie) {
		if (expirationDate) {
			cookies.set(name, value, { maxAge: 60 * 60 * 24 * expirationDate });
			return "cookie created";
		}
		cookies.set(name, value);
		return "cookies created";
	}

	if (deleteCookie) {
		cookies.remove(name);
		return "cookie deleted";
	}

	return "an error occurred";
};
