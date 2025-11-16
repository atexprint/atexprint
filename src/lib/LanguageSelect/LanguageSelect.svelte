<script lang="ts">
	import { Locale, LOCALES_MAP, currentLocale, translate } from '$i18n';
	import { Select } from 'bits-ui';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { ITEMS } from './model';

	const UNSUBS: Unsubscriber[] = [];

	let open = $state(false);
	let selectedValue = $state<Locale>($currentLocale);
	const selectedLabel = $derived(ITEMS.find((item) => selectedValue === item.value)?.label ?? '');

	$effect(() => {
		currentLocale.set(selectedValue);
	});

	UNSUBS.push(currentLocale.subscribe((locale) => (selectedValue = locale)));

	function handleOnOpenChange(value: boolean) {
		open = value;
	}

	function handleOnValueChange(value: string) {
		selectedValue = value as Locale;
	}

	onDestroy(() => {
		UNSUBS.forEach((unsub) => unsub());
	});
</script>

<Select.Root
	type="single"
	value={selectedValue}
	onValueChange={handleOnValueChange}
	onOpenChange={handleOnOpenChange}
	{open}
	items={ITEMS}
>
	<Select.Trigger
		class="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-700 transition-colors hover:border-primary hover:bg-gray-50"
	>
		<i class="fa fa-language text-primary"></i>
		{$translate(selectedLabel)}
	</Select.Trigger>

	<Select.Portal>
		<Select.Content
			sideOffset={8}
			class="z-70 rounded-lg border-2 border-primary bg-white p-2 shadow-lg"
		>
			<Select.Viewport class="flex flex-col gap-2">
				{#each ITEMS as { value, label, disabled }, i (i + value)}
					<Select.Item {value} {label} {disabled}>
						{#snippet children({ selected })}
							<div
								class={`flex cursor-pointer items-center gap-4 rounded-lg p-2 transition-colors hover:bg-gray-100 ${selected ? 'bg-gray-50' : ''}`}
							>
								<img
									class="aspect-video h-4 object-cover"
									src={LOCALES_MAP[value].icon.src}
									alt={$translate(LOCALES_MAP[value].icon.alt)}
								/>
								{$translate(label)}
							</div>
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
