import React from "react";

const Card = ({ title, allCampaign, setOpenModel, setDonate }) => {
	const daysLeft = (deadline) => {
		const diff = new Date(deadline).getTime() - Date.now();
		const remainingDay = diff / (1000 * 3600 * 24);
		return remainingDay.toFixed(0);
	};

	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<p className="py-16 text-2xl font-bold leading-5">{title}</p>
			<div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:max-auto lg:max-w-full">
				{allCampaign?.map((campaign, idx) => (
					<div
						key={idx}
						onClick={() => (setDonate(campaign), setOpenModel(true))}
						className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded"
					>
						<img
							src="https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=600"
							className="object-cover w-full h-64 rounded"
							alt=""
						/>

						<div className="py-5 pl-2">
							<p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
								Days Left: {daysLeft(campaign.deadline)}
							</p>
							<a
								href="/"
								aria-label="article"
								className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
							>
								<p className="text-2xl font-bold leading-5">{campaign.title}</p>
							</a>
							<p className="mb-4 text-gray-700">{campaign.description}</p>
							<div className="flex space-x-4">
								<p className="font-semibold">Target: {campaign.target} ETH</p>
								<p className="font-semibold">
									Raised: {campaign.amountCollected} ETH
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Card;
