interface returnTypes {
	message: string;
	booleanValue: boolean;
}
export const usePasswordRequirements = (password: string): returnTypes => {
	const passwordValidationRegex =
		/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*?|])[a-zA-Z0-9!@#$%^&*?|]/g;

	if (password.length < 7) {
		return { message: "The password is too small", booleanValue: false };
	} else if (password.length > 300) {
		return { message: "The password is too long", booleanValue: false };
	} else if (!passwordValidationRegex.test(password)) {
		return { message: "password doesn't match the validation rules", booleanValue: false };
	}
	return { message: "none", booleanValue: true };
};
