import React, { FormEvent, ChangeEvent, FC, useState } from "react";
import axios from "axios";
import { addPasswordRequirements } from "../utils/auth";
import Link from "next/link";
import { IUseCookiesObject } from "../hooks/useCookies";
import HideShowEye from "./HideShowEye";

interface propTypes {
	setCookie: (object: IUseCookiesObject) => void;
	getCookies: (object: IUseCookiesObject) => void;
}

const LoginForm: FC<propTypes> = ({ setCookie, getCookies }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [passwordType, setPasswordType] = useState<"password" | "text">("password");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const { message, booleanValue } = addPasswordRequirements(password);

		if (!booleanValue) {
			return setError(message);
		}

		setError("");

		try {
			let res = await axios.post("http://localhost:4000/register", {
				username,
				password,
				email,
				encryptBeforeReturn: true,
			});

			console.log(res.data);
			if (res.status >= 200 && res.status < 300) {
				// puts the user object into a cookie
				setCookie({ name: "user", writeCookie: true, value: res.data, expirationDate: 30 });
				window.location.href = "/";
			}
		} catch (e) {
			console.error(e);
		}
	};

	const handleShowPassword = () => {
		if (passwordType === "text") {
			return setPasswordType("password");
		}
		return setPasswordType("text");
	};

	return (
		<>
			<div style={{ color: "#e01919", fontSize: "1.5rem" }}>{error}</div>
			<div>
				<span>Password Validation Rules</span>
				<ul>
					<li>The Password Should Be from 7 To 300 Characters</li>
					<li>It Must Be English</li>
					<li>It Should Contain At Least 1 Number</li>
					<li>It Should Contain At Least 1 Upper Case Character</li>
					<li>
						It Should Contain At Least 1 of the following special characters (!,@,#,$,%,^,&,*,?,|)
					</li>
				</ul>
			</div>

			<form onSubmit={handleSubmit}>
				{/* USERNAME FORM */}
				<label>
					<span>Username</span>
					<input
						required
						type="text"
						name="username"
						placeholder="Username"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
					/>
				</label>

				{/* EMAIL FORM */}
				<label>
					<span>Email</span>
					<input
						required
						type="email"
						name="email"
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

					<HideShowEye onClick={handleShowPassword} inputType={passwordType} />
				</span>
				<input type="submit" value="Sign Up" />
			</form>

			<div>
				<span>Already have an account?</span>
				<br />
				<span>Click </span>
				<Link href="/login">
					<button>Here</button>
				</Link>
				<span> to login</span>
			</div>
		</>
	);
};

export default LoginForm;
