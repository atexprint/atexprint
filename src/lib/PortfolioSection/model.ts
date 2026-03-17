import { asset } from '$app/paths';

const portfolioItemsKey = `portfolio.items`;
export const PORTFOLIO_ITEMS = [
	{
		image: asset(`/media/portfolio/0.jpg`),
		titleKey: `${portfolioItemsKey}.customTShirts`,
		serviceKey: `${portfolioItemsKey}.screenPrinting`
	},
	{
		image: asset(`/media/portfolio/1.jpg`),
		titleKey: `${portfolioItemsKey}.scarfPrinting`,
		serviceKey: `${portfolioItemsKey}.diffusionPrinting`
	},
	{
		image: asset(`/media/portfolio/2.jpg`),
		titleKey: `${portfolioItemsKey}.luxuryPackaging`,
		serviceKey: `${portfolioItemsKey}.cardboardPackaging`
	},
	{
		image: asset(`/media/portfolio/3.jpg`),
		titleKey: `${portfolioItemsKey}.brandedMugs`,
		serviceKey: `${portfolioItemsKey}.sublimation`
	},
	{
		image: asset(`/media/portfolio/4.jpg`),
		titleKey: `${portfolioItemsKey}.elegantLogoTags`,
		serviceKey: `${portfolioItemsKey}.logoTags`
	},
	{
		image: asset(`/media/portfolio/5.jpg`),
		titleKey: `${portfolioItemsKey}.specialtyItems`,
		serviceKey: `${portfolioItemsKey}.screenPrintingSpecial`
	}
];
