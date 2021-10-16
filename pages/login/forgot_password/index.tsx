import { FC } from "react";
import Layout from "../../../components/Layout";
import ForgotPassword from "../../../components/profile/settings/ForgotPassword";

const index: FC = () => {
	return (
		<Layout title="Forgot Password">
			<ForgotPassword />
		</Layout>
	);
};

export default index;
