import { describe } from '@jest/globals';
import { UUIDv4 } from '@/misc/uuid-validator.js';
import { IdentifiableError } from '@/misc/identifiable-error.js';

describe('identifiable-error', () => {
	test('type check', () => {
		const errorIsExpected = Symbol();
		type ExpectAssertionError<A> = A extends object ? typeof errorIsExpected : never;
		// #region invalid UUID type test
		{
			const empty: ExpectAssertionError<UUIDv4.Assert<"">> = errorIsExpected;
			const tooFewComponents1: ExpectAssertionError<UUIDv4.Assert<"a">> = errorIsExpected;
			const tooFewComponents2: ExpectAssertionError<UUIDv4.Assert<"a-b">> = errorIsExpected;
			const tooFewComponents3: ExpectAssertionError<UUIDv4.Assert<"a-b-c">> = errorIsExpected;
			const tooFewComponents4: ExpectAssertionError<UUIDv4.Assert<"a-b-c-d">> = errorIsExpected;
			const excessComponents: ExpectAssertionError<UUIDv4.Assert<"a-b-c-d-e-f">> = errorIsExpected;
			const tooShortComponents: ExpectAssertionError<UUIDv4.Assert<"a-b-c-d-e">> = errorIsExpected;
			const tooLongComponents: ExpectAssertionError<UUIDv4.Assert<"aaaa-bbbbbbbb-4ccccccc-dddddddd-eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee">> = errorIsExpected;
			const invalidVariant0: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-05678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariant1: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-15678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariant2: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-25678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariant3: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-35678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariant5: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-55678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariant6: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-65678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariant7: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-75678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariant8: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-85678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariant9: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-95678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantA: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-a5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantB: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-b5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantC: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-c5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantD: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-d5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantE: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-e5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantF: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-f5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantA2: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-A5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantB2: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-B5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantC2: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-C5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantD2: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-D5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantE2: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-E5678902-41234567-1234567890ab">> = errorIsExpected;
			const invalidVariantF2: ExpectAssertionError<UUIDv4.Assert<"abcd-12345678-F5678902-41234567-1234567890ab">> = errorIsExpected;
		}
		// #endregion

		// #region positive type test
		{
			{
				const v = "abcd-12345678-45678902-41234567-1234567890ab";
				const a: UUIDv4.Assert<typeof v> = v;
				const i = new IdentifiableError<typeof a>(a);
				console.assert(i.id == a);
			}
		}
		// #endregion
	})
})