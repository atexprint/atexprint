<script lang="ts">
	import { translate } from '$i18n';
	import {
		ContactSection,
		ServicesSection,
		AboutSection,
		InfoLinksSection,
		Header,
		HeroSection,
		FeaturesSection,
		PortfolioSection,
		InstagramSection,
		Footer
	} from '$lib';
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
<HeroSection />

<!-- Features Section -->
<FeaturesSection />

<!-- About Section -->
<AboutSection />

<!-- Services Section -->
<ServicesSection />

<!-- Portfolio Section -->
<PortfolioSection />

<!-- Instagram Section -->
<InstagramSection />

<!-- Contact Section -->
<ContactSection />

<!-- Info Links Section -->
<InfoLinksSection />

<!-- Footer -->
<Footer />
