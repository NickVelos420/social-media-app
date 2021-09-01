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
		if (process.browser) {
			if (expirationDate) {
				const date = new Date();
				date.setTime(date.getTime() + expirationDate * 24 * 60 * 60 * 1000);

				const cookieReadyToSet = `${name}=${value}; expires=${date.toUTCString()}`;
				document.cookie = cookieReadyToSet;
				return "cookie created";
			}

			document.cookie = `${name}=${value}`;
			return "cookies created";
		}
	}

	if (deleteCookie) {
		cookies.remove(name);
		return "cookie deleted";
	}

	return "an error occurred";
};
