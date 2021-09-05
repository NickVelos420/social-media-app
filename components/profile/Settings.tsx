import { FC, useState } from "react";
import Tab from "../tabs/Tab";
import TabNav from "../tabs/TabNav";
import Logout from "./Logout";

const Settings: FC = () => {
	const [selectedTab, setSelectedTab] = useState("");

	return (
		<div>
			{/* <details>
				<summary>Log out</summary>
				<Logout />
			</details>
			<style jsx>{`
				summary:hover {
					cursor: pointer;
				}
			`}</style> */}

			<TabNav
				tabs={["logout", "login", "yes"]}
				setSelectedTab={setSelectedTab}
				selectedTab={selectedTab}
			>
				<Tab isSelected={selectedTab === "logout"}>
					<Logout />
				</Tab>
				<Tab isSelected={selectedTab === "login"}>
					<h1>Hello there m8 so nice to meet you</h1>
				</Tab>
				<Tab isSelected={selectedTab === "yes"}>yes it's a me mario</Tab>
			</TabNav>
		</div>
	);
};

export default Settings;
