<script lang="ts">
	import { asset } from '$app/paths';
	import { translate } from '$i18n';
	import { LanguageSelect } from '$lib';
	import { HEADER_ITEMS } from './model';

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
	<div class="container mx-auto max-w-7xl">
		<div class="flex items-center p-2">
			<!-- Logo -->
			<a href="/" onclick={closeMenu} class="flex items-center">
				<img src={asset('/logo.svg')} alt="ATEX logo" class="inline h-12 w-auto" />
				<span class="ml-2 font-bold">DIGITAL TEXTILE PRINT</span>
			</a>

			<div class="flex-auto"></div>

			<!-- Desktop nav (> 900px) -->
			<nav class="hidden items-center gap-6 min-[900px]:flex">
				{#each HEADER_ITEMS as { href, key }, i (i)}
					<a {href} class="font-medium text-gray-600 transition-colors hover:text-primary"
						>{$translate(`nav.${key}`)}</a
					>
				{/each}

				<div class="ml-2">
					<LanguageSelect />
				</div>
			</nav>

			<!-- Burger button (≤ 900px) -->
			<button
				class="ml-2 flex h-10 w-10 flex-col items-center justify-center gap-1 rounded transition-colors hover:bg-gray-100 min-[900px]:hidden"
				aria-label="Toggle menu"
				aria-expanded={menuOpen}
				onclick={toggleMenu}
			>
				<span
					class="block h-1 w-6 bg-primary transition-all duration-300"
					class:translate-y-2={menuOpen}
					class:rotate-45={menuOpen}
				></span>
				<span
					class="block h-1 w-6 bg-primary transition-all duration-300"
					class:opacity-0={menuOpen}
					class:scale-x-0={menuOpen}
				></span>
				<span
					class="block h-1 w-6 bg-primary transition-all duration-300"
					class:-rotate-45={menuOpen}
					class:-translate-y-2={menuOpen}
				></span>
			</button>
		</div>
	</div>

	<!-- Mobile nav drawer (≤ 900px) -->
	{#if menuOpen}
		<div class="border-t border-gray-200 bg-white min-[900px]:hidden">
			<nav class="container mx-auto flex max-w-7xl flex-col px-4 py-3">
				{#each HEADER_ITEMS as { href, key }, i (i)}
					<a
						{href}
						onclick={closeMenu}
						class="border-b border-gray-100 py-3 font-medium text-gray-600 transition-colors last:border-none hover:text-primary"
						>{$translate(`nav.${key}`)}</a
					>
				{/each}

				<div class="pt-3 pb-1">
					<LanguageSelect />
				</div>
			</nav>
		</div>
	{/if}
</header>
