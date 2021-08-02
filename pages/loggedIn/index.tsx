import { FC, useEffect, useState } from "react";
import NotLoggedInErrorScreen from "../../components/NotLoggedInErrorScreen";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const index: FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(useIsLoggedIn());
	}, []);

	if (!isLoggedIn) {
		return (
			<>
				<NotLoggedInErrorScreen />
			</>
		);
	}

	return <>{<h1>helol there m8</h1>}</>;
};

export default index;
