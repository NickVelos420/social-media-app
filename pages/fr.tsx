import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";
import Layout from "../components/Layout";
import FRSentByOthersPending from "../components/social/Fr/FRSentByOthersPending";
import { getUserObject } from "../utils/auth";
import { redirectIfUserIsntLoggedIn } from "../utils/redirectIfIsntLoggedIn";
import { acceptFriendRequest, getAllFriendRequests, rejectFriendRequest } from "../utils/social";

const fr: FC = () => {
	const [friendRequests, setFriendRequests] = useState<{ id: string; username: string }[]>([]);
	const [areThereFriendRequests, setAreThereFriendRequests] = useState<boolean>(false);
	const [receiverId, setReceiverId] = useState("");

	const getFriendRequestAndAddToArray = async () => {
		const fr = await getAllFriendRequests();

		if (!fr) return setAreThereFriendRequests(false);

		setFriendRequests([...fr]);
		setAreThereFriendRequests(true);
	};

	useEffect(() => {
		(async () => {
			const userObj = await getUserObject();

			if (!userObj) return setReceiverId("");

			setReceiverId(userObj.id);
		})();

		(async () => {
			await getFriendRequestAndAddToArray();
		})();
	}, []);

	const acceptFR = async (senderId: string) => {
		try {
			await acceptFriendRequest(senderId, receiverId);

			setFriendRequests(friendRequests.filter(fr => fr.id !== senderId));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (friendRequests.length === 0) setAreThereFriendRequests(false);
	}, [friendRequests]);

	const rejectFR = async (senderId: string) => {
		try {
			await rejectFriendRequest(senderId, receiverId);
		} catch (error) {
			console.log(error);
		} finally {
			location.reload();
			return false;
		}
	};

	return (
		<Layout title="Friend Requests">
			{areThereFriendRequests === false && <h1>You have no friend requests</h1>}
			{areThereFriendRequests === true && (
				<FRSentByOthersPending
					friendRequests={friendRequests}
					acceptFR={acceptFR}
					rejectFR={rejectFR}
				/>
			)}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default fr;
