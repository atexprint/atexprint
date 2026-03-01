<script lang="ts">
	import { translate } from '$i18n';
</script>

<section id="instagram" class="my-20 scroll-mt-30">
	<div class="container mx-auto max-w-6xl px-4">
		<h2 class="mb-8 text-center text-4xl font-bold text-primary">
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
