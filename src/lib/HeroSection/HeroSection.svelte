<script lang="ts">
	import { asset } from '$app/paths';
	import { translate } from '$i18n';
</script>

<section class="overflow-hidde relative py-34">
	<video
		autoplay
		muted
		loop
		playsinline
		class="absolute top-0 left-[50%] z-0 h-full w-full max-w-7xl translate-x-[-50%] object-cover"
		preload="none"
		poster={asset('/media/hero/hero-video-poster.jpeg')}
	>
		<source src={asset('/media/hero/hero-video.mp4')} type="video/mp4" />
		{$translate('general.html5VideoUnsupported')}
	</video>

	<div class="relative z-10 container mx-auto max-w-7xl px-4 text-center">
		<h1 class="mb-5 text-3xl font-bold text-white uppercase sm:text-4xl md:text-5xl lg:text-6xl">
			{$translate('hero.title')}
		</h1>
		<p class="mb-10 text-lg text-white sm:text-xl md:text-2xl">
			{$translate('hero.subtitle')}
		</p>
		<a
			href="#contact"
			class="inline-block rounded border-2 border-primary bg-primary px-6 py-3 font-semibold text-white transition-all hover:border-rose hover:bg-rose hover:shadow-lg"
			>{$translate('hero.cta')}</a
		>
		<div class="mx-auto my-6 w-fit gap-2 rounded bg-rose px-6 py-3 font-semibold text-white">
			<p class="mb-2 font-bold">{$translate('hero.callUs')}</p>
			<p>
				<a href="tel:+48508227647">+48 508 227 647</a>
			</p>
			<p>
				<a href="tel:+48794093963">+48 794 093 963</a>
			</p>
		</div>
	</div>
</section>
