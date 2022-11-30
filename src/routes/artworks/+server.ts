import invariant from "tiny-invariant";
import type { RequestHandler } from "./$types";
import { INFERENCE_URL, INFERENCE_AUTH } from "$env/static/private";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const { query } = await request.json();
  invariant(typeof query === "string", `query expected, got: ${query}`);

  const response = await fetch(INFERENCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INFERENCE_AUTH}`,
    },
    body: JSON.stringify({ inputs: query }),
  });

  const artworkUrls: string[] = await response.json();

  return json(
    {
      query,
      artworkUrls,
    },
  )
}