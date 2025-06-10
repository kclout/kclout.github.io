const projElem = {
    projWindowContent: document.querySelectorAll('.proj.window-content'),
    projWindowBg: document.querySelector('.container.b'),
    projHashtags: document.querySelectorAll('.hashtags'),
    projButtons: document.querySelectorAll('.mini-container.a .answer-button'),
}

let getProjInfo = () => {
    const projInfoArr = [];

    projElem.projWindowContent.forEach((content) => {
        const projNum = Number(content.className.match(/(\d+)/)[0]);
        const filePath = content.querySelector('img').src;
        const fileName = filePath.split("/").pop().split('.')[0];     // get name of file without extenstion
        const fileExtension = filePath.split("/").pop().split('.')[1];
        const projImg = document.querySelector(`.proj.p${projNum} img`);
        
        projInfoArr.push({
            projNum,
            filePath,
            fileName,
            fileExtension,
            projImg,
        });
    });

    return projInfoArr;
}

let projWindowStyles = () => {
    queryCheck();
    const projInfoStyles = getProjInfo();

    projInfoStyles.forEach((info) => {
        projElem.projWindowContent.forEach((content) => {
            if(queryCheck() !== 1) {
                if(info.projNum % 2 === 0 && content.className.includes(`${info.projNum}`)) { 
                    info.projImg.style.marginLeft = '1rem';
                    content.style.flexDirection = 'row-reverse';
                }
                else if(info.projNum % 2 !== 0 && content.className.includes(`${info.projNum}`)){
                    info.projImg.style.marginRight = '1rem';
                    content.style.flexDirection = 'row';
                }
            }
            else {
                info.projImg.style.margin = '0';
                content.style.flexDirection = 'column';
            }

            info.projImg.addEventListener('click', () => {
                if(content.className.includes(`${info.projNum}`)) {
                    window.open(document.querySelector(`.proj.p${info.projNum} .answer-button`).href, '_blank');
                }
            });
        });
    });
}

let projGifHover = () => {
    const projInfoGif = getProjInfo();

    projInfoGif.forEach((info) => {
        projElem.projWindowContent.forEach((content) => {
            content.querySelector('img').addEventListener('mouseover', () => {
                content.querySelector('img').style.cursor = 'pointer';
                content.querySelector('img').src = `../resources/images/${info.fileName}.gif`;
            });

            content.querySelector('img').addEventListener('mouseout', () => {
                content.querySelector('img').src = `../resources/images/${info.fileName}.${info.fileExtension}`;
            });
        });
    });
}

let applyNightModeProjects = () => {
    const projInfoNightMode = getProjInfo();

    if(settingsElem.nightElem.nightToggle.checked) {
        projElem.projWindowBg.style.backgroundColor = 'rgba(30, 30, 30, 0.5)';
        projElem.projWindowBg.style.transition = '0.4s';

        projInfoNightMode.forEach((info) => {
            info.projImg.style.borderColor = 'rgb(223, 202, 239)';
            info.projImg.style.transition = '0.4s';
        });

        projElem.projButtons.forEach((button) => {
            button.querySelector('p').style.color = 'rgb(0, 0, 0)';
            button.querySelector('p').style.transition = '0.4s';

            button.addEventListener('mouseover', () => {
                button.querySelector('p').style.color = 'rgb(176, 197, 172)';
            });

            button.addEventListener('mouseout', () => {
                button.querySelector('p').style.color = 'rgb(0, 0, 0)';
            });

            button.addEventListener('mousedown', () => {
                button.querySelector('p').style.color = 'rgb(0, 0, 0)';
            });
        });

        projElem.projHashtags.forEach((hashtags) => {
            hashtags.style.backgroundColor = 'rgb(99, 77, 117)';
            hashtags.style.borderColor = 'rgb(223, 202, 239)';
            hashtags.style.transition = '0.4s';

            hashtags.querySelectorAll('li').forEach((tag) => {
                tag.style.color = 'rgb(223, 202, 239)';
                tag.style.transition = '0.4s';
            });
        });
    }
    else {
        projElem.projWindowBg.style.backgroundColor = '';

        projInfoNightMode.forEach((info) => {
            info.projImg.style.borderColor = '';
        });

        projElem.projButtons.forEach((button) => {
            button.querySelector('p').style.color = '';

            button.addEventListener('mouseover', () => {
                button.querySelector('p').style.color = '';
            });

            button.addEventListener('mouseout', () => {
                button.querySelector('p').style.color = '';
            });

            button.addEventListener('mousedown', () => {
                button.querySelector('p').style.color = '';
            });
        });

        projElem.projHashtags.forEach((hashtags) => {
            hashtags.style.backgroundColor = '';
            hashtags.style.borderColor = '';

            hashtags.querySelectorAll('li').forEach((tag) => {
                tag.style.color = '';
            });
        });
    }
    
}

projWindowStyles();
projGifHover();
query.mobile.addEventListener('change', projWindowStyles);
query.desktopSmall.addEventListener('change', projWindowStyles);
query.desktop.addEventListener('change', projWindowStyles);
settings.settingSaveLoad('nightModeState', settingsElem.nightElem.nightToggle, applyNightModeProjects).loadToggleSetting().saveToggleSetting();