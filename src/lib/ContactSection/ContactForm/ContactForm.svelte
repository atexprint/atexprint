<script lang="ts">
	import { currentLocale, translate } from '$i18n';
	import { createForm } from 'svelte-forms-lib';
	import { resolve } from '$app/paths';
	import {
		CONTACT_FORM_INITIAL_VALUE,
		CONTACT_FORM_SCHEMA,
		CONTACT_FORM_SERVICES,
		type ContactFormData
	} from './model';

	import { baseFetch } from '$shared/global/functions/base-fetch';
	import { HttpMethod } from '$shared/global/enums/http-method';
	import { getBaseHeaders } from '$shared/global/functions/get-base-headers';
	import type { ContactFormDataRequest } from '$api/contact-request/model';
	import { PUBLIC_H_CATPCHA_SITE_KEY } from '$env/static/public';

	let loading = $state(false);
	let submitError = $state<string | null>(null);
	let submitSuccess = $state(false);
	let hCaptchaToken = $state<string | null>(null);

	let captchaEl: HTMLDivElement | undefined = $state();
	let captchaWidgetId: string | undefined;

	$effect(() => {
		if (!captchaEl) return;

		// Wait for the hCaptcha script to be ready, then render explicitly.
		// This avoids the widget disappearing when Svelte re-renders the component.
		const render = () => {
			const hcaptcha = (window as any).hcaptcha;
			if (!hcaptcha) return;

			captchaWidgetId = hcaptcha.render(captchaEl, {
				sitekey: PUBLIC_H_CATPCHA_SITE_KEY,
				callback: (token: string) => (hCaptchaToken = token),
				'expired-callback': () => (hCaptchaToken = null)
			});
		};

		if ((window as any).hcaptcha) {
			render();
		} else {
			(window as any).onloadCallback = render;
		}

		return () => {
			if (captchaWidgetId !== undefined) {
				(window as any).hcaptcha?.reset(captchaWidgetId);
			}
		};
	});

	const { form, errors, touched, handleChange, handleSubmit, handleReset } =
		createForm<ContactFormData>({
			initialValues: { ...CONTACT_FORM_INITIAL_VALUE },
			validationSchema: CONTACT_FORM_SCHEMA,
			onSubmit: async (values) => {
				if (!hCaptchaToken) return;

				loading = true;
				submitError = null;
				submitSuccess = false;

				const result = await baseFetch(() =>
					fetch(resolve('/api/contact-request'), {
						method: HttpMethod.POST,
						headers: getBaseHeaders(),
						body: JSON.stringify({
							...values,
							locale: $currentLocale,
							hCaptchaToken: hCaptchaToken!
						} satisfies ContactFormDataRequest)
					})
				);

				loading = false;

				hCaptchaToken = null;
				(window as any).hcaptcha?.reset(captchaWidgetId);

				if (result.status === 'ok') {
					submitSuccess = true;
					handleReset();
				} else {
					submitError = 'contact.form.errors.submitFailed';
				}
			}
		});

	function fieldClass(field: keyof ContactFormData): string {
		const hasError = $errors[field] && $touched[field];
		return `w-full rounded border p-3 text-base transition-all focus:ring-2 focus:outline-none ${
			hasError
				? 'border-red-400 focus:border-red-400 focus:ring-red-200'
				: 'border-gray-300 focus:border-primary focus:ring-primary/20'
		}`;
	}

	const submitDisabled = $derived(
		loading ||
			!hCaptchaToken ||
			Object.values($errors).some((fieldError) => fieldError !== '') ||
			Object.values($touched).some((fieldTouched) => !fieldTouched)
	);
</script>

<div>
	<h3 class="mb-6 border-b border-gray-300 pb-2 text-2xl font-semibold text-gray-900">
		{$translate('contact.form.subtitle')}
	</h3>

	<form id="orderForm" class="space-y-5" onsubmit={(e) => handleSubmit(e)} novalidate>
		<div>
			<label for="name" class="mb-2 block text-sm font-semibold text-gray-600"
				>{$translate('contact.form.name')}</label
			>
			<input
				type="text"
				id="name"
				name="name"
				bind:value={$form.name}
				onchange={(e) => handleChange(e)}
				onblur={(e) => handleChange(e)}
				class={fieldClass('name')}
			/>
			{#if $errors.name && $touched.name}
				<p class="mt-1 text-xs text-red-500">{$translate($errors.name)}</p>
			{/if}
		</div>

		<div>
			<label for="email" class="mb-2 block text-sm font-semibold text-gray-600"
				>{$translate('contact.form.email')}</label
			>
			<input
				type="email"
				id="email"
				name="email"
				bind:value={$form.email}
				onchange={(e) => handleChange(e)}
				onblur={(e) => handleChange(e)}
				class={fieldClass('email')}
			/>
			{#if $errors.email && $touched.email}
				<p class="mt-1 text-xs text-red-500">{$translate($errors.email)}</p>
			{/if}
		</div>

		<div>
			<label for="phone" class="mb-2 block text-sm font-semibold text-gray-600"
				>{$translate('contact.form.phone')}</label
			>
			<input
				type="tel"
				id="phone"
				name="phone"
				bind:value={$form.phone}
				onchange={(e) => handleChange(e)}
				onblur={(e) => handleChange(e)}
				class={fieldClass('phone')}
			/>
			{#if $errors.phone && $touched.phone}
				<p class="mt-1 text-xs text-red-500">{$translate($errors.phone)}</p>
			{/if}
		</div>

		<div>
			<label for="service" class="mb-2 block text-sm font-semibold text-gray-600"
				>{$translate('contact.form.service')}</label
			>
			<select
				id="service"
				name="service"
				bind:value={$form.service}
				onchange={(e) => handleChange(e)}
				onblur={(e) => handleChange(e)}
				class={fieldClass('service')}
			>
				<option value="" disabled>{$translate('contact.form.selectService')}</option>
				{#each CONTACT_FORM_SERVICES as service, i (i)}
					<option value={service}>{$translate(`contact.form.services.${service}`)}</option>
				{/each}
			</select>
			{#if $errors.service && $touched.service}
				<p class="mt-1 text-xs text-red-500">{$translate($errors.service)}</p>
			{/if}
		</div>

		<div>
			<label for="details" class="mb-2 block text-sm font-semibold text-gray-600"
				>{$translate('contact.form.details')}</label
			>
			<textarea
				id="details"
				name="details"
				rows="5"
				bind:value={$form.details}
				onchange={(e) => handleChange(e)}
				onblur={(e) => handleChange(e)}
				placeholder={$translate('contact.form.detailsPlaceholder')}
				class={fieldClass('details')}
			></textarea>
			{#if $errors.details && $touched.details}
				<p class="mt-1 text-xs text-red-500">{$translate($errors.details)}</p>
			{/if}
		</div>

		<div class="flex justify-center">
			<div bind:this={captchaEl}></div>
		</div>

		<button
			disabled={submitDisabled}
			type="submit"
			class={submitDisabled
				? 'mt-10 w-full cursor-not-allowed rounded border-2 border-gray-300 bg-gray-300 px-6 py-3 font-semibold text-gray-500 transition-all'
				: 'mt-10 w-full rounded border-2 border-primary bg-primary px-6 py-3 font-semibold text-white transition-all hover:cursor-pointer hover:border-rose hover:bg-rose hover:shadow-lg'}
		>
			{#if loading}
				<span
					class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
				></span>
			{/if}
			{$translate('contact.form.submit')}
		</button>

		{#if submitError}
			<p class="mt-3 text-center text-sm text-red-500">
				<i class="fas fa-circle-exclamation mr-1"></i>{$translate(submitError)}
			</p>
		{/if}

		{#if submitSuccess}
			<p class="mt-3 text-center text-sm text-green-600">
				<i class="fas fa-circle-check mr-1"></i>{$translate('contact.form.submitSuccess')}
			</p>
		{/if}
	</form>
</div>
