import { FormEvent, ChangeEvent, FC, useState, useEffect } from "react";
import axios from "axios";
import { usePasswordRequirements } from "../hooks/usePasswordRequirements";
import Link from "next/link";

interface UserDataTypes {
	_id: string;
	id: string;
	username: string;
	email: string;
	__v: number;
}

interface getCookiesReturnTypes {
	user?: UserDataTypes;
}

interface propTypes {
	setCookie: (key: string, value: any, expirationDate: any) => string;
	getCookies: (
		key: boolean,
		value: any,
		expirationDate: any,
		getCookies: boolean
	) => getCookiesReturnTypes;
}

const LoginForm: FC<propTypes> = ({ setCookie, getCookies }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// const userData = getCookies(false, false, false, true)?.user;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const { message, booleanValue } = usePasswordRequirements(password);

		if (!booleanValue) {
			return setError(message);
		}

		setError("");

		try {
			let res = await axios.post("http://localhost:4000/register", { username, password, email });
			if (res.status >= 200 && res.status < 300) {
				// puts the user object into a cookie
				setCookie("user", JSON.stringify(res.data), 30);
				window.location.href = "/";
			}
		} catch (e) {
			console.error(e);
		}
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
				<label>
					<span>Password</span>
					<input
						required
						type="password"
						name="password"
						placeholder="Password"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>
				</label>

				<input type="submit" value="Register" />
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
