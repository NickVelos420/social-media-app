import { FC, FormEvent, useState } from "react";
import { deleteAccount } from "../../../utils/auth";
import HideShowEye from "../../HideShowEye";

const DeleteAccount: FC = () => {
	const [password, setPassword] = useState("");
	const [passwordType, setPasswordType] = useState<"password" | "text">("password");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [finishedReq, setFinishedReq] = useState(false);

	const handleDelete = async (e: FormEvent) => {
		e.preventDefault();
		const resDelAcc = await deleteAccount(password);
		console.log(resDelAcc);
		if (!resDelAcc) return setErrorMessage("Something went wrong with the request try again later");

		if (resDelAcc.error) return setErrorMessage(resDelAcc.errorMessage);

		setSuccessMessage(resDelAcc.message);
		setFinishedReq(true);
		return;
	};

	const handleShowPassword = () => {
		if (passwordType === "password") {
			return setPasswordType("text");
		}
		return setPasswordType("password");
	};

	const showErrorOrSuccessMsg = () => {
		if (errorMessage) return <p className="error-message">{errorMessage}</p>;
		if (successMessage) return <p className="success-message">{successMessage}</p>;
		return null;
	};

	return (
		<>
			{!finishedReq ? (
				<form onSubmit={handleDelete}>
					<input
						placeholder="Password"
						type={passwordType}
						required
						onChange={e => setPassword(e.target.value)}
					/>
					<HideShowEye onClick={handleShowPassword} inputType={passwordType} />
					<br />
					<button className="btn btn-danger mt-1" type="submit">
						Delete Account
					</button>
				</form>
			) : (
				showErrorOrSuccessMsg()
			)}
		</>
	);
};

export default DeleteAccount;
