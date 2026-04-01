<script lang="ts">
	import { translate } from '$i18n';
	import type { PORTFOLIO_ITEMS } from './model';

	type PortfolioItem = (typeof PORTFOLIO_ITEMS)[number];
	type MediaItem = PortfolioItem['media'][number];

	interface Props {
		media: readonly MediaItem[];
		title: string;
		onclose: () => void;
	}

	let { media, title, onclose }: Props = $props();

	let currentIndex = $state(0);
	let thumbnailContainer: HTMLDivElement | undefined = $state();

	const currentMedia = $derived(media[currentIndex]);

	function goTo(index: number) {
		currentIndex = index;
	}

	function goPrev() {
		currentIndex = currentIndex === 0 ? media.length - 1 : currentIndex - 1;
	}

	function goNext() {
		currentIndex = currentIndex === media.length - 1 ? 0 : currentIndex + 1;
	}

	function handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowLeft':
				e.preventDefault();
				goPrev();
				break;
			case 'ArrowRight':
				e.preventDefault();
				goNext();
				break;
			case 'Escape':
				e.preventDefault();
				onclose();
				break;
		}
	}

	$effect(() => {
		// Keep the active thumbnail centered in the carousel
		if (!thumbnailContainer) return;
		const activeThumb = thumbnailContainer.children[currentIndex] as HTMLElement | undefined;
		if (!activeThumb) return;

		const containerWidth = thumbnailContainer.offsetWidth;
		const thumbLeft = activeThumb.offsetLeft;
		const thumbWidth = activeThumb.offsetWidth;
		const scrollTarget = thumbLeft - containerWidth / 2 + thumbWidth / 2;

		thumbnailContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' });
	});

	$effect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop -->
<div
	class="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm"
	onclick={onclose}
	aria-hidden="true"
	role="presentation"
></div>

<!-- Dialog -->
<div
	class="fixed inset-0 z-101 flex items-center justify-center p-4"
	role="dialog"
	aria-modal="true"
	aria-label={$translate(title)}
>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="relative flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
		role="document"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
	>
		<!-- Header -->
		<div class="flex shrink-0 items-center justify-between px-5 py-3">
			<h2 class="text-lg font-semibold text-gray-900">
				{$translate(title)}
				<span class="ml-2 text-sm font-normal text-gray-500">
					{currentIndex + 1} / {media.length}
				</span>
			</h2>
			<button
				class="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
				aria-label="Close"
				onclick={onclose}
			>
				<i class="fas fa-times text-lg"></i>
			</button>
		</div>

		<!-- Main media area -->
		<div class="relative flex min-h-0 flex-1 items-center justify-center px-14 py-2">
			<!-- Left arrow -->
			<button
				class="absolute left-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
				aria-label="Previous"
				onclick={goPrev}
			>
				<i class="fas fa-chevron-left"></i>
			</button>

			<!-- Media display -->
			<div class="flex max-h-[60dvh] items-center justify-center overflow-hidden rounded-lg">
				{#key currentIndex}
					{#if currentMedia.type === 'img'}
						<img
							src={currentMedia.url}
							alt="{$translate(title)} - {currentIndex + 1}"
							class="max-h-[60dvh] max-w-full object-contain"
							draggable="false"
						/>
					{:else if currentMedia.type === 'video'}
						<video
							src={currentMedia.url}
							autoplay
							muted
							loop
							playsinline
							class="max-h-[60dvh] max-w-full object-contain"
						>
							{$translate('general.html5VideoUnsupported')}
						</video>
					{/if}
				{/key}
			</div>

			<!-- Right arrow -->
			<button
				class="absolute right-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
				aria-label="Next"
				onclick={goNext}
			>
				<i class="fas fa-chevron-right"></i>
			</button>
		</div>

		<!-- Thumbnail carousel -->
		<div class="shrink-0 border-t border-gray-200 px-4 py-3">
			<div
				bind:this={thumbnailContainer}
				class="flex gap-2 overflow-x-auto scroll-smooth"
				style="scrollbar-width: none; -ms-overflow-style: none;"
			>
				{#each media as item, i (i)}
					<button
						class="relative h-16 w-16 flex-none cursor-pointer overflow-hidden rounded-md border-2 transition-all {i ===
						currentIndex
							? 'border-rose opacity-100'
							: 'border-transparent opacity-50 hover:opacity-80'}"
						onclick={() => goTo(i)}
						aria-label="Go to media {i + 1}"
					>
						{#if item.type === 'img'}
							<img
								src={item.url}
								alt="Thumbnail {i + 1}"
								class="h-full w-full object-cover"
								loading="lazy"
								draggable="false"
							/>
						{:else if item.type === 'video'}
							<video
								src={item.url}
								preload="metadata"
								class="h-full w-full object-cover"
								muted
							></video>
							<div
								class="absolute inset-0 flex items-center justify-center bg-black/30"
							>
								<i class="fas fa-play text-xs text-white"></i>
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
