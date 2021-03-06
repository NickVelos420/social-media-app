import Router from "next/router";
import { useCookies } from "../hooks/useCookies";
import axios from "axios";

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

export const encryptAnything = async (varToEncrypt: any) => {
	try {
		const encryptedThing = await axios.post("http://localhost:4000/encrypt-user", {
			decryptedUser: varToEncrypt,
		});

		return encryptedThing.data;
	} catch (error) {
		console.error(error);
	}
};

export const decryptAnything = async (encryptedThing: string) => {
	try {
		const decryptedThing = await axios.post("http://localhost:4000/decrypt-user", {
			encryptedUser: encryptedThing,
		});

		return decryptedThing.data;
	} catch (error) {
		console.error(error);
	}
};

export const changeUsername = async (newUsername: string, encryptedUser: string) => {
	try {
		const decryptedUser = await decryptAnything(encryptedUser);
		if (!decryptedUser) {
			return null;
		}
		await axios.post("http://localhost:4000/change-username", {
			email: decryptedUser?.email,
			newUsername,
		});

		const newUserObj = {
			id: decryptedUser.id,
			email: decryptedUser.email,
			username: newUsername,
			password: decryptedUser.password,
		};

		const newEncryptedUser = await encryptAnything(JSON.stringify(newUserObj));

		return { encryptedUser: newEncryptedUser };
	} catch (err) {
		console.error(err);
	}
};

export const forgotPasswordSendEmail = async (email: string, password: string) => {
	try {
		await axios.post(`http://localhost:4000/send-email-change-password`, {
			to: email,
		});

		useCookies({ name: "user", deleteCookie: true });

		useCookies({
			name: "temporaryUser",
			value: JSON.stringify({ email, password }),
			writeCookie: true,
			expirationDate: 0.1,
		});

		return true;
	} catch (err) {
		console.error(err);
	}
};

export const getUserObject = async () => {
	try {
		const encryptedUser = useCookies({ name: "user", getCookie: true });

		if (!encryptedUser || typeof encryptedUser !== "string") return null;

		const decryptedUser = await decryptAnything(encryptedUser);

		return { id: decryptedUser.id, username: decryptedUser.username, email: decryptedUser.email };
	} catch (error) {
		console.error(error);
		return null;
	}
};

//!also log out the user
export const deleteAccount = async (password: string) => {
	try {
		const user = await getUserObject();
		console.log(user);
		if (!user) return null;

		const res = await axios.delete("http://localhost:4000/delete-account", {
			data: { id: user.id, password },
		});

		switch (res.status) {
			case 200:
				logout("user");
				return { message: "Account deleted successfully", error: false, errorMessage: "" };
			case 404:
				return {
					message: "",
					error: true,
					errorMessage:
						"Either the password or the id is not correct. Please try logging out and in again.",
				};
			case 400:
				return { message: "", error: true, errorMessage: "Password is incorrect" };
			case 401:
				return { message: "", error: true, errorMessage: "Wrong password" };
			case 500:
				return { message: "", error: true, errorMessage: "Internal server error" };
			default:
				return { message: "", error: true, errorMessage: "Unknown error" };
		}
	} catch (error) {
		console.error(error);
		return null;
	}
};
