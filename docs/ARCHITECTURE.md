# Architecture

Mobile is an untrusted client. All business state transitions, authorization, fare/payment validation and driver selection execute in the API. Supabase PostgreSQL is the persistent store and Realtime is used for ride events/location fanout only after authorization checks.

## Performance
Maps use a provider abstraction. Images use Expo Image with caching. API responses are compact, indexed and paginated. Driver location writes are throttled by movement/time and old location data is retained only as configured.

## Auth
Google OAuth is performed by the backend. The mobile app receives a short-lived access token plus refresh token through a secure redirect/deep-link flow. Tokens are stored in SecureStore.
