import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="description" content="A messenger website" />
					<meta charSet="utf-8" />
					{/* <meta name="viewport" content="width=device-width" /> */}
					<meta name="robots" content="noindex, nofollow" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
