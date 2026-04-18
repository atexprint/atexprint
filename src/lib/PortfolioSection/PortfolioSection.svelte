<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from '$i18n';
	import { PORTFOLIO_ITEMS, preloadPortfolioMedia, getCachedUrl } from './model';
	import PortfolioGallery from './PortfolioGallery.svelte';

	let activeItemIndex: number | null = $state(null);

	onMount(() => {
		if (document.readyState === 'complete') {
			preloadPortfolioMedia();
		} else {
			window.addEventListener('load', preloadPortfolioMedia, { once: true });
		}
	});
</script>

<section id="portfolio" class="my-20 scroll-mt-30">
	<div class="container mx-auto max-w-6xl px-4">
		<h2 class="mb-16 text-center text-4xl font-bold text-primary">
			{$translate('portfolio.title')}
		</h2>
		<div class="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each PORTFOLIO_ITEMS as { image, title, description }, i (i)}
				<button
					class="group relative h-[300px] cursor-pointer overflow-hidden rounded-lg shadow-md"
					onclick={() => (activeItemIndex = i)}
				>
					<img
						src={getCachedUrl(image)}
						alt={$translate(title)}
						class="h-full w-full object-cover transition-transform group-hover:scale-105"
						loading="lazy"
					/>
					<div
						class="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-rose/25 p-5 text-center text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
					>
						<p class="mb-1 text-xl font-bold">
							{$translate(title)}
						</p>
						<p class="text-s font-semibold italic">
							{$translate(description)}
						</p>
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>

{#if activeItemIndex !== null}
	{@const item = PORTFOLIO_ITEMS[activeItemIndex]}
	<PortfolioGallery
		media={item.media}
		title={item.title}
		onclose={() => (activeItemIndex = null)}
	/>
{/if}
