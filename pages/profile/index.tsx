import { FC } from "react";
import Profile from "../../components/profile/Profile";
import { GetServerSideProps } from "next";
import { redirectIfUserIsntLoggedIn } from "../../randomFunctions/redirectIfIsntLoggedIn";
import Layout from "../../components/Layout";

const index: FC = () => {
	return (
		<Layout title="Profile">
			<Profile />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default index;
