/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "s.gravatar.com",
            "pbs.twimg.com",
            "apis.live.net",
            "res.cloudinary.com"
        ],
        unoptimized: true,
    },
};

export default nextConfig;
