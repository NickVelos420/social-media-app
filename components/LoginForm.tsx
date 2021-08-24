import { FormEvent, ChangeEvent, FC, useState, useEffect } from "react";
import axios from "axios";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import Link from "next/link";
import Head from "next/head";

interface propTypes {
	setCookie: (key: string, value: any, expirationDate: any) => string;
}

const LoginForm: FC<propTypes> = ({ setCookie }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [passwordType, setPasswordType] = useState<"password" | "text">("password");

	useEffect(() => {
		setIsLoggedIn(useIsLoggedIn());
	}, []);

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

			setCookie("user", data.res.data, 30);
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

	// should remove this line because the user gets redirected if they are logged in
	if (isLoggedIn) {
		return (
			<div>
				<h1>You are already logged in so you can not login again.</h1>
				<div>Got to settings to logout if you want to login to a different account.</div>
				<Link href="/profile/settings">
					<button>Settings</button>
				</Link>
				<Link href="/">
					<button>Home Page</button>
				</Link>
			</div>
		);
	}

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
				<input type="submit" />
			</form>
		</>
	);
};

export default LoginForm;
