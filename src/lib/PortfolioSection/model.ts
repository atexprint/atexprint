import { asset } from '$app/paths';

const portfolioItemsKey = `portfolio.items`;
export const PORTFOLIO_ITEMS = [
	{
		image: asset(`/img/0.jpg`),
		titleKey: `${portfolioItemsKey}.customTShirts`,
		serviceKey: `${portfolioItemsKey}.screenPrinting`
	},
	{
		image: asset(`/img/1.jpg`),
		titleKey: `${portfolioItemsKey}.scarfPrinting`,
		serviceKey: `${portfolioItemsKey}.diffusionPrinting`
	},
	{
		image: asset(`/img/2.jpg`),
		titleKey: `${portfolioItemsKey}.luxuryPackaging`,
		serviceKey: `${portfolioItemsKey}.cardboardPackaging`
	},
	{
		image: asset(`/img/3.jpg`),
		titleKey: `${portfolioItemsKey}.brandedMugs`,
		serviceKey: `${portfolioItemsKey}.sublimation`
	},
	{
		image: asset(`/img/4.jpg`),
		titleKey: `${portfolioItemsKey}.elegantLogoTags`,
		serviceKey: `${portfolioItemsKey}.logoTags`
	},
	{
		image: asset(`/img/5.jpg`),
		titleKey: `${portfolioItemsKey}.specialtyItems`,
		serviceKey: `${portfolioItemsKey}.screenPrintingSpecial`
	}
];
