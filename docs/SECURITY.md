# Security

- Zod validation on every external payload.
- Backend authorization on every ride/offer/payment action.
- PostgreSQL RLS enabled for direct Supabase access.
- Service role is backend-only.
- Payment webhook is idempotent and verifies amount/order before marking paid.
- Strict ride state machine prevents illegal transitions.
- Rate limits apply to auth, ride creation, offers and webhooks.
- Secrets are never logged or bundled.
