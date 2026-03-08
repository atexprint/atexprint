<script lang="ts">
	import { asset } from '$app/paths';
	import { translate } from '$i18n';
</script>

<section class="bg-gray-900 py-16 text-gray-100">
	<div class="container mx-auto max-w-7xl px-4">
		<div class="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr]">
			<div>
				<img src={asset('/logo.svg')} alt="ATEX Logo" class="mb-4 w-16" loading="lazy" />
				<p class="mb-5">
					{$translate('footer.about')}
				</p>
				<div class="flex gap-4">
					<a
						href="https://www.instagram.com/drukarnia_tkanindzianin_atex"
						target="_blank"
						aria-label="Instagram"
						class="text-2xl text-gray-100 transition-colors hover:text-primary"
					>
						<i class="fab fa-instagram"></i>
					</a>
					<a
						href="https://www.facebook.com/profile.php?id=61561196823303"
						target="_blank"
						aria-label="Facebook"
						class="text-2xl text-gray-100 transition-colors hover:text-primary"
					>
						<i class="fab fa-facebook-f"></i>
					</a>
					<a
						href="https://wa.me/+48508227647"
						target="_blank"
						aria-label="WhatsApp"
						class="text-2xl text-gray-100 transition-colors hover:text-primary"
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
						<!-- TODO: need privacy policy pdf or seperate site for that -->
						<a
							href="#"
							class="text-gray-100 opacity-90 transition-all hover:text-primary hover:opacity-100"
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
							class="text-gray-100 opacity-90 transition-all hover:text-primary hover:opacity-100"
							>{$translate('footer.quickLinks.about')}</a
						>
					</li>
					<li>
						<a
							href="#services"
							class="text-gray-100 opacity-90 transition-all hover:text-primary hover:opacity-100"
							>{$translate('footer.quickLinks.services')}</a
						>
					</li>
					<li>
						<a
							href="#portfolio"
							class="text-gray-100 opacity-90 transition-all hover:text-primary hover:opacity-100"
							>{$translate('footer.quickLinks.portfolio')}</a
						>
					</li>
					<li>
						<a
							href="#contact"
							class="text-gray-100 opacity-90 transition-all hover:text-primary hover:opacity-100"
							>{$translate('footer.quickLinks.contact')}</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
