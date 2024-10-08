const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '500px',
    tablet: '558px',
    laptop: '1024px',
    laptopL: '1340px', 
    desktop: '1560px',
    desktopL: '2560px',
}


export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktopL})`
};