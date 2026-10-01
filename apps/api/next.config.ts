import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ["@yolchi/types", "@yolchi/validation"],
};

export default nextConfig;
