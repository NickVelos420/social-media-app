import { FC, useEffect, useState } from "react";
import Profile from "../../components/profile/Profile";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import NotLoggedInErrorScreen from "../../components/NotLoggedInErrorScreen";

const index: FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(useIsLoggedIn());
	}, []);

	if (!isLoggedIn) {
		return (
			<div>
				<NotLoggedInErrorScreen />
			</div>
		);
	}

	return (
		<div>
			<Profile />
		</div>
	);
};

export default index;
