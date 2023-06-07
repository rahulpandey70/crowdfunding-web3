"use client";

import React, { useState, useEffect } from "react";
import Web3modal from "web3modal";
import { ethers } from "ethers";

import { CrowdFundingABI, CrowdFundingAddress } from "../Context/contants";

const fetchContract = (signerOrProvider) => {
	return new ethers.Contract(
		CrowdFundingAddress,
		CrowdFundingABI,
		signerOrProvider
	);
};

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
	const titleData = "Crowd funding contract";
	const [currentAccount, setCurrentAccount] = useState("");
	const [error, setError] = useState("");

	const createCampaign = async (campaign) => {
		const { title, description, amount, deadline } = campaign;
		const web3modal = new Web3modal();
		const connection = await web3modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const contract = fetchContract(signer);

		try {
			const transaction = await contract.createCampaign(
				currentAccount,
				title,
				description,
				ethers.utils.parseEther(amount, 18),
				new Date(deadline).getTime()
			);
			await transaction.wait();
		} catch (error) {
			console.log(error);
		}
	};

	const getCampaigns = async () => {
		const provider = new ethers.providers.JsonRpcProvider();
		const contract = fetchContract(provider);

		const campaigns = await contract.getCampaign();

		const parsedCampaigns = campaigns.map((campaign, idx) => ({
			owner: campaign.owner,
			title: campaign.title,
			description: campaign.description,
			target: ethers.utils.formatEther(campaign.target.toString()),
			deadline: campaign.deadline.toNumber(),
			amountCollected: ethers.utils.formatEther(
				campaign.amountCollected.toString()
			),
			pId: idx,
		}));
		return parsedCampaigns;
	};

	const getUserCampaigns = async () => {
		const provider = new ethers.providers.JsonRpcProvider();
		const contract = fetchContract(provider);

		const allCampaign = await contract.getCampaign();

		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});

		const currentUser = accounts[0];

		const filteredCampaign = allCampaign.filter(
			(campaign) =>
				campaign.owner === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
		);

		const userData = filteredCampaign.map((campaign, idx) => ({
			owner: campaign.owner,
			title: campaign.title,
			description: campaign.description,
			target: ethers.utils.formatEther(campaign.target.toString()),
			deadline: campaign.deadline.toNumber(),
			amountCollected: ethers.utils.formatEther(
				campaign.amountCollected.toString()
			),
			pId: idx,
		}));
		return userData;
	};

	const donate = async (pId, amount) => {
		const web3modal = new Web3modal();
		const connection = await web3modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);

		const campaignData = await contract.donateToCampaign(pId, {
			value: ethers.utils.parseEther(amount),
		});

		await campaignData.wait();
		location.reload();

		return campaignData;
	};

	const getDonations = async (pId) => {
		const provider = new ethers.providers.JsonRpcProvider();
		const contract = fetchContract(provider);

		const donations = await contract.getDonators(pId);
		const numberOfDonations = donations[0].length;

		const parsedDonations = [];

		for (let i = 0; i < numberOfDonations; i++) {
			parsedDonations.push({
				donator: donations[0][i],
				donation: ethers.utils.formatEther(donations[1][i].toString()),
			});
		}
		return parsedDonations;
	};

	// Check wallet is connected or not
	const checkIfWalletConnected = async () => {
		try {
			if (!window.ethereum) return setError("Install MetaMask");

			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log("No account found");
			}
		} catch (error) {
			console.log("Somthing went wrong while connection to wallet");
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	// connect wallet
	const connectWallet = async () => {
		try {
			if (!window.ethereum) return console.log("Install MetaMask");

			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CrowdFundingContext.Provider
			value={{
				titleData,
				currentAccount,
				createCampaign,
				getCampaigns,
				getUserCampaigns,
				donate,
				getDonations,
				connectWallet,
			}}
		>
			{children}
		</CrowdFundingContext.Provider>
	);
};
