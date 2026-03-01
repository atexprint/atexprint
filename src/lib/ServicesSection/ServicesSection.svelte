<script lang="ts">
	import { translate } from '$i18n';
	import { SERVICES } from './model';

	let activeService: string | null = $state(null);

	$effect(() => {
		document.body.style.overflow = activeService ? 'hidden' : '';
	});

	function openPopup(key: string) {
		activeService = key;
	}

	function closePopup() {
		activeService = null;
	}
</script>

<section id="services" class="my-20 scroll-mt-30 bg-gray-50">
	<div class="container mx-auto max-w-7xl px-4">
		<h2 class="mb-12 pt-6 text-center text-4xl font-bold text-primary">
			{$translate('services.title')}
		</h2>
		<div class="grid grid-cols-1 gap-8 pb-6 md:grid-cols-2 lg:grid-cols-3">
			{#each SERVICES as { translationKeyPrefix }, i (i)}
				<button
					class="group min-h-[200px] rounded-lg border-t-4 border-primary bg-white p-8 shadow-md transition-all hover:-translate-y-1 hover:cursor-pointer hover:border-rose hover:shadow-lg"
					onclick={() => openPopup(translationKeyPrefix)}
					onkeydown={(e) => e.key === 'Enter' && openPopup(translationKeyPrefix)}
				>
					<h3 class="mb-4 text-2xl font-semibold text-primary transition-colors group-hover:text-rose">
						{$translate(`${translationKeyPrefix}.title`)}
					</h3>
					<p class="text-gray-600">{$translate(`${translationKeyPrefix}.description`)}</p>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Popup -->
{#if activeService}
	<!-- Backdrop -->
	<div class="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm" aria-hidden="true"></div>

	<!-- Dialog -->
	<div
		class="fixed inset-0 z-101 flex items-center justify-center p-4"
		role="dialog"
		aria-modal="true"
		aria-labelledby="service-popup-title"
	>
		<div
			class="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
			style="width: min(80dvw, 40rem); max-height: min(80dvh, 60rem);"
		>
			<!-- Header -->
			<div class="flex shrink-0 items-start justify-between border-b border-gray-200 px-7 py-5">
				<h2 id="service-popup-title" class="pr-6 text-2xl font-bold text-primary">
					{$translate(`${activeService}.title`)}
				</h2>
				<button
					class="ml-2 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
					aria-label="Close"
					onclick={closePopup}
				>
					<i class="fas fa-times text-lg"></i>
				</button>
			</div>

			<!-- Scrollable body -->
			<div class="overflow-y-auto px-7 py-6">
				<p class="mb-5 text-base font-semibold text-gray-700">
					{$translate(`${activeService}.description`)}
				</p>
				<p class="text-base leading-relaxed text-gray-600">
					{$translate(`${activeService}.text`)}
				</p>
			</div>
		</div>
	</div>
{/if}
