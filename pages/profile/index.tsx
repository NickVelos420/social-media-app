import { FC, useEffect, useState } from "react";
import Profile from "../../components/profile/Profile";
import { GetServerSideProps } from "next";
import { redirectIfUserIsntLoggedIn } from "../../randomFunctions/redirectIfIsntLoggedIn";

const index: FC = () => {
	return (
		<div>
			<Profile />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default index;
