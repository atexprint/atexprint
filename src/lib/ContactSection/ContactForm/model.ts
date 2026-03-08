import * as yup from 'yup';

export const CONTACT_FORM_SERVICES = [
	'sublimation',
	'dtfPrint',
	'screenPrinting',
	'logoTags',
	'eventAndMarketingClothing',
	'other'
] as const;

export type ContactFormService = (typeof CONTACT_FORM_SERVICES)[number];

export interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	service: ContactFormService;
	details: string;
}

export const CONTACT_FORM_INITIAL_VALUE: ContactFormData = {
	name: '',
	email: '',
	phone: '',
	service: '' as ContactFormData['service'],
	details: ''
};

export const CONTACT_FORM_SCHEMA: yup.ObjectSchema<ContactFormData> = yup.object({
	name: yup
		.string()
		.min(2, 'contact.form.errors.nameTooShort')
		.max(100, 'contact.form.errors.nameTooLong')
		.required('contact.form.errors.required'),
	email: yup
		.string()
		.email('contact.form.errors.emailInvalid')
		.max(254, 'contact.form.errors.emailTooLong')
		.required('contact.form.errors.required'),
	phone: yup
		.string()
		.max(20, 'contact.form.errors.phoneTooLong')
		.matches(/^\+?[\d\s\-().]{7,20}$/, 'contact.form.errors.phoneInvalid')
		.required('contact.form.error.required'),
	service: yup
		.string()
		.oneOf(CONTACT_FORM_SERVICES, 'contact.form.errors.required')
		.required('contact.form.errors.required') as yup.Schema<ContactFormService>,
	details: yup
		.string()
		.min(2, 'contact.form.errors.detailsTooShort')
		.max(2000, 'contact.form.errors.detailsTooLong')
		.required('contact.form.errors.required')
});
