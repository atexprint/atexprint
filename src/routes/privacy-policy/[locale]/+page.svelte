<script lang="ts">
	import { resolve } from '$app/paths';
	import { currentLocale, translate } from '$i18n';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import type { Unsubscriber } from 'svelte/store';

	let { data }: { data: PageData } = $props();
	let previousLocale = $currentLocale;
	let unsub: Unsubscriber;

	onMount(() => {
		unsub = currentLocale.subscribe((value) => {
			if (previousLocale !== value) {
				previousLocale = value;
				goto(resolve('/privacy-policy/[locale]', { locale: value }));
			}
		});
	});

	onDestroy(() => {
		if (unsub) {
			unsub();
		}
	});
</script>

<svelte:head>
	<title>{$translate('privacyPolicy.metaTitle')}</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-16">
	<a
		href={resolve('/')}
		class="mb-8 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-rose"
	>
		<i class="fas fa-arrow-left"></i>
		{$translate('privacyPolicy.backToHomepage')}
	</a>

	<h1 class="mb-10 text-4xl font-bold text-primary">
		{$translate('privacyPolicy.title')}
	</h1>

	<article class="prose prose-lg max-w-none text-gray-700">
		{@html data.html}
	</article>
</div>
