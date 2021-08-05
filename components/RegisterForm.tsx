import { FormEvent, ChangeEvent, FC, useState } from "react";
import axios from "axios";
import { usePasswordRequirements } from "../hooks/usePasswordRequirements";

interface propTypes {
	setCookie: (key: string, value: any, expirationDate: any) => string;
}

const LoginForm: FC<propTypes> = ({ setCookie }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

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
				window.location.href = "/loggedIn";
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
		</>
	);
};

export default LoginForm;
