import { FC, useState } from "react";
import Logout from "./Logout";

const Settings: FC = () => {
	const [showLogout, setShowLogout] = useState(false);
	return (
		<div>
			<button
				onClick={() => {
					setShowLogout(!showLogout);
				}}
			>
				Log Out
			</button>
		</div>
	);
};

export default Settings;
