const getURLFromEnv = (frontEnd: boolean) => {
	if (frontEnd) {
		return process.env.NODE_ENV === "production"
			? process.env.NEXT_PUBLIC_PRODUCTION_WEB_URL
			: process.env.NEXT_PUBLIC_TESTING_WEB_URL;
	}

	return process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_BACKEND_PRODUCTION_WEB_URL
		: process.env.NEXT_PUBLIC_BACKEND_TESTING_WEB_URL;
};

export default getURLFromEnv;
