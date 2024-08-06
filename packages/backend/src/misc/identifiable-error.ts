/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type * as TypeValidator from './uuid-validator.js';

/**
 * ID付きエラー
 */
export class IdentifiableError<const S extends string> extends Error {
	public message: string;
	public id: S;

	constructor(id: S & TypeValidator.UUIDv4.Assert<S>, message?: string) {
		super(message);
		this.message = message ?? '';
		this.id = id;
	}
}
