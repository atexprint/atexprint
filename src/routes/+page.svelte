<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';
	import { translate } from '$i18n';
	import LanguageSelect from '$lib/LanguageSelect/LanguageSelect.svelte';

	let animationStarted = false;

	const services = [
		{
			titleKey: 'services.sublimation.title',
			descriptionKey: 'services.sublimation.description',
			video: 'media/sublimation.mp4',
			textKey: 'services.sublimation.text',
			listKey: 'services.sublimation.list'
		},
		{
			titleKey: 'services.diffusion.title',
			descriptionKey: 'services.diffusion.description',
			video: 'media/diffusion.mp4',
			textKey: 'services.diffusion.text',
			listKey: 'services.diffusion.list'
		},
		{
			titleKey: 'services.screenPrinting.title',
			descriptionKey: 'services.screenPrinting.description',
			video: 'media/screen-printing.mp4',
			textKey: 'services.screenPrinting.text',
			listKey: 'services.screenPrinting.list'
		},
		{
			titleKey: 'services.logoTags.title',
			descriptionKey: 'services.logoTags.description',
			video: 'media/logo-tags.mp4',
			textKey: 'services.logoTags.text',
			listKey: 'services.logoTags.list'
		},
		{
			titleKey: 'services.packaging.title',
			descriptionKey: 'services.packaging.description',
			video: 'media/packaging.mp4',
			textKey: 'services.packaging.text',
			listKey: 'services.packaging.list'
		}
	];

	const portfolioItems = [
		{
			image: asset('/img/IMG_0004[1].jpg'),
			titleKey: 'portfolio.items.customTShirts',
			serviceKey: 'portfolio.items.screenPrinting'
		},
		{
			image: asset('/img/IMG_1338.jpg'),
			titleKey: 'portfolio.items.scarfPrinting',
			serviceKey: 'portfolio.items.diffusionPrinting'
		},
		{
			image: asset('/img/IMG_1489[1].jpg'),
			titleKey: 'portfolio.items.luxuryPackaging',
			serviceKey: 'portfolio.items.cardboardPackaging'
		},
		{
			image: asset('/img/IMG_1615[1].jpg'),
			titleKey: 'portfolio.items.brandedMugs',
			serviceKey: 'portfolio.items.sublimation'
		},
		{
			image: asset('/img/IMG_1666[1].jpg'),
			titleKey: 'portfolio.items.elegantLogoTags',
			serviceKey: 'portfolio.items.logoTags'
		},
		{
			image: asset('/img/IMG_1752[1].jpg'),
			titleKey: 'portfolio.items.specialtyItems',
			serviceKey: 'portfolio.items.screenPrintingSpecial'
		}
	];

	function animateNumber(element: HTMLElement, target: number, isPercentage: boolean) {
		const duration = 2000;
		let startTime: number | null = null;

		// Make the element visible
		element.style.opacity = '1';

		const formatValue = (value: number) => {
			if (isPercentage) {
				return value + '%';
			}
			return '+' + value;
		};

		const step = (currentTime: number) => {
			if (!startTime) startTime = currentTime;
			const progress = Math.min((currentTime - startTime) / duration, 1);
			const value = Math.floor(progress * target);

			element.textContent = formatValue(value);

			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				element.textContent = formatValue(target);
			}
		};

		requestAnimationFrame(step);
	}

	onMount(() => {
		const handleScroll = () => {
			const statsSection = document.getElementById('about');
			if (!statsSection || animationStarted) return;

			const sectionTop = statsSection.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			if (sectionTop < windowHeight * 0.75) {
				const animatedNumbers = document.querySelectorAll('.animated-number');
				animatedNumbers.forEach((num) => {
					const target = parseInt(num.getAttribute('data-target') || '0');
					const isPercentage = num.nextElementSibling?.textContent?.includes('%') || false;
					animateNumber(num as HTMLElement, target, isPercentage);
				});
				animationStarted = true;
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<!-- Header -->
<header class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
	<div class="container mx-auto max-w-7xl px-4">
		<div class="flex items-center justify-between py-4">
			<a href="/" class="h-9">
				<img src={asset('/android-chrome-512x512.png')} alt="ATEX logo" class="h-full w-auto" />
			</a>
			<nav class="flex items-center gap-6">
				<a href="#about" class="font-medium text-gray-600 transition-colors hover:text-primary"
					>{$translate('nav.aboutUs')}</a
				>
				<a href="#services" class="font-medium text-gray-600 transition-colors hover:text-primary"
					>{$translate('nav.services')}</a
				>
				<a href="#portfolio" class="font-medium text-gray-600 transition-colors hover:text-primary"
					>{$translate('nav.portfolio')}</a
				>
				<a
					href="#instagram-feed"
					class="font-medium text-gray-600 transition-colors hover:text-primary"
					>{$translate('nav.instagram')}</a
				>
				<a href="#contact" class="font-medium text-gray-600 transition-colors hover:text-primary"
					>{$translate('nav.contact')}</a
				>
				<div class="ml-2">
					<LanguageSelect />
				</div>
			</nav>
		</div>
	</div>
</header>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gray-100 py-36">
	<video
		autoplay
		muted
		loop
		playsinline
		class="absolute top-0 left-0 z-0 h-full w-full object-cover"
	>
		<source src={asset('/video/WhatsApp Video 2025-11-07 at 19.54.17.mp4')} type="video/mp4" />
		Your browser does not support HTML5 video.
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
			class="inline-block rounded border-2 border-[#2f57a3] bg-[#2f57a3] px-6 py-3 font-semibold text-white transition-all hover:border-[#e02161] hover:bg-[#e02161] hover:shadow-lg"
			>{$translate('hero.cta')}</a
		>
	</div>
</section>

<!-- Features Section -->
<section class="bg-white py-48 text-center">
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
<section id="about" class="border-b border-gray-200 bg-white py-44">
	<div class="container mx-auto max-w-7xl px-4">
		<h2 class="mb-12 text-center text-4xl font-bold text-[#2f57a3]">{$translate('about.title')}</h2>
		<div class="flex flex-col items-start gap-12 lg:flex-row">
			<div class="flex-2 text-lg leading-relaxed">
				<p class="mb-4">
					{@html $translate('about.text1')}
				</p>
				<p class="mb-4">
					{$translate('about.text2')}
				</p>
				<a
					href="#services"
					class="mt-12 inline-block rounded border-2 border-[#2f57a3] bg-transparent px-6 py-3 font-semibold text-[#2f57a3] transition-all hover:border-[#e02161] hover:bg-[#e02161] hover:text-white"
					>{$translate('about.cta')}</a
				>
			</div>
			<div class="flex min-w-[250px] flex-1 flex-col gap-8 rounded bg-gray-50 p-10">
				<div class="text-center">
					<span
						class="animated-number block text-5xl leading-none font-bold text-rose opacity-0"
						data-target="12">0</span
					>
					<p class="mt-1 text-xs tracking-wider text-gray-600 uppercase">
						{$translate('about.stats.yearsOfExperience')}
					</p>
				</div>
				<div class="text-center">
					<span
						class="animated-number block text-5xl leading-none font-bold text-rose opacity-0"
						data-target="500">0</span
					>
					<p class="mt-1 text-xs tracking-wider text-gray-600 uppercase">
						{$translate('about.stats.successfulProjects')}
					</p>
				</div>
				<div class="text-center">
					<span
						class="animated-number block text-5xl leading-none font-bold text-rose opacity-0"
						data-target="98">0</span
					>
					<p class="mt-1 text-xs tracking-wider text-gray-600 uppercase">
						{$translate('about.stats.satisfiedClients')}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Services Section -->
<section id="services" class="bg-gray-50 py-44">
	<div class="container mx-auto max-w-7xl px-4">
		<h2 class="mb-12 text-center text-4xl font-bold text-[#2f57a3]">Our Services</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service}
				<div
					class="min-h-[200px] cursor-pointer rounded-lg border-t-4 border-[#2f57a3] bg-white p-8 shadow-md transition-all hover:-translate-y-1 hover:border-[#e02161] hover:shadow-lg"
					role="button"
					tabindex="0"
				>
					<h3 class="mb-4 text-2xl font-semibold text-[#2f57a3] transition-colors hover:text-rose">
						{$translate(service.titleKey)}
					</h3>
					<p class="text-gray-600">{$translate(service.descriptionKey)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Portfolio Section -->
<section id="portfolio" class="py-44">
	<div class="container mx-auto max-w-6xl px-4">
		<h2 class="mb-16 text-center text-4xl font-bold text-[#2f57a3]">
			{$translate('portfolio.title')}
		</h2>
		<div class="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each portfolioItems as item}
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
<section id="instagram" class="py-44">
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
		<a
			href="https://www.instagram.com/atex_print_mm/"
			target="_blank"
			rel="noopener noreferrer"
			class="mt-5 inline-block rounded border-2 border-[#2f57a3] bg-transparent px-6 py-3 font-semibold text-[#2f57a3] transition-all hover:border-rose hover:bg-rose hover:text-white"
			>{$translate('instagram.cta')}</a
		>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="bg-white py-20">
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
						class="mt-10 w-full rounded border-2 border-[#2f57a3] bg-[#2f57a3] px-6 py-3 font-semibold text-white transition-all hover:border-rose hover:bg-rose hover:shadow-lg"
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
					<p class="leading-snug text-gray-900">Poddębina 16, Tuszyn 95-080</p>
				</div>
				<div class="mb-6 flex items-center">
					<i class="fas fa-phone mr-4 min-w-[25px] text-center text-2xl text-[#2f57a3]"></i>
					<p class="leading-snug text-gray-900">+48 508 227 647</p>
				</div>
				<div class="mb-6 flex items-center">
					<i class="fas fa-envelope mr-4 min-w-[25px] text-center text-2xl text-[#2f57a3]"></i>
					<p class="leading-snug text-gray-900">atex@atexprint.pl</p>
				</div>

				<div class="mt-10 border-t border-gray-300 pt-5">
					<h4 class="mb-4 text-lg font-semibold text-gray-900">Connect with us</h4>
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
				<img src={asset('/android-chrome-512x512.png')} alt="Print.Co Logo" class="mb-4 w-16" />
				<p class="mb-5">
					{$translate('footer.about')}
				</p>
				<div class="flex gap-4">
					<a
						href="#"
						aria-label="Instagram"
						class="text-2xl text-gray-100 transition-colors hover:text-[#2f57a3]"
					>
						<i class="fab fa-instagram"></i>
					</a>
					<a
						href="#"
						aria-label="Facebook"
						class="text-2xl text-gray-100 transition-colors hover:text-[#2f57a3]"
					>
						<i class="fab fa-facebook-f"></i>
					</a>
					<a
						href="#"
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
					<li>
						<a
							href="#"
							class="text-gray-100 opacity-90 transition-all hover:text-[#2f57a3] hover:opacity-100"
							>{$translate('footer.information.terms')}</a
						>
					</li>
					<li>
						<a
							href="#"
							class="text-gray-100 opacity-90 transition-all hover:text-[#2f57a3] hover:opacity-100"
							>{$translate('footer.information.delivery')}</a
						>
					</li>
					<li>
						<a
							href="#"
							class="text-gray-100 opacity-90 transition-all hover:text-[#2f57a3] hover:opacity-100"
							>{$translate('footer.information.returns')}</a
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
				<p class="text-xs opacity-70">{$translate('footer.wholesale')}</p>
			</div>
			<div class="flex items-center">
				<p class="mr-4 text-sm">{$translate('footer.payments')}</p>
				<div class="flex gap-2">
					<i class="fab fa-cc-visa text-3xl text-white opacity-90" aria-label="Visa"></i>
					<i class="fab fa-cc-paypal text-3xl text-white opacity-90" aria-label="PayPal"></i>
					<i class="fab fa-cc-mastercard text-3xl text-white opacity-90" aria-label="Mastercard"
					></i>
				</div>
			</div>
		</div>
	</div>
</footer>
