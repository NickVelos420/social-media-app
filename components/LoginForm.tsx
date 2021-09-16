import { FormEvent, ChangeEvent, FC, useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { IUseCookiesObject } from "../hooks/useCookies";

interface propTypes {
	setCookie: (object: IUseCookiesObject) => void;
}

const LoginForm: FC<propTypes> = ({ setCookie }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [passwordType, setPasswordType] = useState<"password" | "text">("password");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const data = await makeLoginRequest("http://localhost:4000/login", {
			email,
			password,
			encryptBeforeReturn: true,
		});

		// checks if the request was successful
		if (data?.statusBoolean) {
			setErrorMessage("");

			setCookie({
				name: "user",
				value: data.res.data,
				expirationDate: 30,
				writeCookie: true,
			});
			// redirects user to the login page

			return (window.location.href = "/");
		}
		return setErrorMessage("email or password is incorrect please try again");
	};

	const handleShowPassword = () => {
		if (passwordType === "password") {
			return setPasswordType("text");
		}
		return setPasswordType("password");
	};

	interface Data {
		email: string;
		password: string;
		encryptBeforeReturn: boolean;
	}

	async function makeLoginRequest(url: string, data: Data) {
		try {
			var res = await axios.post(url, {
				email: data.email,
				password: data.password,
				encryptBeforeReturn: data.encryptBeforeReturn,
			});
			if (res.status >= 200 && res.status <= 299) {
				return { res, statusBoolean: true };
			} else return { res, statusBoolean: false };
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
					integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</Head>

			<div style={{ color: "red" }}>{errorMessage}</div>

			<form onSubmit={handleSubmit}>
				{/* EMAIL FORM */}
				<label>
					<span>Email</span>
					<input
						type="email"
						name="email"
						required
						placeholder="Email"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
				</label>

				{/* PASSWORD FORM */}
				<span>
					<label htmlFor="password">
						<span>Password</span>
					</label>
					<input
						id="password"
						required
						type={passwordType}
						name="password"
						placeholder="Password"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>

					{passwordType === "password" ? (
						<i className="fa fa-eye" onClick={handleShowPassword} style={{ cursor: "pointer" }} />
					) : (
						<i
							className="fa fa-eye-slash"
							onClick={handleShowPassword}
							style={{ cursor: "pointer" }}
						/>
					)}
				</span>
				<input type="submit" value="Sign In" />
			</form>
		</>
	);
};

export default LoginForm;
