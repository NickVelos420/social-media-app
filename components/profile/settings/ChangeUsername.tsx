import React, { ChangeEvent, FormEvent, useState } from "react";
import { useCookies } from "../../../hooks/useCookies";
import { changeUsername } from "../../../utils/auth";

const ChangeUsername = () => {
	const [username, setUsername] = useState("");
	const [confirm, setConfirm] = useState(false);

	const encryptedUser = useCookies({ name: "user", getCookie: true });

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setConfirm(!confirm);
	};

	const handleConfirmation = async () => {
		try {
			const newEncryptedUser = await changeUsername(username, encryptedUser as string);
			if (newEncryptedUser && typeof newEncryptedUser?.encryptedUser === "string") {
				useCookies({
					name: "user",
					value: newEncryptedUser?.encryptedUser,
					updateCookie: true,
					expirationDate: 30,
				});
			}
			window.location.href = "/profile";
		} catch (e) {
			console.error(e);
		}
	};

	if (confirm) {
		return (
			<div>
				<span>Do You Agree On Changing Your Username</span>
				<button onClick={handleConfirmation}>Yes</button>
				<button onClick={() => (window.location.href = "/profile")}>No</button>
			</div>
		);
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="New Username"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
					required
				/>
				<input type="submit" value="change" />
			</form>
		</div>
	);
};

export default ChangeUsername;
