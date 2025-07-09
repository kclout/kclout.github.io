const mediaPlayerElem = {
    mediaPlayerBg: document.querySelector('.media-player.content'),
    mediaPlayerTitle: document.querySelector('.media-player.content a'),
    mediaPlayerButtons: {all: document.querySelectorAll('.media-player.controls i'), forward: document.querySelector('.fa-forward'), back: document.querySelector('.fa-backward'), play: document.querySelector('#play'), pause: document.querySelector('#pause')},
    mediaPlayerImg: document.querySelector('.projects img'),
};

class Project {
    constructor(title, image, link) {
        this._title = title;
        this._image = image;
        this._link = link;
    }

    get title() {
        return this._title;
    }

    get image() {
        return this._image;
    }

    get link() {
        return this._link;
    }
}

let getProjArray = () => {
    return fetch('../Projects/index.html')      // get all projects from Projects page and store info as new Project in projArray
            .then(response => response.text())
            .then(htmlText => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');

                const projWindowContentHome = doc.querySelectorAll('.proj.window-content');
                const proj0 = new Project('Placeholder Title', '../resources/images/placeholder.jpg', '#');
                const projArray = [proj0];

                projWindowContentHome.forEach((content) => {
                    const projNumHome = Number(content.className.match(/(\d+)/)[0]);
                    const projTitle = doc.querySelector(`.proj.p${projNumHome}.window h2`).innerHTML;
                    const projPrevName = doc.querySelector(`.p${projNumHome}.window-content a img`).src.split("/").pop().split('.')[0];
                    const projPrev = `../resources/images/${projPrevName}.gif`;
                    const projLink = doc.querySelector(`.p${projNumHome}.window-content a.answer-button`).href;

                    const newProj = new Project(projTitle, projPrev, projLink);

                    projArray.push(newProj);
                });
                return projArray;
            });
}

let mediaPlayerAnim = () => {
    return getProjArray().then(projArray => {
        const pauseIcon = document.querySelector('.fa-pause');
        const num = [1, 2, 3];         // corresponding numbers for chosen displayed projects
        let i = 0;

        let getNextProj = () => {
            mediaPlayerElem.mediaPlayerImg.src = projArray[num[i]].image;
            mediaPlayerElem.mediaPlayerTitle.innerHTML = projArray[num[i]].title;
            mediaPlayerElem.mediaPlayerTitle.href = projArray[num[i]].link;
        }

        let goForward = () => {
            if(i + 1 < num.length) {        // check if at end of array and start over
                i += 1;
            }
            else {
                i = 0;
            }
            getNextProj();
        }

        let goBack = () => {
            if(i - 1 >= 0) {        // check if at beginning of array and start from end
                i -= 1;
            }
            else {
                i = num.length - 1;
            }
            getNextProj();
        }

        let play;
        let playVideo = () => {     // change project every 6 sec
            play = setInterval(() => {
                goForward();
            }, 6000);
        }

        let pauseVideo = () => {
            clearInterval(play);
        }

        getNextProj();      // initialize projects 'video'
        playVideo();

        mediaPlayerElem.mediaPlayerButtons.forward.addEventListener('click', () => {
            goForward();
        });

        mediaPlayerElem.mediaPlayerButtons.back.addEventListener('click', () => {
            goBack();
        });

        mediaPlayerElem.mediaPlayerButtons.pause.addEventListener('change', () => {
            if (mediaPlayerElem.mediaPlayerButtons.pause.checked) {
                pauseIcon.style.backgroundColor = 'rgb(255, 255, 255)';
                pauseVideo();
            }
        });

        mediaPlayerElem.mediaPlayerButtons.play.addEventListener('change', () => {
            if (mediaPlayerElem.mediaPlayerButtons.play.checked) {
                if(settingsElem.nightElem.nightToggle.checked) {
                    pauseIcon.style.backgroundColor = 'rgb(99, 77, 117)';
                }
                else {
                    pauseIcon.style.backgroundColor = 'rgb(223, 202, 239)';
                }
                playVideo();
            }
        });

        return {
            getNextProj,
            goForward,
            goBack,
            playVideo,
            pauseVideo,
        }
    });
}

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

        mediaPlayerElem.mediaPlayerButtons.all.forEach((button) => {
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

        mediaPlayerElem.mediaPlayerImg.style.borderColor = 'rgb(223, 202, 239)';
    }
    else {
        mediaPlayerElem.mediaPlayerBg.style.backgroundColor = '';
        mediaPlayerElem.mediaPlayerBg.style.borderTop = '';
        mediaPlayerElem.mediaPlayerTitle.style.color = '';

        mediaPlayerElem.mediaPlayerButtons.all.forEach((button) => {
            button.style.color = '';
        });
        
        mediaPlayerElem.mediaPlayerImg.style.borderColor = '';
    }
};

mediaPlayerAnim();
settings.settingSaveLoad('nightModeState', settingsElem.nightElem.nightToggle, applyNightModeHome).loadToggleSetting().saveToggleSetting();