import 'reflect-metadata';

import { validators } from '$shared/server/validators';
import { IsEnum, IsOptional } from 'class-validator';
import { CONTACT_FORM_SERVICES, type ContactFormData } from '$lib/ContactSection/ContactForm/model';
import { Locale } from '$i18n';

const { IsString, MinLength, MaxLength, IsEmail, IsIn } = validators;

export class ContactFormDataRequest implements ContactFormData {
	@IsString()
	@MinLength(2)
	@MaxLength(100)
	declare name: string;

	@IsEmail()
	@MaxLength(254)
	declare email: string;

	@IsOptional()
	@IsString()
	@MaxLength(20)
	declare phone?: string;

	@IsIn(CONTACT_FORM_SERVICES)
	declare service: (typeof CONTACT_FORM_SERVICES)[number];

	@IsString()
	@MinLength(2)
	@MaxLength(2000)
	declare details: string;

	@IsEnum(Locale)
	declare locale: Locale;
}
