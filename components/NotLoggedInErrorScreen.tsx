import Link from "next/link";
import { FC } from "react";

const NotLoggedInErrorScreen: FC = () => {
	return (
		<>
			<h1>You are not logged in</h1>
			<h3>Please log in to continue</h3>
			<Link href="/login">
				<button>Login</button>
			</Link>
			<Link href="/register">
				<button>Register</button>
			</Link>
		</>
	);
};

export default NotLoggedInErrorScreen;
