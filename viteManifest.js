export const manifestForPlugin = {
    registerType: 'prompt',
    divOptions: {
        enabled: true,
    },
    manifest: {
        name: 'Memory Game',
        short_name: 'MemoryGame',
        description: 'Una app de juego de memoria didáctico para niños',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                porpuse: 'any',
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                porpuse: 'maskable',
            },
        ],
        theme_color: '#134E4A',
        background_color: '#84CC16',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        prefer_related_applications: false,
    },
    workbox: {
        globPatterns: ['./assets/**/*.*'],
        maximumFileSizeToCacheInBytes: 10000000
    }
}
