import { FC } from "react";
import Login from "./Login";

interface propTypes {
	setCookie: (key: string, value: any) => string;
}

const Main: FC<propTypes> = ({ setCookie }) => {
	return (
		<>
			<Login setCookie={setCookie} />
			<br />
			<span>Don't have an account? Create one</span>
			<button>
				<a href="/register">Create An Account</a>
			</button>
		</>
	);
};

export default Main;
