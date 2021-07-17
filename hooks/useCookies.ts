export const useCookies = (key?: string, value?: any, getCookies?: boolean) => {
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
	if (key && value) {
		if (process.browser) {
			const readyToPutToCookie = `__${key}=${value}`;
			document.cookie = readyToPutToCookie;
			return "cookie created";
		}
	}
};
