"use client";

import React, { useState, useContext } from "react";

import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Logo, Menu } from "./index";

const Navbar = () => {
	const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuList = ["Project", "Donation", "Members"];

	return (
		<div className="backgroundMain">
			<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
				<div className="relative flex items-center justify-between">
					<div className="flex items-center">
						<a
							href="/"
							aria-label="CrowdFunding"
							title="CrowdFunding"
							className="inline-flex items-center mr-8"
						>
							<Logo color="text-white" />
							<span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
								CrowdFunding
							</span>
						</a>
						<ul className="flex items-center hidden space-x-8 lg:flex">
							{menuList.map((item, idx) => (
								<li key={idx}>
									<a
										href="/"
										aria-label="nav-item"
										title="nav-item"
										className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>
					{!currentAccount && (
						<ul className="flex items-center hidden space-x-8 lg:flex">
							<li>
								<button
									className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
									onClick={() => connectWallet()}
									aria-label="button"
									title="button"
								>
									Connect Wallet
								</button>
							</li>
						</ul>
					)}

					<div className="lg:hidden z-40">
						<button
							aria-label="Open-Menu"
							title="Open-Menu"
							className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
							onClick={() => setIsMenuOpen(true)}
						>
							<Menu />
						</button>
						{isMenuOpen && (
							<div className="absolute top-0 left-0 w-full">
								<div className="p-5 bg-white border rounded shadow-sm">
									<div className="flex items-center justify-between mb-4">
										<div>
											<a
												href="/"
												aria-label="CrowdFunding"
												title="CrowdFunding"
												className="inline-flex items-center"
											>
												<Logo color="text-black" />
												<span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
													CrowdFunding
												</span>
											</a>
										</div>
										<div>
											<button
												aria-label="Close-menu"
												title="Close-menu"
												className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
												onClick={() => setIsMenuOpen(false)}
											>
												<svg
													viewport="0 0 12 12"
													version="1.1"
													xmlns="http://www.w3.org/2000/svg"
													className="w-5 text-gray-600"
													viewBox="0 0 12 12"
												>
													<line
														x1="1"
														y1="11"
														x2="11"
														y2="1"
														stroke="black"
														strokeWidth="2"
													/>
													<line
														x1="1"
														y1="1"
														x2="11"
														y2="11"
														stroke="black"
														strokeWidth="2"
													/>
												</svg>
											</button>
										</div>
									</div>
									<nav>
										<ul className="space-y-4">
											{menuList.map((item, idx) => (
												<li key={idx}>
													<a
														href="/"
														aria-label="nav-item"
														title="nav-item"
														className="font-medium tracking-wide text-black-100 transition-colors duration-200 hover:text-deep-purple-accent-400"
													>
														{item}
													</a>
												</li>
											))}
											<li>
												<a
													className="inline-flex items-center background justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
													aria-label="signup"
													title="signup"
												>
													Connect Wallet
												</a>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
