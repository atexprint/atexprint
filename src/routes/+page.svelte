<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';
	import { translate, currentLocale } from '$i18n';
	import Header from '$lib/Header/Header.svelte';
	import { PORTFOLIO_ITEMS, SERVICES, STATS } from './model';
	import { runAnimations, updateSuffixes } from './stats-animation-functions';

	let animationStarted = false;

	onMount(() => {
		const handleScroll = () => {
			const statsSection = document.getElementById('about');
			if (!statsSection || animationStarted) return;

			const sectionTop = statsSection.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			if (sectionTop < windowHeight * 0.75) {
				runAnimations();
				animationStarted = true;
			}
		};

		const unsubscribeLocale = currentLocale.subscribe(() => {
			if (animationStarted) {
				updateSuffixes();
			}
		});

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			unsubscribeLocale();
		};
	});
</script>

<svelte:head>
	<title>
		{$translate('meta.general.title')}
	</title>
	<meta name="description" content={$translate('meta.general.description')} />
</svelte:head>

<!-- Header -->
<Header />

<!-- Hero Section -->
<section class="overflow-hidde relative py-34">
	<video
		autoplay
		muted
		loop
		playsinline
		class="absolute top-0 left-[50%] z-0 h-full w-full max-w-7xl translate-x-[-50%] object-cover"
	>
		<source src={asset('/video/hero-video.m3u8')} type="application/vnd.apple.mpegurl" />
		{$translate('Your browser does not support HTML5 video.')}
	</video>

	<div class="relative z-10 container mx-auto max-w-7xl px-4 text-center">
		<h1 class="mb-5 text-6xl font-bold text-white uppercase">
			{$translate('hero.title')}
		</h1>
		<p class="mb-10 text-2xl text-white">
			{$translate('hero.subtitle')}
		</p>
		<a
			href="#contact"
			class="inline-block rounded border-2 border-[#2f57a3] bg-[#2f57a3] px-6 py-3 font-semibold text-white transition-all hover:border-rose hover:bg-rose hover:shadow-lg"
			>{$translate('hero.cta')}</a
		>
		<div class="mx-auto my-6 w-fit gap-2 rounded bg-rose px-6 py-3 font-semibold text-white">
			<p class="mb-2 font-bold">{$translate('hero.callUs')}</p>
			<p>
				<a href="tel:+48 508 227 647">+48 508 227 647</a>
			</p>
			<p>
				<a href="tel:+48 794 093 963">+48 794 093 963</a>
			</p>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="my-20 bg-white text-center">
	<div class="container mx-auto max-w-7xl px-4">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<div
				class="rounded-lg bg-gray-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
			>
				<i class="fas fa-rocket mb-5 text-5xl text-[#2f57a3]"></i>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">
					{$translate('features.fastDelivery.title')}
				</h3>
				<p class="text-sm text-gray-600">{$translate('features.fastDelivery.description')}</p>
			</div>
			<div
				class="rounded-lg bg-gray-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
			>
				<i class="fas fa-palette mb-5 text-5xl text-[#2f57a3]"></i>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">
					{$translate('features.customDesign.title')}
				</h3>
				<p class="text-sm text-gray-600">
					{$translate('features.customDesign.description')}
				</p>
			</div>
			<div
				class="rounded-lg bg-gray-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
			>
				<i class="fas fa-shield-alt mb-5 text-5xl text-[#2f57a3]"></i>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">
					{$translate('features.qualityGuarantee.title')}
				</h3>
				<p class="text-sm text-gray-600">{$translate('features.qualityGuarantee.description')}</p>
			</div>
			<div
				class="rounded-lg bg-gray-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
			>
				<i class="fas fa-headset mb-5 text-5xl text-[#2f57a3]"></i>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">
					{$translate('features.expertSupport.title')}
				</h3>
				<p class="text-sm text-gray-600">{$translate('features.expertSupport.description')}</p>
			</div>
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="my-20 scroll-mt-30 bg-white">
	<div class="container mx-auto max-w-7xl px-4">
		<h2 class="mb-12 text-center text-4xl font-bold text-[#2f57a3]">{$translate('about.title')}</h2>
		<div class="flex flex-col items-center gap-12 lg:flex-row">
			<div class="flex-2 text-lg leading-relaxed">
				<p class="mb-4">
					{@html $translate('about.text1')}
				</p>
				<p class="mb-4">
					{$translate('about.text2')}
				</p>
				<a
					href="#services"
					class="mt-12 inline-block rounded border-2 border-[#2f57a3] bg-transparent px-6 py-3 font-semibold text-[#2f57a3] transition-all hover:border-rose hover:bg-rose hover:text-white"
					>{$translate('about.cta')}</a
				>
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

<!-- Services Section -->
<section id="services" class="my-20 scroll-mt-30 bg-gray-50">
	<div class="container mx-auto max-w-7xl px-4">
		<h2 class="mb-12 pt-6 text-center text-4xl font-bold text-[#2f57a3]">
			{$translate('services.title')}
		</h2>
		<div class="grid grid-cols-1 gap-8 pb-6 md:grid-cols-2 lg:grid-cols-3">
			{#each SERVICES as { translationKeyPrefix }, i (i)}
				<button
					class="min-h-[200px] rounded-lg border-t-4 border-[#2f57a3] bg-white p-8 shadow-md transition-all hover:-translate-y-1 hover:cursor-pointer hover:border-rose hover:shadow-lg"
				>
					<h3 class="mb-4 text-2xl font-semibold text-[#2f57a3] transition-colors hover:text-rose">
						{$translate(`${translationKeyPrefix}.title`)}
					</h3>
					<p class="text-gray-600">{$translate(`${translationKeyPrefix}.description`)}</p>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Portfolio Section -->
<section id="portfolio" class="my-20 scroll-mt-30">
	<div class="container mx-auto max-w-6xl px-4">
		<h2 class="mb-16 text-center text-4xl font-bold text-[#2f57a3]">
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

<!-- Instagram Section -->
<section id="instagram" class="my-20 scroll-mt-30">
	<div class="container mx-auto max-w-6xl px-4">
		<h2 class="mb-8 text-center text-4xl font-bold text-[#2f57a3]">
			{$translate('instagram.title')}
		</h2>
		<div
			class="mx-auto mb-10 flex min-h-[400px] max-w-[900px] items-center justify-center border border-gray-300 bg-gray-50 text-gray-600"
		>
			<script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script>
			<iframe
				src="//lightwidget.com/widgets/b9ff3a69b47c55b889b4e8c95fbe49c1.html"
				scrolling="no"
				allowtransparency={true}
				class="w-full overflow-hidden border-0"
				title="Instagram Feed"
			></iframe>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="my-20 scroll-mt-30 bg-white">
	<div class="container mx-auto max-w-7xl px-4">
		<h2 class="mb-12 text-center text-4xl font-bold text-[#2f57a3]">
			{$translate('contact.title')}
		</h2>
		<div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-[2fr_1fr]">
			<!-- Form -->
			<div>
				<h3 class="mb-6 border-b border-gray-300 pb-2 text-2xl font-semibold text-gray-900">
					{$translate('contact.form.subtitle')}
				</h3>
				<form id="orderForm" class="space-y-5">
					<div>
						<label for="name" class="mb-2 block text-sm font-semibold text-gray-600"
							>{$translate('contact.form.name')}</label
						>
						<input
							type="text"
							id="name"
							name="name"
							required
							class="w-full rounded border border-gray-300 p-3 text-base transition-all focus:border-[#2f57a3] focus:ring-2 focus:ring-[#2f57a3]/20 focus:outline-none"
						/>
					</div>
					<div>
						<label for="email" class="mb-2 block text-sm font-semibold text-gray-600"
							>{$translate('contact.form.email')}</label
						>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="w-full rounded border border-gray-300 p-3 text-base transition-all focus:border-[#2f57a3] focus:ring-2 focus:ring-[#2f57a3]/20 focus:outline-none"
						/>
					</div>
					<div>
						<label for="phone" class="mb-2 block text-sm font-semibold text-gray-600"
							>{$translate('contact.form.phone')}</label
						>
						<input
							type="tel"
							id="phone"
							name="phone"
							class="w-full rounded border border-gray-300 p-3 text-base transition-all focus:border-[#2f57a3] focus:ring-2 focus:ring-[#2f57a3]/20 focus:outline-none"
						/>
					</div>
					<div>
						<label for="service" class="mb-2 block text-sm font-semibold text-gray-600"
							>{$translate('contact.form.service')}</label
						>
						<select
							id="service"
							name="service"
							required
							class="w-full rounded border border-gray-300 p-3 text-base transition-all focus:border-[#2f57a3] focus:ring-2 focus:ring-[#2f57a3]/20 focus:outline-none"
						>
							<option value="">{$translate('contact.form.selectService')}</option>
							<option value="sublimacja">{$translate('contact.form.services.sublimation')}</option>
							<option value="dyf">{$translate('contact.form.services.diffusion')}</option>
							<option value="sitodruk">{$translate('contact.form.services.screenPrinting')}</option>
							<option value="metki">{$translate('contact.form.services.logoTags')}</option>
							<option value="opakowania">{$translate('contact.form.services.packaging')}</option>
							<option value="other">{$translate('contact.form.services.other')}</option>
						</select>
					</div>
					<div>
						<label for="details" class="mb-2 block text-sm font-semibold text-gray-600"
							>{$translate('contact.form.details')}</label
						>
						<textarea
							id="details"
							name="details"
							rows="5"
							required
							placeholder={$translate('contact.form.detailsPlaceholder')}
							class="w-full resize-y rounded border border-gray-300 p-3 text-base transition-all focus:border-[#2f57a3] focus:ring-2 focus:ring-[#2f57a3]/20 focus:outline-none"
						></textarea>
					</div>
					<button
						type="submit"
						class="mt-10 w-full rounded border-2 border-[#2f57a3] bg-[#2f57a3] px-6 py-3 font-semibold text-white transition-all hover:cursor-pointer hover:border-rose hover:bg-rose hover:shadow-lg"
						>{$translate('contact.form.submit')}</button
					>
				</form>
			</div>

			<!-- Contact Info -->
			<div class="pt-14">
				<h3 class="mb-8 text-2xl font-semibold text-gray-900">
					{$translate('contact.info.title')}
				</h3>
				<div class="mb-6 flex items-center">
					<i class="fas fa-map-marker-alt mr-4 min-w-[25px] text-center text-2xl text-[#2f57a3]"
					></i>
					<p class="leading-snug text-gray-900">
						<a href="https://maps.app.goo.gl/cJSKQwAEf1MpERJQA" target="_blank">
							Poddębina 16, Tuszyn 95-080
						</a>
					</p>
				</div>
				<div class="mb-6 flex items-center">
					<i class="fas fa-phone mr-4 min-w-[25px] text-center text-2xl text-[#2f57a3]"></i>
					<p class="leading-snug text-gray-900">
						<a href="tel:+48 508 227 647"> +48 508 227 647 </a> /
						<a href="tel:+48 794 093 963">+48 794 093 963</a>
					</p>
				</div>
				<div class="mb-6 flex items-center">
					<i class="fas fa-envelope mr-4 min-w-[25px] text-center text-2xl text-[#2f57a3]"></i>
					<p class="leading-snug text-gray-900">
						<a href="mailto:atex@atexprint.pl"> atex@atexprint.pl </a>
					</p>
				</div>

				<div class="mt-10 border-t border-gray-300 pt-5">
					<h4 class="mb-4 text-lg font-semibold text-gray-900">
						{$translate('contact.connect.title')}
					</h4>
					<div class="flex gap-5">
						<a
							href="https://www.instagram.com/drukarnia_tkanindzianin_atex/"
							target="_blank"
							aria-label="Instagram"
							class="text-3xl text-gray-600 transition-colors hover:text-[#2f57a3]"
						>
							<i class="fab fa-instagram"></i>
						</a>
						<a
							href="https://www.facebook.com/profile.php?id=61560891526409&locale=pl_PL"
							target="_blank"
							aria-label="Facebook"
							class="text-3xl text-gray-600 transition-colors hover:text-[#2f57a3]"
						>
							<i class="fab fa-facebook-f"></i>
						</a>
						<a
							href="https://wa.me/48508227647"
							target="_blank"
							aria-label="WhatsApp"
							class="text-3xl text-gray-600 transition-colors hover:text-[#2f57a3]"
						>
							<i class="fab fa-whatsapp"></i>
						</a>
					</div>
				</div>

				<div class="mt-5 overflow-hidden rounded-lg shadow-md">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.2046242835545!2d19.506222476905045!3d51.61946070251043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471a31de2dd38925%3A0xe72941f92c06df22!2sATEX-%20DRUKARNIA%20TKANIN%20-TUSZYN!5e0!3m2!1spl!2spl!4v1762519836535!5m2!1spl!2spl"
						width="600"
						height="300"
						style="border:0;"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="ATEX Location"
						class="block h-[300px] w-full"
					></iframe>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Info Links Section -->
<section class="bg-gray-900 py-16 text-gray-100">
	<div class="container mx-auto max-w-7xl px-4">
		<div class="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr]">
			<div>
				<img src={asset('/logo.svg')} alt="ATEX Logo" class="mb-4 w-16" />
				<p class="mb-5">
					{$translate('footer.about')}
				</p>
				<div class="flex gap-4">
					<a
						href="https://www.instagram.com/drukarnia_tkanindzianin_atex"
						target="_blank"
						aria-label="Instagram"
						class="text-2xl text-gray-100 transition-colors hover:text-[#2f57a3]"
					>
						<i class="fab fa-instagram"></i>
					</a>
					<a
						href="https://www.facebook.com/profile.php?id=61561196823303"
						target="_blank"
						aria-label="Facebook"
						class="text-2xl text-gray-100 transition-colors hover:text-[#2f57a3]"
					>
						<i class="fab fa-facebook-f"></i>
					</a>
					<a
						href="https://wa.me/+48508227647"
						target="_blank"
						aria-label="WhatsApp"
						class="text-2xl text-gray-100 transition-colors hover:text-[#2f57a3]"
					>
						<i class="fab fa-whatsapp"></i>
					</a>
				</div>
			</div>
			<div>
				<h4 class="mb-5 text-lg font-semibold text-white uppercase">
					{$translate('footer.information.title')}
				</h4>
				<ul class="space-y-2">
					<li>
						<a
							href="#"
							class="text-gray-100 opacity-90 transition-all hover:text-[#2f57a3] hover:opacity-100"
							>{$translate('footer.information.privacy')}</a
						>
					</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-5 text-lg font-semibold text-white uppercase">
					{$translate('footer.quickLinks.title')}
				</h4>
				<ul class="space-y-2">
					<li>
						<a
							href="#about"
							class="text-gray-100 opacity-90 transition-all hover:text-[#2f57a3] hover:opacity-100"
							>{$translate('footer.quickLinks.about')}</a
						>
					</li>
					<li>
						<a
							href="#services"
							class="text-gray-100 opacity-90 transition-all hover:text-[#2f57a3] hover:opacity-100"
							>{$translate('footer.quickLinks.services')}</a
						>
					</li>
					<li>
						<a
							href="#portfolio"
							class="text-gray-100 opacity-90 transition-all hover:text-[#2f57a3] hover:opacity-100"
							>{$translate('footer.quickLinks.portfolio')}</a
						>
					</li>
					<li>
						<a
							href="#contact"
							class="text-gray-100 opacity-90 transition-all hover:text-[#2f57a3] hover:opacity-100"
							>{$translate('footer.quickLinks.contact')}</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="border-t border-white/20 bg-gray-900 py-5 text-gray-100">
	<div class="container mx-auto max-w-7xl px-4">
		<div class="flex flex-wrap items-center justify-between">
			<div>
				<p class="my-1 text-sm">{$translate('footer.copyright')}</p>
			</div>
		</div>
	</div>
</footer>
