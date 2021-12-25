import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";
import Layout from "../components/Layout";
import FRSentByMePending from "../components/social/Fr/FRSentByMePending";
import FRSentByOthersPending from "../components/social/Fr/FRSentByOthersPending";
import { getUserObject } from "../utils/auth";
import { redirectIfUserIsntLoggedIn } from "../utils/redirectIfIsntLoggedIn";
import {
	acceptFriendRequest,
	getAllFriendRequests,
	getFRSentByMe,
	rejectFriendRequest,
} from "../utils/social";

const fr: FC = () => {
	const [FRSentByOthers, setFRSentByOthers] = useState<{ id: string; username: string }[]>([]);
	const [areThereFriendRequests, setAreThereFriendRequests] = useState<boolean>(false);
	const [receiverId, setReceiverId] = useState("");
	const [FRSentByMe, setFRSentByMe] = useState<{ id: string; username: string }[]>([]);

	const getFriendRequestAndAddToArray = async () => {
		const fr = await getAllFriendRequests();
		const frByMe = await getFRSentByMe();
		console.log(fr);
		if (fr?.length) {
			setFRSentByOthers([...fr]);
			setAreThereFriendRequests(true);
			if (!frByMe.length || !frByMe) {
				return;
			}
		}
		if (frByMe?.length) {
			setFRSentByMe([...frByMe]);
			setAreThereFriendRequests(true);
			return;
		}
		setAreThereFriendRequests(false);
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

			setFRSentByOthers(FRSentByOthers.filter(fr => fr.id !== senderId));
		} catch (error) {
			console.log(error);
		} finally {
			location.reload();
			return false;
		}
	};

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
	console.log(areThereFriendRequests);
	return (
		<Layout title="Friend Requests">
			{areThereFriendRequests === false && <h1>You have no friend requests</h1>}
			{areThereFriendRequests === true && (
				<>
					<h3>Friend Requests Sent By Others</h3>
					<FRSentByOthersPending
						friendRequests={FRSentByOthers}
						acceptFR={acceptFR}
						rejectFR={rejectFR}
					/>
					<h3>Friend Requests Sent By You</h3>
					<FRSentByMePending friendRequests={FRSentByMe} declineFR={rejectFR} />
				</>
			)}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default fr;
