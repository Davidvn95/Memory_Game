export const manifestForPlugin = {
    registerType: "prompt",
    divOptions: {
        enabled: true,
    },
    manifest: {
        name: 'Memory Game',
        short_name: 'MemoryGame',
        description: 'Una app de juego de memoria dedáctico para niños',
        "icons": [
            {
                "src": './src/assets/images/maskable_icon_x512.png',
                "sizes": '144x144',
                "type": 'image/png',
                "purpose": 'any',
            },
            {
                "src": './src/assets/images/maskable_icon_x512.png',
                "sizes": '512x512',
                "type": 'image/png',
                "purpose": 'maskable',
            },
            {
                "src": './src/assets/images/maskable_icon.png',
                "sizes": '1280x1280',
                "type": 'image/png',
                "purpose": 'maskable',
            },
        ],
        theme_color: '#ffffff',
        background_color: '#84CC16',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        prefer_related_applications: false,
    },
}