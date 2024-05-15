/** @type {import('next').NextConfig} */
const nextConfig = {
    // must write all eternal domanis for get the images outside from localhost
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'images.pexels.com'
            }
        ]
    }
}

module.exports = nextConfig
