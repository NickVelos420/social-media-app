import { FormEvent, ChangeEvent, FC, useState } from "react";
import axios from "axios";

interface propTypes {
	setCookie: (key: string, value: any) => string;
}

const LoginForm: FC<propTypes> = ({ setCookie }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const user = { username, email, password };

		try {
			await axios.post("http://localhost:4000/register", { user });
			// puts the user object into a cookie
			setCookie("__user", JSON.stringify(user));
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

				<input type="submit" />
			</form>
		</>
	);
};

export default LoginForm;
