import { asset } from '$app/paths';

export const SERVICES = [
	{
		translationKeyPrefix: 'services.sublimation',
		media: {
			type: 'video' as const,
			url: asset('/media/our-services/sublimation.mp4'),
			poster: asset('/media/our-services/sublimation-poster.jpeg'),
			alt: '',
			mimetype: 'video/mp4'
		}
	},
	{
		translationKeyPrefix: 'services.dtfPrint',
		media: {
			type: 'image' as const,
			url: asset('/media/our-services/dtf-print.jpeg'),
			alt: ''
		}
	},
	{
		translationKeyPrefix: 'services.screenPrinting',
		media: {
			type: 'image' as const,
			url: asset('/media/our-services/screen-print.jpeg'),
			alt: ''
		}
	},
	{
		translationKeyPrefix: 'services.logoTags',
		media: {
			type: 'image' as const,
			url: asset('/media/our-services/logo-tags.jpeg'),
			alt: ''
		}
	},
	{
		translationKeyPrefix: 'services.eventAndMarketingClothing',
		media: {
			type: 'image' as const,
			url: asset('/media/our-services/ad-clothing.jpeg'),
			alt: ''
		}
	},
	{
		translationKeyPrefix: 'services.graphicStudio',
		media: {
			type: 'image' as const,
			url: asset('/media/our-services/project-studio.jpeg'),
			alt: ''
		}
	}
];
