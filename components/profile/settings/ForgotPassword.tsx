import { FC, FormEvent, useState } from "react";
import { useCookies } from "../../../hooks/useCookies";
import { addPasswordRequirements, forgotPasswordSendEmail } from "../../../utils/auth";
import HideShowEye from "../../HideShowEye";

const ForgotPassword: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [requestHasBeenMade, setRequestHasBeenMade] = useState(false);
	const [passwordType, setPasswordType] = useState<"password" | "text">("password");
	const [checkPasswordType, setCheckPasswordType] = useState<"password" | "text">("password");
	const [theThing, setTheThing] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (useCookies({ name: "user", getCookie: true })) return setTheThing(true);

		handleOnClickThing();
	};

	async function handleOnClickThing() {
		const { booleanValue, message } = addPasswordRequirements(password);

		if (!booleanValue) {
			return setErrorMessage(message);
		}
		if (password !== checkPassword) {
			return setErrorMessage("Passwords are not the same");
		}

		const FPSE = await forgotPasswordSendEmail(email, password);

		if (FPSE) {
			setRequestHasBeenMade(true);
		}
	}

	if (requestHasBeenMade) {
		return (
			<div>
				<h1>An email must have been sent by now</h1>
			</div>
		);
	}

	if (theThing) {
		return (
			<div>
				<h1>Warning if you accept this action it will automatically log you out</h1>
				<h3>Do you accept</h3>
				<button onClick={handleOnClickThing}>Yes</button>
				<button onClick={() => (window.location.href = "/login")}>No</button>
			</div>
		);
	}

	return (
		<div>
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
		</div>
	);
};

export default ForgotPassword;
