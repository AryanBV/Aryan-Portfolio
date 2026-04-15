import type { ZodType } from "zod";

export type SafeFetchResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: "timeout" | "network" | "http" | "schema";
      status?: number;
      detail?: string;
    };

// Parameters<typeof fetch>[1] inherits Next.js' augmented RequestInit
// (which adds next.revalidate, next.tags) so callers can still pass
// Next-specific options without a type error.
export type SafeFetchInit = Parameters<typeof fetch>[1] & {
  timeoutMs?: number;
};

export async function safeFetch<T>(
  url: string,
  schema: ZodType<T>,
  init?: SafeFetchInit,
): Promise<SafeFetchResult<T>> {
  const { timeoutMs = 8000, signal: externalSignal, ...rest } = init ?? {};
  const timeoutController = new AbortController();
  const timer = setTimeout(() => timeoutController.abort(), timeoutMs);
  const signal = externalSignal
    ? AbortSignal.any([externalSignal, timeoutController.signal])
    : timeoutController.signal;
  try {
    const res = await fetch(url, { ...rest, signal });
    if (!res.ok) return { ok: false, error: "http", status: res.status };
    const raw: unknown = await res.json();
    const parsed = schema.safeParse(raw);
    if (!parsed.success)
      return { ok: false, error: "schema", detail: parsed.error.message };
    return { ok: true, data: parsed.data };
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") {
      return timeoutController.signal.aborted
        ? { ok: false, error: "timeout" }
        : { ok: false, error: "network", detail: "aborted" };
    }
    return { ok: false, error: "network", detail: String(e) };
  } finally {
    clearTimeout(timer);
  }
}
