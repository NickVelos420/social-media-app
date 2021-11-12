import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import Search from "../components/Search";
import { redirectIfUserIsntLoggedIn } from "../utils/redirectIfIsntLoggedIn";

const search = () => {
	return (
		<Layout title="Search Users">
			<Search />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default search;
