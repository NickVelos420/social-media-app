import { FC, useEffect, useState } from "react";
import Profile from "../../components/profile/Profile";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import NotLoggedInErrorScreen from "../../components/NotLoggedInErrorScreen";
import { GetServerSideProps } from "next";
import { redirectIfUserIsntLoggedIn } from "../../randomFunctions/redirectIfIsntLoggedIn";

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

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default index;
