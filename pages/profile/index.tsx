import { FC } from "react";
import Profile from "../../components/profile/Profile";
import { GetServerSideProps } from "next";
import { redirectIfUserIsntLoggedIn } from "../../utils/redirectIfIsntLoggedIn";
import Layout from "../../components/Layout";

const index: FC = props => {
	return (
		<Layout title="Profile">
			<Profile {...props} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default index;
