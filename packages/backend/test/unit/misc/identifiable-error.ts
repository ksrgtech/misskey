import { describe } from '@jest/globals';
import type { UUIDv4 } from '@/misc/uuid-validator.js';
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

			const invalidVersion0: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-0123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersion1: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-1123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersion2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-2123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersion3: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-3123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersion5: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-5123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersion6: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-6123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersion7: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-7123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersion8: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-8123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersion9: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-9123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionA: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-a123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionB: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-b123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionC: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-c123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionD: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-d123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionE: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-e123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionF: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-f123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionA2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-A123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionB2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-B123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionC2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-C123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionD2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-D123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionE2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-E123-90ab-1234567890ab">> = errorIsExpected;
			const invalidVersionF2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-F123-90ab-1234567890ab">> = errorIsExpected;

			const invalidVariant0: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-00ab-1234567890ab">> = errorIsExpected;
			const invalidVariant1: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-10ab-1234567890ab">> = errorIsExpected;
			const invalidVariant2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-20ab-1234567890ab">> = errorIsExpected;
			const invalidVariant3: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-30ab-1234567890ab">> = errorIsExpected;
			const invalidVariant4: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-40ab-1234567890ab">> = errorIsExpected;
			const invalidVariant5: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-50ab-1234567890ab">> = errorIsExpected;
			const invalidVariant6: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-60ab-1234567890ab">> = errorIsExpected;
			const invalidVariant7: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-70ab-1234567890ab">> = errorIsExpected;
			const invalidVariantC: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-c0ab-1234567890ab">> = errorIsExpected;
			const invalidVariantD: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-d0ab-1234567890ab">> = errorIsExpected;
			const invalidVariantE: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-e0ab-1234567890ab">> = errorIsExpected;
			const invalidVariantF: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-f0ab-1234567890ab">> = errorIsExpected;
			const invalidVariantC2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-C0ab-1234567890ab">> = errorIsExpected;
			const invalidVariantD2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-D0ab-1234567890ab">> = errorIsExpected;
			const invalidVariantE2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-E0ab-1234567890ab">> = errorIsExpected;
			const invalidVariantF2: ExpectAssertionError<UUIDv4.Assert<"12345678-abcd-4123-F0ab-1234567890ab">> = errorIsExpected;
		}
		// #endregion

		// #region positive type test
		{
			{
				const v = "12345678-abcd-4123-890a-1234567890ab";
				const a: UUIDv4.Assert<typeof v> = v;
				const i = new IdentifiableError<typeof a>(a);
				console.assert(i.id == a);
			}
			{
				const v = "12345678-abcd-4123-990a-1234567890ab";
				const a: UUIDv4.Assert<typeof v> = v;
				const i = new IdentifiableError<typeof a>(a);
				console.assert(i.id == a);
			}
			{
				const v = "12345678-abcd-4123-a90a-1234567890ab";
				const a: UUIDv4.Assert<typeof v> = v;
				const i = new IdentifiableError<typeof a>(a);
				console.assert(i.id == a);
			}
			{
				const v = "12345678-abcd-4123-A90a-1234567890ab";
				const a: UUIDv4.Assert<typeof v> = v;
				const i = new IdentifiableError<typeof a>(a);
				console.assert(i.id == a);
			}
			{
				const v = "12345678-abcd-4123-b90a-1234567890ab";
				const a: UUIDv4.Assert<typeof v> = v;
				const i = new IdentifiableError<typeof a>(a);
				console.assert(i.id == a);
			}
			{
				const v = "12345678-abcd-4123-B90a-1234567890ab";
				const a: UUIDv4.Assert<typeof v> = v;
				const i = new IdentifiableError<typeof a>(a);
				console.assert(i.id == a);
			}
		}
		// #endregion
	})
});
