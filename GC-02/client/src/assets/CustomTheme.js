import { createTheme } from "flowbite-react";

export const CarouselTheme = createTheme({
    "root": {
        "base": "relative h-full w-full",
        "leftControl": "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
        "rightControl": "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
    },
    "indicators": {
        "active": {
            "off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
            "on": "bg-white dark:bg-gray-800"
        },
        "base": "h-3 w-3 rounded-full",
        "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
    },
    "item": {
        "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
        "wrapper": {
            "off": "w-full shrink-0 transform cursor-default snap-center",
            "on": "w-full shrink-0 transform cursor-grab snap-center"
        }
    },
    "control": {
        "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70",
        "icon": "h-5 w-5 text-white sm:h-6 sm:w-6 dark:text-gray-800"
    },
    "scrollContainer": {
        "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-none",
        "snap": "snap-x"
    }
})

export const CardTheme = createTheme({
    "root": {
        "base": "flex rounded-none border-0 border-gray-200 bg-white shadow-none dark:border-gray-700 dark:bg-white",
        "children": "flex h-fit flex-col justify-center gap-3 px-0 py-3",
        "horizontal": {
            "off": "flex-col",
            "on": "flex-col md:max-w-xl md:flex-row"
        },
        "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
    },
    "img": {
        "base": "",
        "horizontal": {
            "off": "rounded-t-lg",
            "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        }
    }
})

export const NavbarTheme = createTheme({
    "root": {
        "base": "bg-white px-2 py-2.5 sm:px-4 dark:border-gray-700 dark:bg-gray-800",
        "rounded": {
            "on": "rounded",
            "off": ""
        },
        "bordered": {
            "on": "border",
            "off": ""
        },
        "inner": {
            "base": "mx-auto flex flex-wrap items-center justify-between",
            "fluid": {
                "on": "",
                "off": "container"
            }
        }
    },
    "brand": {
        "base": "flex items-center"
    },
    "collapse": {
        "base": "w-full md:block md:w-auto",
        "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
        "hidden": {
            "on": "hidden",
            "off": ""
        }
    },
    "link": {
        "base": "block py-2 pl-3 pr-4 md:p-0",
        "active": {
            "on": "bg-primary-700 text-white md:bg-transparent md:text-primary-700 dark:text-white",
            "off": "border-b border-gray-100 text-gray-700 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent md:dark:hover:text-dark"
        },
        "disabled": {
            "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
            "off": ""
        }
    },
    "toggle": {
        "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
        "icon": "h-6 w-6 shrink-0",
        "title": "sr-only"
    }
})