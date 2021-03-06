import cookies from "js-cookie";

export interface IUseCookiesObject {
	name: string;
	value?: string;
	expirationDate?: number;
	writeCookie?: boolean;
	getCookie?: boolean;
	updateCookie?: boolean;
	deleteCookie?: boolean;
}

export const useCookies = ({
	name,
	value,
	expirationDate,
	writeCookie,
	getCookie,
	updateCookie,
	deleteCookie,
}: IUseCookiesObject) => {
	if (getCookie) {
		if (name === "all cookies") return cookies.get();
		return cookies.get(name);
	}

	if (value) {
		if (writeCookie || updateCookie) {
			if (process.browser) {
				if (expirationDate) {
					const date = new Date();
					date.setTime(date.getTime() + expirationDate * 24 * 60 * 60 * 1000);

					cookies.set(name, value, { expires: date });
					return "cookie created";
				}

				cookies.set(name, value);
				return "cookies created";
			}
		}
	}

	if (deleteCookie && name) {
		cookies.remove(name);
		return "cookie deleted";
	}

	return "an error occurred";
};
