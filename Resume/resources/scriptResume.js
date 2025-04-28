const downloadElem = {
    downloadButtons: document.querySelectorAll('.download-resume.window-content a'),
};

const resumeElem = {
    resumeMenuBar: document.querySelector('.resume.menu-bar'),
    resumeBarText: document.querySelectorAll('.resume.menu-bar li, .resume.toolbar i, .resume.font-toolbar li'),
    resumeToolBar: document.querySelector('.resume.toolbar'),
    resumeFontText: document.querySelectorAll('.resume.font-toolbar li'),
    resumeFrame: document.querySelector('.resume.window-content iframe'),
};

let applyNightModeResume = () => {
    if(settingsElem.nightElem.nightToggle.checked) {
        downloadElem.downloadButtons.forEach((button) => {
            button.style.color = 'rgb(0, 0, 0)';
            button.style.backgroundColor = 'rgb(255, 255, 255)';
            button.style.borderColor = 'rgb(255, 255, 255)'
            button.style.transition = '0.4s';

            button.addEventListener('mouseover', () => {
                button.style.color = 'rgb(176, 197, 172)';
                button.style.backgroundColor = 'rgb(40, 40, 40)';
                button.style.borderColor = 'rgb(176, 197, 172)';
            });

            button.addEventListener('mouseout', () => {
                if(settingsElem.nightElem.nightToggle.checked) {
                    button.style.color = 'rgb(0, 0, 0)';
                    button.style.backgroundColor = 'rgb(255, 255, 255)';
                    button.style.borderColor = 'rgb(255, 255, 255)';
                }
                else {
                    button.style.color = '';
                    button.style.backgroundColor = '';
                    button.style.borderColor = '';
                }
            });

            button.addEventListener('mousedown', () => {
                if(settingsElem.nightElem.nightToggle.checked) {
                    button.style.color = 'rgb(0, 0, 0)';
                    button.style.backgroundColor = 'rgb(176, 197, 172)';
                    button.style.borderColor = 'rgb(176, 197, 172)';
                }
                else {
                    button.style.color = 'rgb(255, 255, 255)';
                    button.style.backgroundColor = 'rgb(91, 121, 84)';
                    button.style.borderColor = 'rgb(91, 121, 84';
                }
            });
        });

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
        downloadElem.downloadButtons.forEach((button) => {
            button.style.color = '';
            button.style.backgroundColor = '';
            button.style.borderColor = '';
            

            button.addEventListener('mouseover', () => {
                button.style.color = '';
                button.style.backgroundColor = '';
                button.style.borderColor = '';
            });
        });

        resumeElem.resumeMenuBar.style.backgroundColor = '';
        resumeElem.resumeToolBar.style.backgroundColor = '';

        resumeElem.resumeBarText.forEach((text) => {
            text.style.color = '';
        });
    }
}

settings.settingSaveLoad('nightModeState', settingsElem.nightElem.nightToggle, applyNightModeResume).loadToggleSetting().saveToggleSetting();