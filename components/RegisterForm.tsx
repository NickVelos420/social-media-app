import { FormEvent, ChangeEvent, FC, useState } from "react";
import axios from "axios";

interface propTypes {
	setCookie: (key: string, value: any, expirationDate: any) => string;
}

const LoginForm: FC<propTypes> = ({ setCookie }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const user = { username, email, password };

		try {
			let res = await axios.post("http://localhost:4000/register", { user });
			if (res.status >= 200 && res.status < 300) {
				// puts the user object into a cookie
				setCookie("user", JSON.stringify(user), 30);
				window.location.href = "/loggedIn";
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				{/* USERNAME FORM */}
				<label>
					<span>Username</span>
					<input
						required
						min="6"
						max="28"
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
						min="7"
						max="350"
						type="password"
						name="password"
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
