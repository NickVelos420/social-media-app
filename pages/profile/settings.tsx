import { FC } from "react";
import Layout from "../../components/Layout";
import Settings from "../../components/profile/Settings";
import getURLFromEnv from "../../lib/getURLFromEnv";
import { redirectIfUserIsntLoggedIn } from "../../lib/redirectIfIsntLoggedIn";

const settings: FC = () => {
	return (
		<Layout title="Profile Settings">
			<Settings />
		</Layout>
	);
};

export const getServerSideProps = redirectIfUserIsntLoggedIn;

export default settings;
