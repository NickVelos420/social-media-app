export const useCookies = (
	key?: string | boolean,
	value?: any,
	expirationDate?: any,
	getCookies?: boolean
) => {
	if (getCookies) {
		if (process.browser) {
			// converts the string into an array of arrays with 2 elements in the nested array
			const cookies = document.cookie.split(";").map(cookie => cookie.trim().split("="));
			if (cookies) {
				// turns the array into an object
				return Object.fromEntries(cookies);
			}
		}
	}
	// puts the data into a cookie into
	if (key && value && expirationDate) {
		if (process.browser) {
			let date = new Date();
			date.setTime(date.getTime() + expirationDate * 24 * 60 * 60 * 1000);

			const readyToPutToCookie = `${key}=${value}; expires=${date.toUTCString()}`;
			document.cookie = readyToPutToCookie;
			return "cookie created";
		}
	}
};
