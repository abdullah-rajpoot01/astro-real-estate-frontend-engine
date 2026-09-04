export const buttonsOptions = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link"
] as const

export const themeConfig = [
    {
        label: "Default",
        value: "default",
        file: "default.css",
    },
    {
        label: "Amber Mono",
        value: "amber-mono",
        file: "amber-mono.css",
    },
    {
        label: "Whatsapp Like",
        value: "whatsapp",
        file: "whatsapp.css",
    },

    {
        label: "Blue Vitron",
        value: "blue-vitron",
        file: "blue-vitron.css",
    },
] as const