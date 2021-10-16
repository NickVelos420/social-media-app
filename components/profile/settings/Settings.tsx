import React, { FC, useState } from "react";
import Tab from "../../tabs/Tab";
import TabNav from "../../tabs/TabNav";
import Logout from "../Logout";
import ChangeUsername from "./ChangeUsername";
import ForgotPassword from "./ForgotPassword";

const Settings: FC = () => {
	const [selectedTab, setSelectedTab] = useState("");
	const tabs = ["logout", "change password", "change username"];

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
			</TabNav>
		</div>
	);
};

export default Settings;
