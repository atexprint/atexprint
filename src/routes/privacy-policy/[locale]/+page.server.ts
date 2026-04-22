import { asset, resolve } from '$app/paths';
import { Locale } from '$i18n';
import { HttpStatus } from '$shared/global/enums/http-status';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';

function getRequestOrigin(requestUrl: URL, headers: Headers): string {
	const forwardedProto = headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
	const forwardedHost = headers.get('x-forwarded-host')?.split(',')[0]?.trim();
	const host = headers.get('host')?.trim();

	if (forwardedProto && forwardedHost) {
		return `${forwardedProto}://${forwardedHost}`;
	}

	if (host) {
		return `${requestUrl.protocol}//${host}`;
	}

	return requestUrl.origin;
}

export const load: PageServerLoad = async ({ params, fetch, request, url }) => {
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
			mdPath = asset('/privacy-policy/en-US.md');
			break;

		case Locale.plPL:
			mdPath = asset('/privacy-policy/pl-PL.md');
			break;
	}

	const origin = getRequestOrigin(url, request.headers);
	const markdownUrl = new URL(mdPath, origin).toString();
	const markdownResponse = await fetch(markdownUrl);

	if (!markdownResponse.ok) {
		throw redirect(HttpStatus.PERMANENT_REDIRECT, resolve(`/privacy-policy/${Locale.enUS}`));
	}

	const markdown = await markdownResponse.text();
	const html = await marked(markdown);

	return { locale, html };
};
