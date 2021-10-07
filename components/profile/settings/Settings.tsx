import React, { FC, useState } from "react";
import Tab from "../../tabs/Tab";
import TabNav from "../../tabs/TabNav";
import Logout from "../Logout";
import Link from "next/link";
import ChangeUsername from "./ChangeUsername";

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
					<Link href="/login/forgot_password">
						<a>Change Password</a>
					</Link>
				</Tab>
				<Tab isSelected={selectedTab === "change username"}>
					<ChangeUsername />
				</Tab>
			</TabNav>
		</div>
	);
};

export default Settings;
