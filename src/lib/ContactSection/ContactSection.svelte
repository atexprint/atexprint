<script lang="ts">
	import { translate } from '$i18n';
	import ContactForm from './ContactForm/ContactForm.svelte';
</script>

<section id="contact" class="my-20 scroll-mt-30 bg-white">
	<div class="container mx-auto max-w-7xl px-4">
		<h2 class="mb-12 text-center text-4xl font-bold text-primary">
			{$translate('contact.title')}
		</h2>
		<div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-[2fr_1fr]">
			<!-- Form -->
			<ContactForm />

			<!-- Contact Info -->
			<div class="pt-14">
				<h3 class="mb-8 text-2xl font-semibold text-gray-900">
					{$translate('contact.info.title')}
				</h3>
				<div class="mb-6 flex items-center">
					<i class="fas fa-map-marker-alt mr-4 min-w-[25px] text-center text-2xl text-primary"></i>
					<p class="leading-snug text-gray-900">
						<a href="https://maps.app.goo.gl/cJSKQwAEf1MpERJQA" target="_blank">
							Poddębina 16, Tuszyn 95-080
						</a>
					</p>
				</div>
				<div class="mb-6 flex items-center">
					<i class="fas fa-phone mr-4 min-w-[25px] text-center text-2xl text-primary"></i>
					<p class="leading-snug text-gray-900">
						<a href="tel:+48508227647"> +48 508 227 647 </a> /
						<a href="tel:+48794093963"> +48 794 093 963 </a>
					</p>
				</div>
				<div class="mb-6 flex items-center">
					<i class="fas fa-envelope mr-4 min-w-[25px] text-center text-2xl text-primary"></i>
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
							class="text-3xl text-gray-600 transition-colors hover:text-primary"
						>
							<i class="fab fa-instagram"></i>
						</a>
						<a
							href="https://www.facebook.com/profile.php?id=61560891526409&locale=pl_PL"
							target="_blank"
							aria-label="Facebook"
							class="text-3xl text-gray-600 transition-colors hover:text-primary"
						>
							<i class="fab fa-facebook-f"></i>
						</a>
						<a
							href="https://wa.me/48508227647"
							target="_blank"
							aria-label="WhatsApp"
							class="text-3xl text-gray-600 transition-colors hover:text-primary"
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
