import React from "react";

interface propTypes {
	isSelected: boolean;
}

const Tab: React.FC<propTypes> = ({ isSelected, children }) => {
	if (isSelected) {
		return <div>{children}</div>;
	}

	return null;
};

export default Tab;
