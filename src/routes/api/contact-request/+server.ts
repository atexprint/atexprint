import 'reflect-metadata';

import { buildErrorResponse, buildOkResponse } from '$shared/server/functions/build-response';
import { validateRequest } from '$shared/server/functions/validate-body';
import { EmailService } from '$shared/server/services/email-service/email-service';
import type { RequestEvent } from './$types';
import { HttpStatus } from '$shared/global/enums/http-status';
import { ContactFormDataRequest } from './model';

export async function POST({ request, route }: RequestEvent) {
	const body = await request.json();

	const result = await validateRequest(body, ContactFormDataRequest);
	if (result.type === 'error') return result.response;

	const { name, email, phone, service, details, locale } = result.dto;

	try {
		const emailService = new EmailService(email, locale);

		await emailService.contactRequest({
			nameAndSurname: name,
			email,
			tel: phone ?? '---',
			message: details,
			serviceKey: service
		});
	} catch (error) {
		console.error(error);

		return buildErrorResponse(route, request, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	return buildOkResponse();
}
