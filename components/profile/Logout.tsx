import Link from "next/link";
import { FC, useState } from "react";
import { logout } from "../../utils/auth";

interface propTypes {
	username: string;
}

const Logout: FC<propTypes> = ({ username }) => {
	const [wantsLogout, setWantsLogout] = useState(false);

	// First of all we don't need the username so remove that
	// just have a dropdown that says if you accept to logout instead of the page
	// find a way to delete cookies

	return (
		<div>
			<form>
				<h3>Are you sure you want to log out?</h3>
				<button
					onClick={() => {
						logout("user");
					}}
				>
					Yes
				</button>
				<button
					onClick={() => {
						window.location.href = "/profile/settings";
					}}
				>
					No
				</button>
			</form>
		</div>
	);
};

export default Logout;
