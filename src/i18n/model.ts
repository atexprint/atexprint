import { asset } from '$app/paths';

import csCZ from './translations/cs-CZ.json';
import deDE from './translations/de-DE.json';
import enUS from './translations/en-US.json';
import huHU from './translations/hu-HU.json';
import plPL from './translations/pl-PL.json';
import ruRU from './translations/ru-RU.json';

export enum Locale {
	csCZ = 'cs-CZ',
	deDE = 'de-DE',
	enUS = 'en-US',
	huHU = 'hu-HU',
	plPL = 'pl-PL',
	ruRU = 'ru-RU'
}

export const LOCALES_MAP: Record<
	Locale,
	{
		label: string;
		icon: {
			src: string;
			alt: string;
		};
	}
> = {
	[Locale.csCZ]: {
		label: 'language.czech.label',
		icon: {
			src: asset('/flags/cz.svg'),
			alt: 'language.czech.alt'
		}
	},
	[Locale.deDE]: {
		label: 'language.german.label',
		icon: {
			src: asset('/flags/de.svg'),
			alt: 'language.german.alt'
		}
	},
	[Locale.enUS]: {
		label: 'language.english.label',
		icon: {
			src: asset('/flags/us.svg'),
			alt: 'language.english.alt'
		}
	},
	[Locale.huHU]: {
		label: 'language.hungarian.label',
		icon: {
			src: asset('/flags/hu.svg'),
			alt: 'language.hungarian.alt'
		}
	},
	[Locale.plPL]: {
		label: 'language.polish.label',
		icon: {
			src: asset('/flags/pl.svg'),
			alt: 'language.polish.alt'
		}
	},
	[Locale.ruRU]: {
		label: 'language.russian.label',
		icon: {
			src: asset('/flags/ru.svg'),
			alt: 'language.russian.alt'
		}
	}
};

export const TRANSLATIONS = {
	[Locale.csCZ]: csCZ,
	[Locale.deDE]: deDE,
	[Locale.enUS]: enUS,
	[Locale.huHU]: huHU,
	[Locale.plPL]: plPL,
	[Locale.ruRU]: ruRU
};

export function getUserPreferredLocale(): Locale {
	const userPreferredLangs = navigator.languages || [navigator.language];
	const supportedLocales = Object.values(Locale);

	for (const lang of userPreferredLangs) {
		const baseLang = lang.slice(0, 2);
		const matchedLocale = supportedLocales.find((supported) => supported.startsWith(baseLang));

		if (matchedLocale) {
			return matchedLocale;
		}
	}

	return Locale.enUS;
}
