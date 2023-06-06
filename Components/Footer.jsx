import React from "react";

const Footer = () => {
	const productList = ["Market", "ERC20 Token", "Donation"];
	const contactList = ["support@gmail.com", "info@gmail.com", "Contact Us"];
	const usefullLink = ["Home", "About Us", "Company Details"];

	return (
		<footer className="text-center text-white backgroundMain lg:text-left">
			<div className="mx-6 py-10 text-center md:text-left">
				<div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
							Crowd Funding
						</h6>
						<p>
							Contrary to popular belief, Lorem Ipsum is not simply random text.
							It has roots in a piece of classical Latin literature from 45 BC,
							making it over 2000 years old
						</p>
					</div>
					<div>
						<h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
							Products
						</h6>
						{productList.map((product, idx) => (
							<p className="mb-4" key={idx}>
								<a href="#">{product}</a>
							</p>
						))}
					</div>
					<div>
						<h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
							UsefullLinks
						</h6>
						{usefullLink.map((link, idx) => (
							<p className="mb-4" key={idx}>
								<a href="#">{link}</a>
							</p>
						))}
					</div>
					<div>
						<h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
							Contacts
						</h6>
						{contactList.map((contact, idx) => (
							<p className="mb-4" key={idx}>
								<a href="#">{contact}</a>
							</p>
						))}
					</div>
				</div>
			</div>
			<div className="backgroundMain p-6 text-center">
				<span>&#169; 2023 All Rights Reserved</span>
			</div>
		</footer>
	);
};

export default Footer;
