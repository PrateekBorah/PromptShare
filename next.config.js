/** @type {import ('next') .NextConfig} */
const nextConfig = {
    experimental:{
        appoir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            },
        ],
    },
    webpack(config) {
        config.experiments = {
            ... config. experiments,
            topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig;
