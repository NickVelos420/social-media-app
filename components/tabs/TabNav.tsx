import { FC } from "react";

interface propTypes {
	tabs: string[];
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
}

const TabNav: FC<propTypes> = ({ children, tabs, selectedTab, setSelectedTab }) => {
	return (
		<div>
			<ul>
				{tabs.map(tab => {
					const active = selectedTab === tab ? "active " : "";

					return (
						<li key={tab}>
							<a className={active} onClick={() => setSelectedTab(tab)}>
								{tab}
							</a>
						</li>
					);
				})}
			</ul>
			{children}
		</div>
	);
};

export default TabNav;
