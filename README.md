# YO‘LDAMAN

YO‘LDAMAN — yo‘lovchi va haydovchini birlashtiradigan safar platformasi.

## Structure
- apps/mobile — React Native + TypeScript + Expo Router
- apps/api — Next.js server-side API
- apps/admin — Next.js admin
- packages/types — shared contracts
- packages/validation — shared Zod validation
- supabase/migrations — PostgreSQL schema/RLS

## Security
Google authentication is handled by the backend OAuth flow; Supabase service-role credentials never enter mobile. Payment credentials are server-only. Ride transitions are enforced server-side.

## Setup
See docs/ARCHITECTURE.md and docs/DEPLOYMENT.md.

<!-- Deployment synced with the new Supabase project. -->
