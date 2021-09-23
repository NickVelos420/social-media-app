import { FC } from "react";
import { logout } from "../../utils/auth";

const Logout: FC = () => {
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
						window.location.href = "/profile";
					}}
				>
					No
				</button>
			</form>
		</div>
	);
};

export default Logout;
