// misc elements //

const miscElem = {
   heartSticky: document.querySelector('.heart.sticky'),
   overlay: document.querySelector('#overlay'),
};

// media queries //

const query = {
   mobile: window.matchMedia('only screen and (max-width: 800px) and (orientation: portrait), only screen and (max-width: 768px) and (orientation: landscape)'),
   desktop: window.matchMedia('only screen and (min-width: 801px)'),
};

// nav elements //

const navElem = {
   nav: document.querySelector('nav'),
   navListItems: document.querySelectorAll('nav li'),
   folders: document.querySelectorAll('.folder'),
   bars: document.querySelector('nav .fa-bars'),
}

// main elements //

const mainElem = {
   windows: document.querySelectorAll('.window'),
   barText: document.querySelectorAll('.bar h2'),
   mainText: document.querySelectorAll('.window-content p'),
   pageBackground: document.querySelector('html'),
}

// footer elements //
const footerElem = {
   footer: document.querySelector('footer'),
}

// settings elements //

const settingsElem = {
   settingsButton: document.querySelector('.settings.button'),
   settingsWindow: document.querySelector('.settings.window'),
   settingsContent: document.querySelector('.settings.window-content'),
   settingsExit: document.querySelector('.settings button.exit'),
   settingsText: document.querySelectorAll('.table-text p'),
   settingsIcons: document.querySelectorAll('.table-text .fa-solid'),
   nightElem: {nightToggle: document.querySelector('.night-mode.toggle input')},
}

const popUpElem = {
   popUpWindow: document.querySelector('.pop-up.window'),
   popUpContent: document.querySelector('.pop-up.window-content'),
   popUpExit: document.querySelector('.pop-up.fa-rectangle-xmark'),
}

// media queries check //

let queryCheck = () => {
   if(query.mobile.matches) {
      return true;
   }
   else {
      return false;
   }
}

// nav //

let navModule = () => {

   // hide and show nav list items //
   let hideList = () => {
      navElem.navListItems.forEach((item) => {
         if(!item.firstElementChild.classList.contains('logo')) {
            item.style.display = 'none';
         }
      });
   }

   let showList = () => {
      navElem.navListItems.forEach((item) => {
         if(!item.firstElementChild.classList.contains('logo')) {
            item.style.display = 'block';
         }
      });
   }

   // folder hover animations //
   let folderAnim = () => {
      navElem.folders.forEach((folder) => {
         folder.addEventListener('mouseover', () => {
            folder.querySelector('nav p').style.color = 'rgb(255, 255, 255)';
            folder.querySelector('nav p').style.transition = '0.1s';
            folder.querySelector('nav img').src = './resources/images/folderopen.png';
            folder.querySelector('nav img').style.transition = '0.1s';
      
            if(!queryCheck()) {
               folder.querySelector('nav p').style.fontSize = '1.3rem';
               folder.querySelector('nav img').style.width = '7.5rem';
            }
         });

         folder.addEventListener('mouseout', () => {
            if(!settingsElem.nightElem.nightToggle.checked) {
               folder.querySelector('nav p').style.color = '';
            }
            else {
               folder.querySelector('nav p').style.color = 'rgb(176, 197, 172)';
            }
             
            folder.querySelector('nav p').style.transition = '0.1s';
            folder.querySelector('nav img').src = './resources/images/folderclosed.png';
            folder.querySelector('nav img').style.transition = '0.1s';
      
            if(!queryCheck()) {
               folder.querySelector('nav p').style.fontSize = '';
               folder.querySelector('nav img').style.width = '';
            }
         });
      });
   }

   // open/close mobile nav //
   let mobileNav = () => {
      navElem.bars.addEventListener('mouseover', () => {
         showList();   
         navElem.nav.style.height = '22rem';
         navElem.nav.style.transition = '0.5s';
         navElem.bars.style.color = 'rgb(255, 255, 255)';
         navElem.bars.style.transition = '0.1s';
         miscElem.heartSticky.style.top = '38%';
         miscElem.heartSticky.style.transition = '0.5s';
      });

      navElem.nav.addEventListener('mouseleave', () => {
         navElem.nav.style.height = '';
         navElem.nav.style.transition = '0.5s';
         
         if(!settingsElem.nightElem.nightToggle.checked) {
            navElem.bars.style.color = '';
         }
         else {
            navElem.bars.style.color = 'rgb(176, 197, 172)';
         }

         navElem.bars.style.transition = '0.1s';
         miscElem.heartSticky.style.top = '';
         miscElem.heartSticky.style.transition = '0.5s';
      });
   }

   return {
      hideList,
      showList,
      folderAnim,
      mobileNav,
   }

}

let navigation = navModule(); 

// settings //

let settingsModule = () => {
   let settingsAnim = () => {
      settingsElem.settingsButton.addEventListener('mouseover', () => {
         if(!settingsElem.nightElem.nightToggle.checked) {
            settingsElem.settingsButton.querySelector('p').style.color = 'rgb(255, 255, 255)';
            settingsElem.settingsButton.querySelector('.fa-gear').style.color = 'rgb(255, 255, 255)';
         }
         else {
            settingsElem.settingsButton.querySelector('p').style.color = 'rgb(176, 197, 172)';
            settingsElem.settingsButton.querySelector('.fa-gear').style.color = 'rgb(176, 197, 172)';
         }
         settingsElem.settingsButton.querySelector('p').style.transition = '0.1s';
         settingsElem.settingsButton.querySelector('.fa-gear').style.transition = '0.1s';
      });
   
      settingsElem.settingsButton.addEventListener('mouseout', () => {
         if(!settingsElem.nightElem.nightToggle.checked) {
            settingsElem.settingsButton.querySelector('p').style.color = '';
            settingsElem.settingsButton.querySelector('.fa-gear').style.color = '';
         }
         else {
            settingsElem.settingsButton.querySelector('p').style.color = 'rgb(255, 255, 255)';
            settingsElem.settingsButton.querySelector('.fa-gear').style.color = 'rgb(255, 255, 255)';
         }  
         settingsElem.settingsButton.querySelector('p').style.transition = '0.1s';
         settingsElem.settingsButton.querySelector('.fa-gear').style.transition = '0.1s';
      });
   }

   let settingSaveLoad = (state, toggle, func) => {
      const saveToggleSetting = () => {
         toggle.addEventListener('change', () => {
            func();
            localStorage.setItem(state, toggle.checked);
         });

         return { 
         loadToggleSetting, 
         saveToggleSetting,
         }
      }
      
      const loadToggleSetting = () => {
         if(localStorage.getItem(state) === 'true') {
            toggle.checked = true;
         }
         else {
            toggle.checked = false;
         }
      
         func();

         return { 
            loadToggleSetting, 
            saveToggleSetting,
            }
      }

      return {
         loadToggleSetting,
         saveToggleSetting, 
      }
   }

   return {
      settingsAnim,
      settingSaveLoad,      
   }
}

let settings = settingsModule();

// night mode //

let applyNightMode = () => {
   if(settingsElem.nightElem.nightToggle.checked) {

      // nav //
      navElem.nav.style.backgroundColor = 'rgb(30, 30, 30)';
      navElem.nav.style.borderRightColor = 'rgb(176, 197, 172)';
      navElem.nav.style.transition = '0.4s';

      navElem.folders.forEach((folder) => {
         folder.querySelector('nav p').style.color = 'rgb(176, 197, 172)';
         folder.querySelector('nav p').style.transition = '0.4s'; 
      });

      navElem.bars.style.color = 'rgb(176, 197, 172)';

      // main //
      mainElem.pageBackground.style.background = 'rgb(75, 75, 75)';
      mainElem.pageBackground.style.backgroundSize = '60px 60px'
      mainElem.pageBackground.style.backgroundImage = 'linear-gradient(to right, rgb(96, 96, 96) 1px, transparent 1px), linear-gradient(to bottom, rgb(96, 96, 96)  1px, transparent 1px)'
      mainElem.pageBackground.style.transition = '0.4s';
      miscElem.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
      miscElem.overlay.style.transition = '0.1s';  

      mainElem.windows.forEach((window) => {
         window.style.backgroundColor = 'rgb(40, 40, 40)';
         window.style.borderColor = 'rgb(176, 197, 172)';
         window.style.transition = '0.4s';         
      });

      mainElem.barText.forEach((text) => {
         text.style.color = 'rgb(176, 197, 172)';
         text.style.transition = '0.4s';
      });

      mainElem.mainText.forEach((text) => {
         text.style.color = 'rgb(176, 197, 172)';
         text.style.transition = '0.4s';
      });

      // footer //
      footerElem.footer.style.backgroundColor = 'rgb(0, 0, 0)';
      footerElem.footer.style.transition = '0.4s';

      // settings //
      settingsElem.settingsButton.querySelector('p').style.color = 'rgb(255, 255, 255)';
      settingsElem.settingsButton.querySelector('p').style.transition = '0.4s';
      settingsElem.settingsButton.querySelector('.fa-gear').style.color = 'rgb(255, 255, 255)';
      settingsElem.settingsButton.querySelector('.fa-gear').style.transition = '0.4s';

      settingsElem.settingsText.forEach((text) => {
         text.style.color = 'rgb(222, 234, 220)';
         text.style.transition = '0.4s';
      });               

      settingsElem.settingsIcons.forEach((icon) => {
         icon.style.color = 'rgb(255, 255, 255)';
         icon.style.transition = '0.4s';
      }); 
   }
   else {

      // nav //
      navElem.nav.style.backgroundColor = '';

      navElem.folders.forEach((folder) => {
         folder.querySelector('nav p').style.color = '';
      });

      navElem.bars.style.color = '';

      // main //
      mainElem.pageBackground.style.background = '';
      miscElem.overlay.style.backgroundColor = '';

      mainElem.windows.forEach((window) => {
         window.style.backgroundColor = '';
         window.style.borderColor = '';
      });

      mainElem.barText.forEach((text) => {
         text.style.color = '';
      });

      mainElem.mainText.forEach((text) => {
         text.style.color = '';
      });

      // footer //
      footerElem.footer.style.backgroundColor = '';

      // settings //
      settingsElem.settingsButton.querySelector('p').style.color = '';               
      settingsElem.settingsButton.querySelector('.fa-gear').style.color = '';

      settingsElem.settingsText.forEach((text) => {
         text.style.color = '';
      });               

      settingsElem.settingsIcons.forEach((icon) => {
         icon.style.color = '';
      });
   }
}

// pop-up windows //

let popUpModule = () => {
   let popUpOpenClose = (button, window, content, exitButton) => {
      let openPopUpWindow = () => {
         button.addEventListener('click', () => {
            miscElem.overlay.style.display = 'block';
   
            if(!queryCheck()) {
               window.style.width = '65%';
            }
            else {
               window.style.width = '90%';
            }
   
            window.removeAttribute('inert');
            window.style.height = '85%';
            window.style.opacity = '100%';
            window.style.transition = '0.4s';
            content.style.width = 'auto';
            content.style.height = 'auto';
         });

         return {
            openPopUpWindow,
            closePopUpWindow,
         }
      }
   
      let closePopUpWindow = () => {
         let closeFunc = () => {
            setTimeout(() => {
               miscElem.overlay.style.display = 'none';
               content.style.width = '';
               content.style.height = '';
               content.style.transition = '0.4s';
            }, 300);
            
            window.setAttribute('inert', '');
            window.style.opacity = '';
            window.style.transition = '0.4s';
      
            setTimeout(() => {
               window.style.width = '';
               window.style.height = '';
            }, 400);
         }
   
         exitButton.addEventListener('click', closeFunc);
         document.addEventListener('keydown', (event) => {
            if(event.key === "Escape") {
               closeFunc();
            }
         });

         return {
            openPopUpWindow,
            closePopUpWindow,
         }
      }

      return {
         openPopUpWindow,
         closePopUpWindow,
      }
   }

   let popUpWindowResize = (window) => {        // changes window according to queries when already open
      if(!queryCheck() && window.style.width !== '') {
         window.style.width = '65%';
      }
      else if(queryCheck() && settingsElem.settingsWindow.style.width !== '') {
         window.style.width = '90%';
      }
   }

   return {
      popUpOpenClose,
      popUpWindowResize,
   }
}

let popUps = popUpModule();

// run code according to query changes //

let queryChange = () => {
   queryCheck();

   if(queryCheck()) {
      navigation.hideList();          // hide list before user hovers in mobile mode
      navigation.mobileNav();
   }
   else {
      navigation.showList();          // always show list when in desktop mode
   }

   navigation.folderAnim();
   settings.settingsAnim();
   popUps.popUpWindowResize(settingsElem.settingsWindow);
}

queryChange();          // initial run

settings.settingSaveLoad('nightModeState', settingsElem.nightElem.nightToggle, applyNightMode).loadToggleSetting().saveToggleSetting();

popUps.popUpOpenClose(settingsElem.settingsButton, settingsElem.settingsWindow, settingsElem.settingsContent, settingsElem.settingsExit).openPopUpWindow().closePopUpWindow();

query.mobile.addEventListener('change', queryChange);
query.desktop.addEventListener('change', queryChange);