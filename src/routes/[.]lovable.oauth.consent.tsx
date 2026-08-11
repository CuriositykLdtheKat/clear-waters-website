import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type OAuthAuthorizationDetails = {
  client?: { name?: string; client_id?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
  redirect_uri?: string;
};

type OAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: OAuthAuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: OAuthAuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: OAuthAuthorizationDetails | null; error: { message: string } | null }>;
};

function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s['authorization_id'] === "string" ? s['authorization_id'] : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) throw redirect({ to: "/auth", search: { next } });
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="font-display text-3xl">Authorization problem</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Could not load this authorization request: {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "this app";
  const scopes = (details?.scope ?? "").split(" ").filter(Boolean);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error: err } = approve
      ? await oauthApi().approveAuthorization(authorization_id)
      : await oauthApi().denyAuthorization(authorization_id);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-display text-3xl">
        Connect {clientName} to Clear Waters Bookkeeping
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {clientName} will be able to call this site's enabled tools while you are signed in.
      </p>
      {details?.redirect_uri ? (
        <p className="mt-3 break-all text-xs text-muted-foreground">
          Redirects to: {details.redirect_uri}
        </p>
      ) : null}
      {scopes.length > 0 ? (
        <ul className="mt-6 space-y-2 text-sm">
          {scopes.map((scope) => (
            <li key={scope}>
              {scope === "email"
                ? "Share your email address"
                : scope === "profile" || scope === "openid"
                  ? "Share your basic profile"
                  : `Additional permission requested: ${scope}`}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-6 text-xs text-muted-foreground">
        This does not bypass this site's permissions or backend policies.
      </p>
      {error ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <div className="mt-8 flex gap-3">
        <button
          disabled={busy}
          onClick={() => decide(true)}
          className="flex-1 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          Approve
        </button>
        <button
          disabled={busy}
          onClick={() => decide(false)}
          className="flex-1 rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted disabled:opacity-60"
        >
          Cancel connection
        </button>
      </div>
    </main>
  );
}