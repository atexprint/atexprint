<script lang="ts">
	import { translate } from '$i18n';
	import { FEATURES } from './model';
</script>

<section class="my-20 bg-white text-center">
	<div class="container mx-auto max-w-7xl px-4">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each FEATURES as { prefix, hasDescription, icon }, i (i)}
				<div class="rounded-lg bg-gray-50 p-8 shadow-sm">
					<i class={`${icon} mb-5 text-5xl text-primary`}></i>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">
						{$translate(`${prefix}.title`)}
					</h3>
					{#if hasDescription}
						<p class="text-sm text-gray-600">{$translate(`${prefix}.description`)}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
