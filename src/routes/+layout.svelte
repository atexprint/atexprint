<script lang="ts">
	import '../app.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	import { currentLocale, getUserPreferredLocale, Locale } from '$i18n';
	import { onDestroy, onMount } from 'svelte';
	import {
		localStorageGetItem,
		LocalStorageKey,
		localStorageSetItem
	} from '$shared/global/functions/local-storage';
	import { isNil } from 'lodash-es';
	import type { Unsubscriber } from 'svelte/store';

	let { children } = $props();

	const UNSUBS: Unsubscriber[] = [];

	// Vercel Speed Insights
	injectSpeedInsights();

	// Vercel Web Analytics
	injectAnalytics();

	onMount(() => {
		let locale = localStorageGetItem(LocalStorageKey.locale);
		if (!Object.values(Locale).includes(locale as Locale)) {
			locale = null;
		}

		if (!isNil(locale)) {
			currentLocale.set(locale as Locale);
		} else {
			currentLocale.set(getUserPreferredLocale());
		}

		UNSUBS.push(
			currentLocale.subscribe((locale) => {
				localStorageSetItem(LocalStorageKey.locale, locale);
			})
		);
	});

	onDestroy(() => {
		UNSUBS.forEach((unsub) => unsub());
	});

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://js.hcaptcha.com/1/api.js?onload=onloadCallback&render=explicit';
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
	});
</script>

{@render children?.()}
