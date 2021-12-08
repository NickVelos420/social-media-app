import { FC, useEffect, useState } from "react";
import { getUsersFromSomeOfTheFirstUsernameChars } from "../utils/social";
import Link from "next/link";

const Search: FC = () => {
	const [username, setUsername] = useState("");
	const [usersArray, setUsersArray] = useState<{ id: string; username: string }[]>([]);

	//* got the code from
	//* https://dev.to/przemwo/how-to-execute-a-function-only-after-the-user-stops-typing-beh
	//* It just makes the req when the user has stopped typing
	//!  Only thing to add is a loading gif while the user is typing
	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (!username.trim()) return setUsersArray([]);

			const users = await getUsersFromSomeOfTheFirstUsernameChars(username);

			if (!users) {
				setUsersArray([{ id: "", username: "" }]);
				return null;
			}

			setUsersArray(users);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [username]);

	return (
		<>
			<div className="input-group">
				<span className="input-group-text" id="basic-addon1">
					@
				</span>
				<input
					type="text"
					className="form-control"
					placeholder="Username"
					onChange={e => {
						setUsername(e.target.value);
					}}
				/>
			</div>
			<div>
				{usersArray.map(({ username, id }) => {
					if (!username && !id && usersArray.length === 1) {
						return (
							<div>
								<span>Wow such empty!</span>
							</div>
						);
					}
					return (
						<div>
							<Link key={id} href={`/u/${id}?`}>
								<a>@{username}</a>
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Search;
