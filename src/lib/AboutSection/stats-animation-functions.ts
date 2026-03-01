import { translate } from '$i18n';
import { get } from 'svelte/store';

export function getScale(target: number, useSuffix: boolean): { divisor: number; suffix: string } {
	if (!useSuffix) return { divisor: 1, suffix: '' };
	const t = get(translate);
	if (target >= 1_000_000_000) return { divisor: 1_000_000_000, suffix: t('numberSuffix.billion') };
	if (target >= 1_000_000) return { divisor: 1_000_000, suffix: t('numberSuffix.milion') };
	if (target >= 1_000) return { divisor: 1_000, suffix: t('numberSuffix.thousand') };
	return { divisor: 1, suffix: '' };
}

export function getFormatted(target: number, isPercentage: boolean, useSuffix: boolean): string {
	const { divisor, suffix } = getScale(target, useSuffix);
	const scaledTarget = target / divisor;
	if (isPercentage) return scaledTarget + '%';
	return '+' + scaledTarget + (useSuffix ? ' ' + suffix : '');
}

export function animateNumber(
	element: HTMLElement,
	target: number,
	isPercentage: boolean,
	useSuffix: boolean
) {
	const duration = 2000;
	let startTime: number | null = null;

	// Make the element visible
	element.style.opacity = '1';

	const { divisor, suffix } = getScale(target, useSuffix);
	const scaledTarget = target / divisor;

	function formatValue(value: number) {
		if (isPercentage) return value + '%';
		return '+' + value + (useSuffix ? ' ' + suffix : '');
	}

	function step(currentTime: number) {
		if (!startTime) startTime = currentTime;
		const progress = Math.min((currentTime - startTime) / duration, 1);
		const value = Math.floor(progress * scaledTarget);

		element.textContent = formatValue(value);

		if (progress < 1) {
			requestAnimationFrame(step);
		} else {
			element.textContent = formatValue(scaledTarget);
		}
	}

	requestAnimationFrame(step);
}

export function runAnimations() {
	const animatedNumbers = document.querySelectorAll('.animated-number');
	animatedNumbers.forEach((num) => {
		const target = parseInt(num.getAttribute('data-target') || '0');
		const useSuffix = num.getAttribute('data-use-suffix') === 'true' || false;
		const isPercentage = num.getAttribute('data-is-percentage') === 'true' || false;
		animateNumber(num as HTMLElement, target, isPercentage, useSuffix);
	});
}

export function updateSuffixes() {
	const animatedNumbers = document.querySelectorAll('.animated-number');
	animatedNumbers.forEach((num) => {
		const target = parseInt(num.getAttribute('data-target') || '0');
		const useSuffix = num.getAttribute('data-use-suffix') === 'true' || false;
		const isPercentage = num.getAttribute('data-is-percentage') === 'true' || false;
		(num as HTMLElement).textContent = getFormatted(target, isPercentage, useSuffix);
	});
}
