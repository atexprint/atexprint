import { resolve } from '$app/paths';
import { Locale } from '$i18n';
import { HttpStatus } from '$shared/global/enums/http-status';
import { redirect } from '@sveltejs/kit';
import { marked } from 'marked';
import fs from 'node:fs';
import path from 'node:path';

export async function load({ params }) {
	const locale = params.locale as Locale;

	if (!Object.values(Locale).includes(locale as Locale)) {
		throw redirect(HttpStatus.PERMANENT_REDIRECT, resolve(`/privacy-policy/${Locale.enUS}`));
	}

	let mdPath;
	switch (locale) {
		// case Locale.csCZ:
		// case Locale.deDE:
		// case Locale.huHU:
		// case Locale.ruRU:
		case Locale.enUS:
			mdPath = path.resolve('static', 'privacy-policy', `${Locale.enUS}.md`);
			break;

		case Locale.plPL:
			mdPath = path.resolve('static', 'privacy-policy', `${locale}.md`);
			break;
	}

	const html = await marked(fs.readFileSync(mdPath, 'utf-8'));

	return { locale, html };
}
