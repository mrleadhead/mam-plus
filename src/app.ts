/// <reference path="style.ts" />

/**
 * BREAKING CHANGES INTRODUCED WHILE CODING
 * FIXME: Search result ID changed on site, but not reflected in old build code.
 * All styling is done via stylesheet. Use `.mp_dark` & `.mp_light` as needed.
 * FIXME: Stylesheet hardcoded to v4 branch; change to main when needed
 * Settings are now named `simplyLikeThis`
 * Fused hide banner/home settings. Now uses a dropdown. 'hideHome'
 * Browse/Search page is being updated and might have new DOM pointers/lazyload
 * default user gift now uses dropdown.
 */

// FIXME: this should be set in the settings
GM_setValue('mp_debug', true);

/**
 * Userscript namespace
 * @constant CHANGELOG: Object containing a list of changes and known bugs
 * @constant TIMESTAMP: Placeholder hook for the current build time
 * @constant VERSION: The current userscript version
 * @constant PREV_VER: The last installed userscript version
 * @var errorLog: The target array for logging errors
 * @var pagePath: The current page URL without the site address
 */
namespace MP {
    export const DEBUG: boolean | undefined = (GM_getValue('mp_debug')) ? true : false;
    export const CHANGELOG:object = {
        UPDATE_LIST: [
            'CODE: Moved from Coffeescript to Typescript to allow for better practices and easier contribution. This likely introduced bugs.',
            'CODE: Script starts before the page loads and uses a CSS sheet to hopefully prevent flashing content. This likely introduced bugs. ',
        ] as string[],
        BUG_LIST: [
            //
        ] as string[],
    };
    export const TIMESTAMP:string = '##meta_timestamp##';
    export const VERSION:string = GM_info.script.version;
    export const PREV_VER:string = GM_getValue('mp_version');
    export let errorLog:string[] = [];
    export let pagePath:string = window.location.pathname;
    export let mpCss:Style = new Style();

    export const run = () => {
        console.group(`Welcome to MAM+ v${VERSION}!`);

        // Add a simple cookie to announce the script is being used
        document.cookie = 'mp_enabled=1;domain=myanonamouse.net;path=/';

        /**
         * AFTER PAGE LOAD
         * For anything that requires the DOM
         */

        window.addEventListener('load', () => {
            // Add custom CSS sheet
            // When the page loads, get the current site theme
            mpCss.injectLink();
            Check.elemLoad('head link[href*="ICGstation"]')
            .then( () => { mpCss.alignToSiteTheme(); } );
        });

        console.groupEnd();
    };
}

// Start the userscript
MP.run();
