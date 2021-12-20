import React, { FC, useState } from "react";
import Tab from "../../tabs/Tab";
import TabNav from "../../tabs/TabNav";
import Logout from "../Logout";
import ChangeUsername from "./ChangeUsername";
import DeleteAccount from "./DeleteAccount";
import ForgotPassword from "./ForgotPassword";

const Settings: FC = () => {
	const [selectedTab, setSelectedTab] = useState("");
	const tabs = ["logout", "change password", "change username", "delete account"];

	return (
		<div>
			<TabNav tabs={tabs} setSelectedTab={setSelectedTab} selectedTab={selectedTab}>
				<Tab isSelected={selectedTab === "logout"}>
					<Logout />
				</Tab>
				<Tab isSelected={selectedTab === "change password"}>
					<ForgotPassword />
				</Tab>
				<Tab isSelected={selectedTab === "change username"}>
					<ChangeUsername />
				</Tab>
				<Tab isSelected={selectedTab === "delete account"}>
					<DeleteAccount />
				</Tab>
			</TabNav>
		</div>
	);
};

export default Settings;
