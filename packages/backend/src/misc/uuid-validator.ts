/*
 * SPDX-FileCopyrightText: 2024 ksrgtech
 * SPDX-License-Identifier: AGPL-3.0-only OR MIT
 */
declare namespace Counter {
	type Atom = [];
	type Sequence = Atom[];
	type Increase<S extends Sequence> = [...S, Atom];
	type Current<S extends Sequence> = S["length"];

	type Make<I extends number, C extends Sequence = []> = Current<C> extends I ? C : Make<I, Increase<C>>;
}

declare namespace FoldableString {
	type Chars<S extends string, Acc extends string[] = []> = string extends S ? never : S extends `${infer A}${infer B}` ? Chars<B, [...Acc, A]> : Acc

	type LengthS<S extends string, Acc extends Counter.Sequence = Counter.Make<0>> = string extends S
		? number
		: S extends `${infer A}${infer B}`
			? LengthS<B, Counter.Increase<Acc>>
			: Counter.Current<Acc>;
}

declare namespace Hex {
	const notHex: unique symbol;

	type HexChar = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" | "A" | "B" | "C" | "D" | "E" | "F";

	type Assert0<S extends string, Counter extends Counter.Sequence> = FoldableString.Chars<S>[Counter.Current<Counter>] extends HexChar
		? Counter.Current<Counter.Increase<Counter>> extends FoldableString.LengthS<S>
			? S
			: Assert0<S, Counter.Increase<Counter>>
		: AssertionError<`${S}[${Counter.Current<Counter>}] is not hex!`>;

	type Assert<S extends string> = Assert0<S, Counter.Make<0>>;

	type AssertionError<Message> = {[notHex]: Message}
}

export declare namespace UUIDv4 {
	const notUUID: unique symbol;

	type AssertHex<S extends string> = Hex.Assert<S>;
	type LengthS<S extends string> = FoldableString.LengthS<S>;

	export type Assert<S extends string> = string extends S
		// not a literal, skipping every assertion
		? S
		: S extends `${infer SA}-${infer SB}-${infer SC}-${infer SD}-${infer SE}`
			? SC extends `4${string}`
				? [LengthS<SA>, LengthS<SB>, LengthS<SC>, LengthS<SD>, LengthS<SE>] extends [4, 8, 8, 8, 12]
					? [AssertHex<SA>, AssertHex<SB>, AssertHex<SC>, AssertHex<SD>, AssertHex<SE>] extends [string, string, string, string, string]
						? S
						: AssertionError<[AssertHex<SA>, AssertHex<SB>, AssertHex<SC>, AssertHex<SD>, AssertHex<SE>]>
					: AssertionError<`component lengths are required to be [4, 8, 8, 8, 12], but are [${LengthS<SA>}, ${LengthS<SB>}, ${LengthS<SC>}, ${LengthS<SD>}, ${LengthS<SE>}]`>
				: AssertionError<`${SC} contains invalid variant`>
			: AssertionError<`${S} is not a hyphnated-UUIDv4`>

	type AssertionError<Message> = {[notUUID]: Message};
}
