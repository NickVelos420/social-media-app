import { FC } from "react";
import styles from "../../styles/forReactComponents/tabNav.module.scss";

interface propTypes {
	tabs: string[];
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
}

const TabNav: FC<propTypes> = ({ children, tabs, selectedTab, setSelectedTab }) => {
	return (
		<div className={styles.container}>
			<div className={`${styles.tabsContainer}`}>
				{tabs.map(tab => {
					const activeTab = selectedTab === tab ? styles.active : "";
					const nonActiveTabText = !activeTab ? styles.nonActiveTabText : "";

					return (
						<div
							key={tab}
							className={`${activeTab} ${styles.tab} `}
							onClick={() => setSelectedTab(tab)}
						>
							<span className={`${styles.tabText} ${nonActiveTabText}`}>{tab}</span>
						</div>
					);
				})}
			</div>

			<div className={styles.childrenContainer}>
				<div className={styles.children}>{children}</div>
			</div>
		</div>
	);
};

export default TabNav;
