import { FormEvent, ChangeEvent, FC, useState, useEffect } from "react";
import axios from "axios";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import Link from "next/link";

interface propTypes {
	setCookie: (key: string, value: any, expirationDate: any) => string;
}

const LoginForm: FC<propTypes> = ({ setCookie }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showLinkToSettings, setShowLinkToSettings] = useState(false);

	useEffect(() => {
		setIsLoggedIn(useIsLoggedIn());
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (isLoggedIn) {
			setErrorMessage("You are already logged in.");
			setShowLinkToSettings(!showLinkToSettings);
			return false;
		}
		const data = await makeLoginRequest("http://localhost:4000/login", { email, password });

		// checks if the request was successful
		if (data?.statusBoolean) {
			setErrorMessage("");
			interface ResDataTypes {
				_id: string;
				id: string;
				username: string;
				email: string;
				__v: number;
			}

			let resData = data?.res.data as ResDataTypes;

			const userData = {
				id: resData.id,
				username: resData.username,
				email: resData.email,
				password,
			};

			setCookie("user", JSON.stringify(userData), 30);
			// redirects user to the login page

			return (window.location.href = "/loggedIn/");
		}
		return setErrorMessage("email or password is incorrect please try again");
	};

	interface Data {
		email: string;
		password: string;
	}

	async function makeLoginRequest(url: string, data: Data) {
		try {
			var res = await axios.post(url, { data });
			if (res.status >= 200 && res.status <= 299) {
				return { res, statusBoolean: true };
			} else return { res, statusBoolean: false };
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<>
			<div style={{ color: "red" }}>
				{errorMessage}
				{showLinkToSettings && (
					<div>
						<h3>To log out go to </h3>
						<Link href="/settings">
							<button>Settings</button>
						</Link>
					</div>
				)}
			</div>
			<form onSubmit={handleSubmit}>
				{/* EMAIL FORM */}
				<label>
					<span>Email</span>
					<input
						type="email"
						required
						placeholder="Email"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
				</label>

				{/* PASSWORD FORM */}
				<label>
					<span>Password</span>
					<input
						type="password"
						required
						placeholder="Password"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>
				</label>
				<input type="submit" />
			</form>
		</>
	);
};

export default LoginForm;
