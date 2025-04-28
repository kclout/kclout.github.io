const mediaPlayerElem = {
    mediaPlayerBg: document.querySelector('.media-player.content'),
    mediaPlayerTitle: document.querySelector('.media-player.content a'),
    mediaPlayerButtons: document.querySelectorAll('.media-player.controls i'),
};

const projectsWindow = {
    projectsImg: document.querySelector('.projects img'),
};

let applyNightModeHome = () => {
    if(settingsElem.nightElem.nightToggle.checked) {
        mediaPlayerElem.mediaPlayerBg.style.backgroundColor = 'rgb(99, 77, 117)';
        mediaPlayerElem.mediaPlayerBg.style.borderTop = '0.25px solid rgb(223, 202, 239)';
        mediaPlayerElem.mediaPlayerTitle.style.color = 'rgb(223, 202, 239)';
        mediaPlayerElem.mediaPlayerTitle.addEventListener('mouseover', () => {
            mediaPlayerElem.mediaPlayerTitle.style.color = 'rgb(255, 255, 255)';
        });
        mediaPlayerElem.mediaPlayerTitle.addEventListener('mouseout', () => {
            if(settingsElem.nightElem.nightToggle.checked) {
                mediaPlayerElem.mediaPlayerTitle.style.color = 'rgb(223, 202, 239)';
            }
            else {
                mediaPlayerElem.mediaPlayerTitle.style.color = '';
            }
        })

        mediaPlayerElem.mediaPlayerButtons.forEach((button) => {
            button.style.color = 'rgb(223, 202, 239)';
            button.style.transition = '0.4s';
            button.addEventListener('mouseover', () => {
                    button.style.color = 'rgb(161, 135, 180)';        
            });
            button.addEventListener('mouseout', () => {
                if(settingsElem.nightElem.nightToggle.checked) {
                    button.style.color = 'rgb(223, 202, 239)';
                }
                else {
                    button.style.color = '';
                }
            });
            button.addEventListener('mousedown', () => {
                if(settingsElem.nightElem.nightToggle.checked) {
                    button.style.color = 'rgb(99, 77, 117)';
                }
                else {
                    button.style.color = 'rgb(161, 135, 180)';
                }
                
            });
        });

        projectsWindow.projectsImg.style.borderColor = 'rgb(223, 202, 239)';
    }
    else {
        mediaPlayerElem.mediaPlayerBg.style.backgroundColor = '';
        mediaPlayerElem.mediaPlayerBg.style.borderTop = '';
        mediaPlayerElem.mediaPlayerTitle.style.color = '';

        mediaPlayerElem.mediaPlayerButtons.forEach((button) => {
            button.style.color = '';
        });
        
        projectsWindow.projectsImg.style.borderColor = '';
    }
};

settings.settingSaveLoad('nightModeState', settingsElem.nightElem.nightToggle, applyNightModeHome).loadToggleSetting().saveToggleSetting();