import { createClient } from "@supabase/supabase-js";
import { WordleInfo } from "./WordleMatch";

const SUPABASE_URL: string = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY: string = process.env.SUPABASE_KEY ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// WARN: rls must b OFF for this to work, and there ain't no way that's ok for business

export async function insert(info: WordleInfo): Promise<void> {
	// NOTE: async = function may voluntarily pause execution using await
	// NOTE: await = wait for supabase to finish before continue

	const { data, error } = await supabase
		.from("wordle_values") // Select store table
		.insert(info); // Insert row into table;

	/* The resulting table entry would look like this
	 * [  id   | date  | wordle_number | tries | grid  ]
	 */

	if (error) {
		console.error(`Error inserting row: ${error.message}`);
	} else {
		console.log(`Inserted successfully! Data: ${data}`);
	}
}
