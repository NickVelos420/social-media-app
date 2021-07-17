import { FormEvent, ChangeEvent, FC, useState } from "react";
import axios from "axios";
import { useCookies } from "../hooks/useCookies";

interface propTypes {
	setCookie: (key: string, value: any) => string;
}
// const userData = useCookies(undefined, undefined, true)?.____user;
// check if userData if userData is undefined before working with it

const LoginForm: FC<propTypes> = ({ setCookie }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.post("http://localhost:4000/login", { data: { email, password } });
			console.log(res.status);
			if (res.status >= 200 && res.status <= 299) {
				setCookie("__user", JSON.stringify({ email, password }));
				window.location.replace("http://localhost:3000/loggedIn");
			} else console.log("gangsta");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
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
