import { EMAIL_APP_PASSWORD, EMAIL_SENDER, EMAIL_SUBJECT_PREFIX } from '$env/static/private';
import { createTransport } from 'nodemailer';
import type { ContactRequestArgs } from './model';
import { htmlKeyValueReplacer } from '$shared/global/functions/html-key-value-replacer';
import { Locale, curriedTranslator } from '$i18n';

export class EmailService {
	private readonly _transport;

	constructor(
		private readonly _reciever: string,
		private readonly _locale: Locale,
		private readonly _cc?: string[]
	) {
		this._transport = createTransport({
			service: 'gmail',
			auth: {
				user: EMAIL_SENDER,
				pass: EMAIL_APP_PASSWORD
			}
		});
	}

	async contactRequest({ nameAndSurname, email, tel, message, serviceKey }: ContactRequestArgs) {
		const adminHtml = (await import('./email-templates/contact/contact-request-admin.html?raw'))
			.default;
		const userHtml = (await import('./email-templates/contact/contact-request-user.html?raw'))
			.default;

		const adminTranslate = curriedTranslator(Locale.plPL);
		const adminEmailTranslate = (key: string, vars = {}) => {
			return adminTranslate(`email.contactRequest.admin.${key}`, vars);
		};
		const adminServiceName = adminTranslate(`contact.form.services.${serviceKey}`);
		const adminSubject = adminEmailTranslate(`title`, { serviceName: adminServiceName });
		const adminEmailArgs: Record<string, string> = {
			nameAndSurname,
			email,
			tel,
			serviceName: adminServiceName,
			message,
			title: adminSubject,
			headerTitle: adminEmailTranslate(`header.title`),
			alertText: adminEmailTranslate(`alert.text`, { nameAndSurname }),
			detailsTitle: adminEmailTranslate(`details.title`),
			detailsNameAndSurname: adminEmailTranslate(`details.nameAndSurname`),
			detailsEmail: adminEmailTranslate(`details.email`),
			detailsTel: adminEmailTranslate(`details.tel`),
			detailsService: adminEmailTranslate(`details.service`),
			messageTitle: adminEmailTranslate(`message.title`),
			footerSystemNotice: adminEmailTranslate(`footer.systemNotice`)
		};

		const userTranslate = curriedTranslator(this._locale);
		const userEmailTranslate = (key: string, vars = {}) => {
			return userTranslate(`email.contactRequest.user.${key}`, vars);
		};
		const userServiceName = userTranslate(`contact.form.services.${serviceKey}`);
		const userSubject = userEmailTranslate(`title`, { serviceName: userServiceName });
		const userEmailArgs: Record<string, string> = {
			nameAndSurname,
			email,
			tel,
			serviceName: userServiceName,
			message,
			title: userSubject,
			heroTitle: userEmailTranslate('hero.title', { nameAndSurname }),
			heroDescription: userEmailTranslate('hero.description'),
			summaryTitle: userEmailTranslate('summary.title'),
			summaryNameAndSurname: userEmailTranslate('summary.nameAndSurname'),
			summaryEmail: userEmailTranslate('summary.email'),
			summaryTel: userEmailTranslate('summary.tel'),
			summaryService: userEmailTranslate('summary.service'),
			messageTitle: userEmailTranslate('message.title'),
			ctaText: userEmailTranslate('cta.text'),
			footerSystemNotice: userEmailTranslate(`footer.systemNotice`)
		};

		const adminReplacedHtml = htmlKeyValueReplacer(adminHtml, adminEmailArgs);
		const userReplacedHtml = htmlKeyValueReplacer(userHtml, userEmailArgs);

		await this._send(adminSubject, adminReplacedHtml, EMAIL_SENDER);
		await this._send(userSubject, userReplacedHtml, this._reciever);
	}

	private async _send(subject: string, html: string, to?: string) {
		await this._transport.sendMail({
			from: EMAIL_SENDER,
			to: to ?? this._reciever,
			cc: this._cc,
			subject: `${EMAIL_SUBJECT_PREFIX} ${subject}`,
			html
		});
	}
}
