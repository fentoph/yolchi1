# Deployment
Deploy apps/api and apps/admin as separate Vercel projects from the same repository. yolchi.vercel.app points to the API/landing deployment. Set production secrets in Vercel Environment Variables. Mobile uses Expo EAS and receives only the public API URL. Server credentials never enter the app bundle.
