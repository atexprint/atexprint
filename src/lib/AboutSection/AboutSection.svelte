<script lang="ts">
	import { currentLocale, translate } from '$i18n';
	import { STATS } from './model';
	import { runAnimations, updateSuffixes } from './stats-animation-functions';

	let sectionEl: HTMLElement | undefined = $state();
	let animationStarted = $state(false);

	$effect(() => {
		if (!sectionEl) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !animationStarted) {
					animationStarted = true;
					runAnimations();
					observer.disconnect();
				}
			},
			{ threshold: 0.25 }
		);

		observer.observe(sectionEl);

		return () => observer.disconnect();
	});

	$effect(() => {
		const unsubscribe = currentLocale.subscribe(() => {
			if (animationStarted) {
				updateSuffixes();
			}
		});

		return () => unsubscribe();
	});
</script>

<section bind:this={sectionEl} id="about" class="my-20 scroll-mt-30 bg-white">
	<div class="container mx-auto max-w-7xl px-4">
		<h2 class="mb-12 text-center text-4xl font-bold text-primary">{$translate('about.title')}</h2>
		<div class="flex flex-col items-center gap-12 lg:flex-row">
			<div class="flex-2 text-lg leading-relaxed">
				<p class="mb-4">
					{@html $translate('about.text')}
				</p>
				<div class="flex w-full justify-center">
					<a
						href="#services"
						class="mt-12 inline-block rounded border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-all hover:border-rose hover:bg-rose hover:text-white"
						>{$translate('about.cta')}</a
					>
				</div>
			</div>

			<div class="flex min-w-[250px] flex-1 flex-col gap-8 rounded bg-gray-50 p-10">
				{#each STATS as { target, useSuffix, isPercentage, descriptionKey }, i (i)}
					<div class="text-center">
						<span
							class="animated-number text-5xl leading-none font-bold text-rose opacity-0"
							data-target={target}
							data-use-suffix={useSuffix}
							data-is-percentage={isPercentage}>0</span
						>
						<p class="mt-1 text-xs tracking-wider text-gray-600 uppercase">
							{$translate(descriptionKey)}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
