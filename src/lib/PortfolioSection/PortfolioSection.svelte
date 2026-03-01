<script lang="ts">
	import { translate } from '$i18n';
	import { PORTFOLIO_ITEMS } from './model';
</script>

<section id="portfolio" class="my-20 scroll-mt-30">
	<div class="container mx-auto max-w-6xl px-4">
		<h2 class="mb-16 text-center text-4xl font-bold text-primary">
			{$translate('portfolio.title')}
		</h2>
		<div class="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each PORTFOLIO_ITEMS as item}
				<div class="group relative h-[300px] cursor-pointer overflow-hidden rounded-lg shadow-md">
					<img
						src={item.image}
						alt={$translate(item.titleKey)}
						class="h-full w-full object-cover transition-transform group-hover:scale-105"
					/>
					<div
						class="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-rose/85 p-5 text-center text-white opacity-0 transition-opacity group-hover:opacity-100"
					>
						<p class="mb-1 text-xl font-bold">
							{$translate('portfolio.projectTitle')}: {$translate(item.titleKey)}
						</p>
						<p class="text-sm italic">
							{$translate('portfolio.service')}: {$translate(item.serviceKey)}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
