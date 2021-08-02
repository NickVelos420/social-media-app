import { useCookies } from "./useCookies";

const useIsLoggedIn = (): boolean => {
	const userDataCookie = useCookies(false, false, false, true)?.user;

	const checkIfLoggedIn = () => {
		if (!userDataCookie) {
			return { loggedIn: false };
		} else return { loggedIn: true };
	};

	if (checkIfLoggedIn().loggedIn) return true;
	else if (!checkIfLoggedIn().loggedIn) return false;
	return false;
};

export default useIsLoggedIn;
