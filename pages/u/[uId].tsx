import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { redirectIfUserIsntLoggedIn } from "../../utils/redirectIfIsntLoggedIn";
import { useRouter } from "next/router";
import {
	getSomeonesCredentialsById,
	rejectFriendRequest,
	sendFriendRequest,
} from "../../utils/social";
import { getUserObject } from "../../utils/auth";

const uId: FC = () => {
	const [username, setUsername] = useState("");
	const [receiverId, setReceiverId] = useState("");
	const [error, setError] = useState("");
	const [successfulFriendRequest, setSuccessFriendRequest] = useState(false);
	const [senderId, setSenderId] = useState("");

	const router = useRouter();

	const { uId } = router.query;

	useEffect(() => {
		(async () => {
			if (typeof uId !== "string") return null;

			const res = await getSomeonesCredentialsById(uId);
			setUsername(res.username);
			setReceiverId(res.id);
		})();
	}, [uId]);

	useEffect(() => {
		(async () => {
			const senderUserObj = await getUserObject();

			if (!senderUserObj)
				return setError(
					"An error occurred while sending friend request.Try again if the error persists there might be a problem with the cookies please try logging in again and then send the friend request"
				);

			setSenderId(senderUserObj.id);
		})();
	}, []);

	const sendFriendRequestToUser = async () => {
		try {
			const res = await sendFriendRequest(senderId, receiverId);

			if (res === "Created") {
				setSuccessFriendRequest(true);
				setError("");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const declineFriendRequest = async () => {
		try {
			const senderUserObj = await getUserObject();

			if (!senderUserObj)
				return setError(
					"An error occurred while sending friend request.Try again if the error persists there might be a problem with the cookies please try logging in again and then send the friend request"
				);

			const res = await rejectFriendRequest(senderId, receiverId);

			if (res === "Created") {
				setSuccessFriendRequest(false);
				setError("");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout title={`${username} Profile`}>
			{error}
			<br />
			{username}
			<br />
			{!successfulFriendRequest ? (
				<button onClick={sendFriendRequestToUser}>Add Friend</button>
			) : (
				<button onClick={declineFriendRequest}>Decline Sending Friend Request</button>
			)}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default uId;
