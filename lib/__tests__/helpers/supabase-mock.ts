import { vi } from "vitest";
import type { Profile } from "@/lib/types";

type QueryResult = { data?: unknown; error?: unknown };
type Operation = "select" | "insert" | "update" | "upsert" | "delete";

const CHAIN_METHODS = [
  "select",
  "insert",
  "update",
  "upsert",
  "delete",
  "eq",
  "order",
  "limit",
  "maybeSingle",
  "single",
] as const;

export interface QueryCall {
  table: string;
  operation: Operation;
  args: unknown[];
}

/**
 * Supabase query builder palsu.
 *
 * Semua method bersifat chainable dan objek builder bersifat thenable,
 * sehingga `await supabase.from(...).select(...).eq(...)` mengembalikan
 * hasil yang ditentukan oleh `resolver`.
 */
function createBuilder(
  table: string,
  resolver: (call: QueryCall) => QueryResult,
  calls: QueryCall[],
) {
  const call: QueryCall = { table, operation: "select", args: [] };

  const builder: Record<string, unknown> = {};
  for (const method of CHAIN_METHODS) {
    builder[method] = (...args: unknown[]) => {
      if (method !== "select" && method !== "eq" && method !== "order" && method !== "limit") {
        call.operation = method as Operation;
        call.args = args;
        calls.push({ ...call, args: [...args] });
      }
      return builder;
    };
  }

  builder.then = (
    onFulfilled: (value: QueryResult) => unknown,
    onRejected?: (reason: unknown) => unknown,
  ) => Promise.resolve(resolver(call)).then(onFulfilled, onRejected);

  return builder;
}

export function createSupabaseMock(
  resolver: (call: QueryCall) => QueryResult = () => ({ data: null, error: null }),
) {
  const calls: QueryCall[] = [];
  const client = {
    calls,
    from: vi.fn((table: string) => createBuilder(table, resolver, calls)),
    auth: {
      getUser: vi.fn<() => Promise<{ data: { user: { id: string } | null }; error: null }>>(
        async () => ({ data: { user: null }, error: null }),
      ),
    },
  };
  return client;
}

export const memberProfile: Profile = {
  id: "11111111-1111-1111-1111-111111111111",
  full_name: "Member Test",
  role: "member",
  skills: [],
};

export const adminProfile: Profile = {
  id: "22222222-2222-2222-2222-222222222222",
  full_name: "Admin Test",
  role: "admin",
  skills: [],
};

export function createFormData(values: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }
  return formData;
}
