//__EMETH_THEMES needs to hook into global so that
const themes     = window.__EMETH_THEMES || (window.__EMETH_THEMES = []);
let themeMap     = {};
const EMPTY_FUNC = () => {
};
/**
 * Adds a theme to the list of themes, returns a function that will remove said
 * theme
 *
 * @param diffTheme
 */
export default function (diffTheme) {
    if (diffTheme == null) {
        return EMPTY_FUNC;
    }
    themes.unshift(diffTheme);
    themeMap = {};
    return () => {
        const idx = themes.indexOf(diffTheme);
        if (idx > -1) {
            themes.splice(idx, 1);
            themeMap = {};
        }
    }
}

/**
 * Looks in the props for both ThemeClassName
 * and ClassName of the corresponding list of names.
 *
 * @param props
 * @param names
 * @returns {string}
 */
export const settings   = {
    debug : process.env.NODE_ENV != 'PRODUCTION',
    //list of classes to ignore warnings for.
    ignore: [],
    warn(...args) {
        if (this.debug) {
            console.warn(...args);
        }
    }
};
/**
 * Takes a class you want to style
 * @param Clazz
 * @returns {function(...[*])}
 */
export const themeClass = (Clazz) => {
    const displayName = Clazz.displayName || Clazz;
    if (!displayName) {
        settings.warn(`no display name for themed class %s`, Clazz);
    }

    return (...names) => {
        const cacheKey = `${displayName}/${names.join('.')}`;
        const inCache  = cacheKey in themeMap;
        if (inCache) {
            return themeMap[cacheKey];
        }
        const notfound    = [];
        const ret         = [];
        const themeLength = themes.length;
        for (let i = 0, r = 0, l = names.length; i < l; i++) {
            const name = names[i];
            if (name == null || name === false || name === true || String(name).trim() === '') {
                continue;
            }
            let found = false;
            for (let t = 0; t < themeLength; t++) {
                const current = themes[t][displayName];
                if (current && current[name]) {
                    ret[r++] = current[name];
                    found    = true;
                }
            }
            //if no matching classes are found pass it through.
            if (!found) {
                if (settings.ignore.indexOf(name) == -1) {
                    notfound[notfound.length] = name;
                }
                ret[r++] = name;
            }
        }
        if (notfound.length) {
            settings.warn(`could not find a className for '%s' for '%s' `,
                displayName, notfound.join(', '));
            //don't cache misses.
            return ret.join(' ');
        }

        return (themeMap[cacheKey] = ret.join(' '));

    };
};
