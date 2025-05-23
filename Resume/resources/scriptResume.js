const resumeElem = {
    resumeMenuBar: document.querySelector('.resume.menu-bar'),
    resumeBarText: document.querySelectorAll('.resume.menu-bar li, .resume.toolbar i, .resume.font-toolbar li'),
    resumeToolBar: document.querySelector('.resume.toolbar'),
    resumeFontText: document.querySelectorAll('.resume.font-toolbar li'),
    resumeFrame: document.querySelector('.resume.window-content img'),
};

let applyNightModeResume = () => {
    if(settingsElem.nightElem.nightToggle.checked) {
        resumeElem.resumeMenuBar.style.backgroundColor = 'rgb(6, 61, 96)';
        resumeElem.resumeMenuBar.style.transition = '0.4s';
        resumeElem.resumeToolBar.style.backgroundColor = 'rgb(6, 61, 96)';
        resumeElem.resumeToolBar.style.transition = '0.4s';

        resumeElem.resumeBarText.forEach((text) => {
            text.style.color = 'rgb(185, 215, 234)';
            text.style.transition = '0.4s';
        });
    }
    else {
        resumeElem.resumeMenuBar.style.backgroundColor = '';
        resumeElem.resumeToolBar.style.backgroundColor = '';

        resumeElem.resumeBarText.forEach((text) => {
            text.style.color = '';
        });
    }
}

settings.settingSaveLoad('nightModeState', settingsElem.nightElem.nightToggle, applyNightModeResume).loadToggleSetting().saveToggleSetting();