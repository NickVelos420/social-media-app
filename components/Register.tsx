import Link from "next/link";
import { FC } from "react";
import RegisterForm from "./RegisterForm";

interface propTypes {
	setCookie: (key: string, value: any, expirationDate: any) => string;
}

const Register: FC<propTypes> = ({ setCookie }) => {
	return (
		<>
			<RegisterForm setCookie={setCookie} />
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

export default Register;
