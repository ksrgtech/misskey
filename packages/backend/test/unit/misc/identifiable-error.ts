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
			const invalidVariant0: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-0123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariant1: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-1123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariant2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-2123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariant3: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-3123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariant5: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-5123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariant6: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-6123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariant7: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-7123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariant8: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-8123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariant9: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-9123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantA: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-a123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantB: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-b123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantC: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-c123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantD: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-d123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantE: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-e123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantF: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-f123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantA2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-A123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantB2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-B123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantC2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-C123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantD2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-D123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantE2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-E123-5678-1234567890ab">> = errorIsExpected;
			const invalidVariantF2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-F123-5678-1234567890ab">> = errorIsExpected;
		}
		// #endregion

		// #region positive type test
		{
			{
				const v = "12345678-abcd-4123-5678-1234567890ab";
				const a: UUIDv4.Assert<typeof v> = v;
				const i = new IdentifiableError<typeof a>(a);
				console.assert(i.id == a);
			}
		}
		// #endregion
	})
});
