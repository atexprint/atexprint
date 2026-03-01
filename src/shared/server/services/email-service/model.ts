import type { CONTACT_FORM_SERVICES } from "$lib/ContactSection/ContactForm/model";

export type ContactRequestArgs = {
	email: string;
	nameAndSurname: string;
	tel: string;
	message: string;
	serviceKey: (typeof CONTACT_FORM_SERVICES)[number];
};
