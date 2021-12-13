import { GetServerSideProps } from "next";
import React, { FC, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { redirectIfUserIsntLoggedIn } from "../../utils/redirectIfIsntLoggedIn";
import { useRouter } from "next/router";
import {
	acceptFriendRequest,
	checkIfUsersAreFriendsAndIfHasSentFR,
	getSomeonesCredentialsById,
	rejectFriendRequest,
	sendFriendRequest,
} from "../../utils/social";
import NotFriendsProfile from "../../components/social/NotFriendsProfile";
import AreFriendsProfile from "../../components/social/AreFriendsProfile";
import WhoHasSentFRProfile from "../../components/social/WhoHasSentFRProfile";

const uId: FC = props => {
	type whoSentRequestType = -1 | 0 | 1;

	const [username, setUsername] = useState("");
	const [receiverId, setReceiverId] = useState("");
	const [error, setError] = useState("");
	const [successfulFriendRequest, setSuccessFriendRequest] = useState(false);
	const [senderId, setSenderId] = useState("");
	const [areUsersFriends, setAreUsersFriends] = useState<boolean | null>(null);
	const [hasSentFriendRequest, setHasSentFriendRequest] = useState<boolean | null>(null);
	const [whoSentRequest, setWhoSentRequest] = useState<whoSentRequestType>(-1);
	const [successfullyAcceptedFR, setSuccessfullyAcceptedFR] = useState<boolean | null>(null);

	const router = useRouter();

	const { uId } = router.query;

	//! Sets receiverId and username state
	useEffect(() => {
		(async () => {
			if (typeof uId !== "string") return null;

			const res = await getSomeonesCredentialsById(uId);
			setUsername(res.username);
			setReceiverId(res.id);
		})();
	}, [uId]);

	//! Check if users are friends and sets state
	useEffect(() => {
		if (senderId && receiverId) {
			(async () => {
				try {
					const res = await checkIfUsersAreFriendsAndIfHasSentFR(senderId, receiverId);
					if (res === null) return setError("An error occurred, try again later");
					console.log(res);
					if (
						res.hasSent_FR_Obj?.hasSentRequest === true &&
						res.hasSent_FR_Obj?.whoSentRequest === 0
					) {
						setHasSentFriendRequest(true);
						setWhoSentRequest(0);
						setAreUsersFriends(false);
					} else if (
						res.hasSent_FR_Obj?.hasSentRequest === true &&
						res.hasSent_FR_Obj.whoSentRequest === 1
					) {
						setHasSentFriendRequest(true);
						setWhoSentRequest(1);
						setAreUsersFriends(false);
					} else if (
						res.hasSent_FR_Obj?.hasSentRequest === false &&
						res.hasSent_FR_Obj?.whoSentRequest === -1
					) {
						setAreUsersFriends(false);
						setHasSentFriendRequest(false);
					} else if (res.areFriends) {
						setAreUsersFriends(true);
						setHasSentFriendRequest(false);
					} else if (!res.areFriends) {
						setAreUsersFriends(false);
						setHasSentFriendRequest(false);
					}
				} catch (error) {
					console.log(error);
					setError("An error occurred, try again later");
				}
			})();
		} else return;
	}, [senderId, receiverId]);

	//! Sets senderId state
	useEffect(() => {
		// @ts-ignore
		if (!props?.user)
			return setError(
				"An error occurred while sending friend request.Try again if the error persists there might be a problem with the cookies please try logging in again and then send the friend request"
			);

		// @ts-ignore
		setSenderId(props?.user?.id);
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
			const res = await rejectFriendRequest(senderId, receiverId);

			if (res === "OK") {
				setSuccessFriendRequest(false);
				setError("");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const acceptFR = async () => {
		try {
			const res = await acceptFriendRequest(senderId, receiverId);

			if (res === "Created") {
				setSuccessfullyAcceptedFR(true);
				setError("");
			}
		} catch (error) {
			//! why not check if they are friends
			console.error(error);
			setSuccessfullyAcceptedFR(false);
			setError(
				"An error occurred while accepting friend request.Try again if the error persists there might be a problem with the cookies please try logging in again and then accept the friend request"
			);
		}
	};

	console.log(areUsersFriends, hasSentFriendRequest, whoSentRequest);

	if (senderId && receiverId) {
		if (areUsersFriends === true) {
			return (
				<Layout title={`${username} Profile`}>
					<AreFriendsProfile username={username} />
				</Layout>
			);
		} else if (hasSentFriendRequest === true) {
			return (
				<Layout title={`${username}'s Profile'`}>
					<WhoHasSentFRProfile
						username={username}
						declineFR={declineFriendRequest}
						whoSentRequest={whoSentRequest}
						acceptFR={acceptFR}
						successfullyAcceptedFR={successfullyAcceptedFR}
					/>
				</Layout>
			);
		} else if (areUsersFriends === false) {
			return (
				<Layout title={`${username} Profile`}>
					<NotFriendsProfile
						username={username}
						receiverId={receiverId}
						senderId={senderId}
						sendFriendRequest={sendFriendRequestToUser}
						declineFriendRequest={declineFriendRequest}
						successfulFriendRequest={successfulFriendRequest}
					/>
				</Layout>
			);
		}
	}
	return <>{error}</>;
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default uId;
