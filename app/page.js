"use client";

import React, { useState, useContext, useEffect } from "react";

import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PopUp } from "../Components/index";

export default function Home() {
	const {
		titleData,
		getCampaigns,
		createCampaign,
		donate,
		getUserCampaigns,
		getDonations,
	} = useContext(CrowdFundingContext);

	const [allCampaign, setAllCampaign] = useState();
	const [userCampaign, setUserCampaign] = useState();
	const [openModel, setOpenModel] = useState(false);
	const [donateCampaign, setDonateCampaign] = useState();

	useEffect(() => {
		const getCampaignData = getCampaigns();
		const userCampaignData = getUserCampaigns();
		return async () => {
			const allData = await getCampaignData;
			const userData = await userCampaignData;
			setAllCampaign(allData);
			setUserCampaign(userData);
		};
	}, []);

	console.log(donateCampaign);

	return (
		<>
			<Hero titleData={titleData} createCampaign={createCampaign} />

			<Card
				title="All Listed Campaign"
				allCampaign={allCampaign}
				setOpenModel={setOpenModel}
				setDonate={setDonateCampaign}
			/>

			<Card
				title="Your Campaign"
				allCampaign={userCampaign}
				setOpenModel={setOpenModel}
				setDonate={setDonateCampaign}
			/>

			{openModel && (
				<PopUp
					setOpenModel={setOpenModel}
					getDonations={getDonations}
					donate={donateCampaign}
					donateFunction={donate}
				/>
			)}
		</>
	);
}
