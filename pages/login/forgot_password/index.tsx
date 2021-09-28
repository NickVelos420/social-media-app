import axios from "axios";
import { FC, FormEvent, useState } from "react";
import HideShowEye from "../../../components/HideShowEye";
import Layout from "../../../components/Layout";
import { useCookies } from "../../../hooks/useCookies";
import { addPasswordRequirements } from "../../../utils/auth";

const index: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [requestHasBeenMade, setRequestHasBeenMade] = useState(false);
	const [passwordType, setPasswordType] = useState<"password" | "text">("password");
	const [checkPasswordType, setCheckPasswordType] = useState<"password" | "text">("password");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const { booleanValue, message } = addPasswordRequirements(password);
		if (!booleanValue) {
			return setErrorMessage(message);
		}
		if (password !== checkPassword) {
			return setErrorMessage("Passwords are not the same");
		}

		useCookies({
			name: "temporaryUser",
			value: JSON.stringify({ email, password }),
			writeCookie: true,
			expirationDate: 0.1,
		});

		try {
			await axios.post(`http://localhost:4000/send-email-change-password`, {
				to: email,
			});
			setRequestHasBeenMade(true);
		} catch (err) {
			console.error(err);
		}
	};

	if (requestHasBeenMade) {
		return (
			<div>
				<h1>An email must have been sent by now</h1>
			</div>
		);
	}

	return (
		<Layout title="Forgot Password">
			<span>Forgot You're Password</span>
			<form onSubmit={handleSubmit}>
				<input placeholder="Email" type="email" onChange={e => setEmail(e.currentTarget.value)} />
				<input
					type={passwordType}
					onChange={e => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<HideShowEye
					onClick={() => {
						if (passwordType === "password") return setPasswordType("text");
						return setPasswordType("password");
					}}
					inputType={passwordType}
				/>
				<input
					type={checkPasswordType}
					onChange={e => setCheckPassword(e.target.value)}
					placeholder="Retype Password"
				/>
				<HideShowEye
					onClick={() => {
						if (checkPasswordType === "password") return setCheckPasswordType("text");
						return setCheckPasswordType("password");
					}}
					inputType={checkPasswordType}
				/>
				<div>{errorMessage}</div>
				<input type="submit" value="Send" />
			</form>
		</Layout>
	);
};

export default index;
