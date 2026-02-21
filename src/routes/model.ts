import { asset, resolve } from '$app/paths';

export const SERVICES = [
	{
		translationKeyPrefix: 'services.sublimation'
	},
	{
		translationKeyPrefix: 'services.diffusion'
	},
	{
		translationKeyPrefix: 'services.screenPrinting'
	},
	{
		translationKeyPrefix: 'services.logoTags'
	},
	{
		translationKeyPrefix: 'services.packaging'
	}
];

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

const aboutStatsKey = 'about.stats';
export const STATS = [
	{
		target: 12,
		useSuffix: false,
		isPercentage: false,
		descriptionKey: `${aboutStatsKey}.yearsOfExperience`
	},
	{
		target: 400000,
		useSuffix: true,
		isPercentage: false,
		descriptionKey: `${aboutStatsKey}.printMeters`
	},
	{
		target: 98,
		useSuffix: false,
		isPercentage: true,
		descriptionKey: `${aboutStatsKey}.satisfiedClients`
	}
];

export const HEADER_ITEMS = [
	{ href: resolve('/#about'), key: 'about' },
	{ href: resolve('/#services'), key: 'services' },
	{ href: resolve('/#portfolio'), key: 'portfolio' },
	{ href: resolve('/#instagram'), key: 'instagram' },
	{ href: resolve('/#contact'), key: 'contact' }
];
