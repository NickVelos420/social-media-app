import axios from "axios";

export const getUsersFromSomeOfTheFirstUsernameChars = async (firstUsernameChars: string) => {
	try {
		const res = await axios.get(
			`http://localhost:4000/get-users-from-some-of-the-first-username-chars?firstUsernameChars=${firstUsernameChars}`
		);
		console.log(firstUsernameChars);
		if (!res.data) {
			return { id: undefined, username: undefined };
		}

		return res.data;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const getSomeonesCredentialsById = async (id: string) => {
	try {
		const user = await axios.get(`http://localhost:4000/get-user-by-id?id=${id}`);

		if (!user.data) {
			return null;
		}

		return user.data;
	} catch (err) {
		console.log(err);
		return null;
	}
};
