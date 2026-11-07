# Architecture

How the Food Delivery frontend is shaped, where the Server/Client boundary sits, and
what data moves between layers. Vocabulary comes from [`GLOSSARY.md`](../GLOSSARY.md);
decisions with trade-offs are recorded in [`docs/adr/`](./adr/).

## Repository layout

```
.
├── apps/
│   ├── web/                 ← standalone pnpm package (own lockfile)
│   │   ├── src/app/         ← App Router routes
│   │   ├── src/components/  ← Header, Footer, shadcn/ui primitives
│   │   ├── src/data/        ← typed mock catalogue (Restaurants, MenuItems)
│   │   └── src/lib/         ← cart store, schemas, helpers
│   └── api/                 ← placeholder until Buổi 4
├── docs/
├── docker-compose.yml       ← Postgres 17, grounding for Buổi 4
└── scripts/                 ← course grader
```

`apps/web` is deliberately standalone rather than a workspace member: the course CI
runs `pnpm -C apps/web install --frozen-lockfile`, so the lockfile must live inside the
app. There is no root `package.json`.

## Layers

```
┌──────────────────────────────────────────────────────┐
│  Route (Server Component by default)                  │
│  Home · Restaurant · Checkout                         │
└───────────────┬──────────────────────────────────────┘
                │ imports
┌───────────────▼──────────────┐   ┌───────────────────┐
│  Data module (mock)          │   │  Client store     │
│  Restaurants · MenuItems     │   │  Cart (Zustand +  │
│  typed, no fetching yet      │   │  persist)         │
└──────────────────────────────┘   └─────────┬─────────┘
                                             │ read by
                                   ┌─────────▼─────────┐
                                   │ Client islands    │
                                   │ Add-to-cart       │
                                   │ Badge · Drawer    │
                                   │ Checkout form     │
                                   └───────────────────┘
```

## Server vs Client boundary

Server Components are the default. A component becomes a Client Component only when it
needs one of: event handlers, browser APIs, or React state.

| Component | Boundary | Why |
| --- | --- | --- |
| Header / Footer | Server | static markup and links |
| Home page | Server | renders the catalogue, no interaction |
| Restaurant page | Server | resolves a Restaurant and lists MenuItems |
| Add-to-cart control | Client | click handler, calls the store |
| Cart badge | Client | subscribes to the store |
| Cart drawer | Client | open/close state, quantity controls |
| Toast host | Client | Sonner provider |
| Checkout form | Client | React Hook Form state |

The rule of thumb: push `"use client"` as far down the tree as possible, so one small
leaf becomes interactive instead of the whole page.

## Data flow

1. **Browse** — the Home route imports the data module at build time and renders
   Restaurant cards. No network call.
2. **View** — the Restaurant route resolves the id against the same module. An unknown
   id calls the not-found boundary.
3. **Add** — a client leaf calls `add(MenuItem)`. The store increments the matching
   CartItem or creates one, and fires a toast.
4. **Persist** — the store serialises the Cart to LocalStorage. On reload, the persisted
   state hydrates before the badge renders, so the count doesn't flash from zero.
5. **Order** — the checkout form POSTs the delivery details and CartItems to the order
   Route Handler, which revalidates the payload with the shared Zod schema and returns
   an Order code. The Cart is cleared on success.

In Buổi 4, step 1 and 2 swap the data module for a fetch to the API; the route shapes
and component contracts stay the same.

## Data model

Field names are chosen to match the Buổi 4 backend schema so the swap is mechanical.

**Restaurant**: `id`, `name`, `imageUrl`, `description`

**MenuItem**: `id`, `restaurantId`, `name`, `price`, `imageUrl`, `description`

**CartItem**: `menuItem` (a MenuItem), `quantity`

**Order** (submitted to the mock endpoint): `customerName`, `phone`, `address`, `note`,
`items` (CartItems), plus a server-generated `id` and `code`

Prices are integers in Vietnamese dong (VND). The UI formats them with a thousands
separator; no decimals are involved.

## State ownership

| State | Owner | Lifetime |
| --- | --- | --- |
| Catalogue (Restaurants, MenuItems) | data module | build-time constant |
| Cart | Zustand store + LocalStorage | until the Order succeeds |
| Form input | React Hook Form | until submit |
| Submitted Order | Route Handler response | shown once on the confirmation view |
