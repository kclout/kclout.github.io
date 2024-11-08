// media queries //

const mobileQuery = window.matchMedia('only screen and (max-width: 800px) and (orientation: portrait), only screen and (max-width: 768px) and (orientation: landscape)');
const desktopQuery = window.matchMedia('only screen and (min-width: 801px)');

let queryCheck = () => {
   if(mobileQuery.matches) {
      return true;
   }
   else {
      return false;
   }
}

// hide and show nav list items //

const nav = document.querySelector('nav');
const navListItems = nav.querySelectorAll('li');

let hideList = () => {
   navListItems.forEach((item) => {
      if(!item.firstElementChild.classList.contains('logo')) {
         item.style.display = 'none';
      }
   });
}

let showList = () => {
   navListItems.forEach((item) => {
      if(!item.firstElementChild.classList.contains('logo')) {
         item.style.display = 'block';
      }
   });
}

// nav hover animations //

let navAnim = () => {
   const folders = document.querySelectorAll('.folder');
   
   folders.forEach((folder) => {
      const folderText = folder.querySelector('nav p');
      const folderImg = folder.querySelector('nav img');
   
      let folderMouseOver = () => {
         folderText.style.color = 'rgb(255, 255, 255)';
         folderText.style.transition = '0.1s';
   
         folderImg.src = './resources/images/folderopen.png';
         folderImg.style.transition = '0.1s';
   
         if(!queryCheck()) {
            folderText.style.fontSize = '1.3rem';
            folderImg.style.width = '7.5rem';
         }
      }
   
      let folderMouseOut = () => {
         folderText.style.color = '';   
         folderText.style.transition = '0.1s';
   
         folderImg.src = './resources/images/folderclosed.png';
         folderImg.style.transition = '0.1s';
   
         if(!queryCheck()) {
            folderText.style.fontSize = '';
            folderImg.style.width = '';
         }
      }
   
      folder.addEventListener('mouseover', folderMouseOver);
      folder.addEventListener('mouseout', folderMouseOut);
   });
}

// open/close mobile nav //

let mobileNav = () => { 
   const mobileNavBar = nav.querySelector('.fa-bars');
   const heartSticky = document.querySelector('.heart.sticky');

   let openMobileNav = () => {
      showList();
      
      nav.style.height = '18.5rem';
      nav.style.transition = '0.5s';

      mobileNavBar.style.color = 'rgb(255, 255, 255)';
      mobileNavBar.style.transition = '0.1s';

      heartSticky.style.top = '38%';
      heartSticky.style.transition = '0.5s';
   }

   let closeMobileNav = () => {
      nav.style.height = '';
      nav.style.transition = '0.5s';

      mobileNavBar.style.color = '';
      mobileNavBar.style.transition = '0.1s';

      heartSticky.style.top = '';
      heartSticky.style.transition = '0.5s';
   }

   mobileNavBar.addEventListener('mouseover', openMobileNav);
   nav.addEventListener('mouseleave', closeMobileNav);   
}

// run script after checking media queries //

let runNavScript = () => {
   queryCheck();

   if(queryCheck()) {
      hideList();          // hide list before user hovers in mobile mode
      navAnim();
      mobileNav();
   }
   else {
      showList();          // always show list when in desktop mode
      navAnim();
   }
}

runNavScript();           // initial run
mobileQuery.addEventListener('change', runNavScript);
desktopQuery.addEventListener('change', runNavScript);