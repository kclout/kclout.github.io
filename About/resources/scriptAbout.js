const aboutPicElem = {
    aboutPicTools: document.querySelectorAll('.toolbar i'),
    aboutPicPalette: document.querySelector('.palette-content'),
}

let paletteChange = () => {
    queryCheck();

    if(settingsElem.nightElem.nightToggle.checked) {
        if(queryCheck() === 1) {
            aboutPicElem.aboutPicPalette.style.background = 'repeating-linear-gradient(to right, rgb(40, 40, 40), rgb(40, 40, 40) 5px, transparent 1px, transparent 35px), repeating-linear-gradient(to bottom, rgb(40, 40, 40), rgb(40, 40, 40) 5px, transparent 1px, transparent 35px),  linear-gradient(to right, rgb(176, 197, 172), rgb(185, 215, 234), rgb(223, 202, 239))';
        }
        else if(queryCheck() === 2) {
            aboutPicElem.aboutPicPalette.style.background = 'repeating-linear-gradient(to right, rgb(40, 40, 40), rgb(40, 40, 40) 5px, transparent 1px, transparent clamp(20px, 2.5vw, 30px)), repeating-linear-gradient(to bottom, rgb(40, 40, 40), rgb(40, 40, 40) 5px, transparent 1px, transparent clamp(20px, 2.5vw, 30px)), linear-gradient(to right, rgb(176, 197, 172), rgb(185, 215, 234), rgb(223, 202, 239))';
        }
        else {
            aboutPicElem.aboutPicPalette.style.background = 'repeating-linear-gradient(to right, rgb(40, 40, 40), rgb(40, 40, 40) 5px, transparent 1px, transparent 35px), repeating-linear-gradient(to bottom, rgb(40, 40, 40), rgb(40, 40, 40) 5px, transparent 1px, transparent 35px),  linear-gradient(to right, rgb(176, 197, 172), rgb(185, 215, 234), rgb(223, 202, 239))';
        }
    }
    else {
        if(queryCheck() === 1) {
            aboutPicElem.aboutPicPalette.style.background = 'repeating-linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255) 5px, transparent 1px, transparent 35px), repeating-linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255) 5px, transparent 1px, transparent 35px),  linear-gradient(to right, rgb(176, 197, 172), rgb(185, 215, 234), rgb(223, 202, 239))';
        }
        else if(queryCheck() === 2) {
            aboutPicElem.aboutPicPalette.style.background = 'repeating-linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255) 5px, transparent 1px, transparent clamp(20px, 2.5vw, 30px)), repeating-linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255) 5px, transparent 1px, transparent clamp(20px, 2.5vw, 30px)), linear-gradient(to right, rgb(176, 197, 172), rgb(185, 215, 234), rgb(223, 202, 239))';
        }
        else {
            aboutPicElem.aboutPicPalette.style.background = 'repeating-linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255) 5px, transparent 1px, transparent 35px), repeating-linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255) 5px, transparent 1px, transparent 35px),  linear-gradient(to right, rgb(176, 197, 172), rgb(185, 215, 234), rgb(223, 202, 239))';
        }
    }
}

let applyNightModeAbout = () => {
    if(settingsElem.nightElem.nightToggle.checked) {
        aboutPicElem.aboutPicPalette.transition = '0.4s';
        aboutPicElem.aboutPicTools.forEach((tool) => {
            tool.style.backgroundColor = 'rgb(40, 40, 40)';
            tool.style.color = 'rgb(223, 202, 239)';
            tool.style.transition = '0.4s';
        });
        paletteChange();
    }
    else {
        aboutPicElem.aboutPicPalette.style.background = getComputedStyle(aboutPicElem.aboutPicPalette).background.replace(/rgb\(40,\s*40,\s*40\)/g, 'rgb(255, 255, 255)');
        aboutPicElem.aboutPicTools.forEach((tool) => {
            tool.style.backgroundColor = '';
            tool.style.color = '';
        });
        paletteChange();
    }
}

settings.settingSaveLoad('nightModeState', settingsElem.nightElem.nightToggle, applyNightModeAbout).loadToggleSetting().saveToggleSetting();
query.mobile.addEventListener('change', paletteChange);
query.desktopSmall.addEventListener('change', paletteChange);
query.desktop.addEventListener('change', paletteChange);