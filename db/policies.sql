-- Row Level Security (RLS) policies for the VolleyStats tables.
--
-- The public portfolio reads these tables with the Supabase publishable (anon)
-- key only, so every table that feeds the stats dashboard needs a SELECT policy
-- that grants anonymous read access. Visibility of child rows (points,
-- set_results) is inherited from the parent `games` row: if the caller can read
-- the game, they can read its points and set results. This keeps all access
-- logic centralised on `games` and avoids duplicating team/visibility checks.
--
-- Run this in the Supabase SQL Editor against the hosted project. It is
-- idempotent-friendly: each policy is dropped before being (re)created.

-- ── games ──────────────────────────────────────────────────────────────────
-- NOTE: The SELECT policy for `games` is assumed to already exist (it governs
-- which games are visible to the anon role). The child policies below rely on
-- it. If it is missing, create the appropriate SELECT policy for `games` first.

-- ── points ─────────────────────────────────────────────────────────────────
alter table public.points enable row level security;

drop policy if exists "points readable when parent game is readable" on public.points;

create policy "points readable when parent game is readable"
on public.points
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.games g
    where g.id = points.game_id
  )
);

-- ── set_results ────────────────────────────────────────────────────────────
alter table public.set_results enable row level security;

drop policy if exists "set_results readable when parent game is readable" on public.set_results;

create policy "set_results readable when parent game is readable"
on public.set_results
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.games g
    where g.id = set_results.game_id
  )
);
