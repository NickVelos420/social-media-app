import { FC, useState } from "react";
import Tab from "../tabs/Tab";
import TabNav from "../tabs/TabNav";
import Logout from "./Logout";

const Settings: FC = () => {
	const [selectedTab, setSelectedTab] = useState("");
	const tabs = ["logout"];

	return (
		<div>
			<TabNav tabs={tabs} setSelectedTab={setSelectedTab} selectedTab={selectedTab}>
				<Tab isSelected={selectedTab === "logout"}>
					<Logout />
				</Tab>
			</TabNav>
		</div>
	);
};

export default Settings;
