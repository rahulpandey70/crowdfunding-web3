import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "../Components/index";
import { CrowdFundingProvider } from "../Context/CrowdFunding";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Crowd Funding Web3",
	description: "Crowd funding web3 full-stack application",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<CrowdFundingProvider>
					<Navbar />
					{children}
					<Footer />
				</CrowdFundingProvider>
			</body>
		</html>
	);
}
