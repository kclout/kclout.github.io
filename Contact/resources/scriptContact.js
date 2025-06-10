const directElem = {
    directFolders: document.querySelectorAll('.contact-folder'),
    directBackground: document.querySelector('.mini-container.a'),
    directMenuBar: document.querySelector('.contact.menu-bar'),
    directBarText: document.querySelectorAll('.contact.menu-bar li'),
    directContent: document.querySelector('.contact.window-content'),
    directPopUpImg: document.querySelectorAll('div.contact.pop-up.window-content .photo'),
};

let popUpContactElems = () => {
    const allContactFolders = [];
    
    directElem.directFolders.forEach((folder) => {
        if(!folder.querySelector('img').src.includes('paper')) {
            const folderType = folder.classList[1];
            const folderButton = document.querySelector(`.${folderType}.contact-folder`);
            const folderWindow = document.querySelector(`.${folderType}.window`);
            const folderContent = document.querySelector(`.${folderType}.window-content`);
            const folderExit = document.querySelector(`.${folderType} button.exit`);
            const popUpExpand = document.querySelector(`div.${folderType}.pop-up.window-content i`); 
            const popUpSite = document.querySelector(`.${folderType} div.pop-up.window-content a`);

            allContactFolders.push({
                folderType,
                folderButton,
                folderWindow,
                folderContent,
                folderExit,
                popUpExpand,
                popUpSite,
            });
        }
    });

    return allContactFolders;
}

let directAnim = () => {
    const folderElemsAnim = popUpContactElems();

    folderElemsAnim.forEach((folderElem) => {
        folderElem.folderButton.addEventListener('mouseover', () => {
            if (!settingsElem.nightElem.nightToggle.checked) {
                folderElem.folderButton.style.backgroundColor = 'rgb(222, 234, 220)';
            }
            else {
                folderElem.folderButton.style.backgroundColor = 'rgb(59, 84, 59)';
            }

            folderElem.folderButton.style.transition = '0.1s';

            if (!folderElem.folderButton.querySelector('img').src.includes('paper')) {
                folderElem.folderButton.style.cursor = 'pointer';
            }
        });

        folderElem.folderButton.addEventListener('mouseover', () => {
            if (!settingsElem.nightElem.nightToggle.checked) {
                folderElem.folderButton.style.backgroundColor = 'rgb(222, 234, 220)';
            }
            else {
                folderElem.folderButton.style.backgroundColor = 'rgb(59, 84, 59)';
            }

            folderElem.folderButton.style.transition = '0.1s';

            if (!folderElem.folderButton.querySelector('img').src.includes('paper')) {
                folderElem.folderButton.style.cursor = 'pointer';
            }
        });

        folderElem.folderButton.addEventListener('mouseout', () => {
            folderElem.folderButton.style.backgroundColor = '';
        });

        folderElem.folderButton.addEventListener('click', () => {
            if (!folderElem.folderButton.querySelector('img').src.includes('paper')) {
                folderElem.folderButton.querySelector('img').src = `/Contact/resources/images/folderopen_${folderElem.folderType}.png`;
            }
        });
    });    
}

let popUpContact = () => {
    const folderElemPopUp = popUpContactElems();

    folderElemPopUp.forEach((folderElem) => {
        folderElem.folderExit.addEventListener('click', () => {
            setTimeout(() => {
                folderElem.folderButton.querySelector('img').src = `/Contact/resources/images/folder_${folderElem.folderType}.png`;
            }, 500);          
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                setTimeout(() => {
                    folderElem.folderButton.querySelector('img').src = `/Contact/resources/images/folder_${folderElem.folderType}.png`;
                }, 500);
            }
        });

        popUps.popUpOpenClose(folderElem.folderButton, folderElem.folderWindow, folderElem.folderContent, folderElem.folderExit).openPopUpWindow().closePopUpWindow();
        
        folderElem.folderButton.addEventListener('click', () => {
            if (folderElem.folderWindow.className.includes('small')) {
                folderElem.folderWindow.style.height = '15rem';
            }

            if(!folderElem.folderWindow.className.includes('small')) {
                folderElem.popUpExpand.addEventListener('click', () => {
                    window.open(folderElem.popUpSite.href, '_blank');
                });
            }         
        }); 
    });
}

let applyNightModeContact = () => {
    if(settingsElem.nightElem.nightToggle.checked) {
        directElem.directBackground.style.backgroundColor = 'rgb(40, 40, 40)';
        directElem.directBackground.style.transition = '0.4s';
        directElem.directContent.style.backgroundColor = 'rgb(6, 61, 96)';
        directElem.directContent.style.transition = '0.4s';
        directElem.directMenuBar.style.backgroundColor = 'rgb(6, 61, 96)';
        directElem.directMenuBar.style.transition = '0.4s';

        directElem.directBarText.forEach((text) => {
            text.style.color = 'rgb(185, 215, 234)';
            text.style.transition = '0.4s';
        });

        directElem.directPopUpImg.forEach((img) => {
            img.style.borderColor = 'rgb(223, 202, 239)';
            img.style.transition = '0.4s';

        });
    }
    else {
        directElem.directBackground.style.backgroundColor = '';
        directElem.directContent.style.backgroundColor = '';
        directElem.directMenuBar.style.backgroundColor = '';

        directElem.directBarText.forEach((text) => {
            text.style.color = '';
        });

        directElem.directPopUpImg.forEach((img) => {
            img.style.borderColor = '';
        });
    }
}

directAnim();
popUpContact();
settings.settingSaveLoad('nightModeState', settingsElem.nightElem.nightToggle, applyNightModeContact).loadToggleSetting().saveToggleSetting();