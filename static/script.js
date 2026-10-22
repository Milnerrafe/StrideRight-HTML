// Sync the offset of the main tag based on the height of the header tag
function headerOffset() {
  const headerHight = document.querySelector('header').getBoundingClientRect().height
  document.querySelector('main').style.setProperty('--target-height', `${headerHight}px`)
  document.querySelector('#shop-drop-down').style.setProperty('--target-height', `${headerHight}px`)

}

window.addEventListener('DOMContentLoaded', headerOffset);
window.addEventListener('resize', headerOffset);


// Check whether the desktop or mobile optimized version should be shown
function desktopMobileOptimizer() {


}

window.addEventListener('DOMContentLoaded', desktopMobileOptimizer);
window.addEventListener('resize', desktopMobileOptimizer);



let shopDropdownopen = false
let target = '#FOOTBALL'
let pretarget = ''
let activeAnimation = null;
let cooldown = 0
let footballel = document.querySelector(target);
let bigtext = document.querySelector('#bigtext')
let sportsorcasual = true



function sportsorcasualfunc() {
  if (sportsorcasual == true) {
    document.querySelectorAll('.sliding-segmented-control .item')[0].style.color = "#000";
    document.querySelectorAll('.sliding-segmented-control .item')[1].style.color = "#fff";
    document.querySelector('.sliding-segmented-control .selected').style.setProperty('--translate', `0%`);
    document.querySelector('#sports').classList.remove('hidden');
    document.querySelector(".section4").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url('/static/images/headers/${footballel.textContent.toLocaleLowerCase()}.png') lightgray 50% / cover no-repeat`
    bigtext.innerHTML = `
      <div class="sportslink">
          <h1>
              ${footballel.textContent}
          </h1>
          <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=all" >Shop All ${footballel.textContent}</a>
          <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=shoes" >Shoes</a>
          <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=gear" >Gear</a>
          <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=ball" >Balls</a>
          <div class="gap"></div>
          <a>Choosing your Gear</a>
          <a>Our ${footballel.textContent} Blog</a>
      </div>
      `
  }

  if (sportsorcasual == false) {
    document.querySelectorAll('.sliding-segmented-control .item')[0].style.color = "#fff";
    document.querySelectorAll('.sliding-segmented-control .item')[1].style.color = "#000";
    document.querySelector('.sliding-segmented-control .selected').style.setProperty('--translate', `100%`);
    document.querySelector(".section4").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), lightgray 50% / cover no-repeat`
    document.querySelector('#sports').classList.add('hidden');
    bigtext.innerHTML = `
      <div class="sportslink">
          <a href="/casual/vibes" >Vibes</a>
          <a href="/casual/featured" >Featured</a>
      </div>
      `
  }
}


// Dropdowncode


document.addEventListener('DOMContentLoaded', () => {
  const urlArray = window.location.pathname.split("/").filter(item => item !== '')
  const currentPath = urlArray.length == 1 ? urlArray[0].toLowerCase() : "";

  if (currentPath == "sports") {
    console.log(1)
    document.querySelectorAll('.sliding-segmented-control .item')[0].style.color = "#000";
    document.querySelectorAll('.sliding-segmented-control .item')[1].style.color = "#fff";
    document.querySelector('.sliding-segmented-control .selected').style.setProperty('--translate', `0%`);
    document.querySelector('#sports').classList.remove('hidden');
    document.querySelector(".section4").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url('/static/images/headers/${footballel.textContent.toLocaleLowerCase()}.png') lightgray 50% / cover no-repeat`
    bigtext.innerHTML = `
      <div class="sportslink">
          <h1>
              ${footballel.textContent}
          </h1>
          <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=all" >Shop All ${footballel.textContent}</a>
          <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=shoes" >Shoes</a>
          <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=gear" >Gear</a>
          <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=ball" >Balls</a>
          <div class="gap"></div>
          <a>Choosing your Gear</a>
          <a>Our ${footballel.textContent} Blog</a>
      </div>
      `
    sportsorcasual = true
  }

  if (currentPath == "casual") {
    console.log(2)
    document.querySelectorAll('.sliding-segmented-control .item')[0].style.color = "#fff";
    document.querySelectorAll('.sliding-segmented-control .item')[1].style.color = "#000";
    document.querySelector('.sliding-segmented-control .selected').style.setProperty('--translate', `100%`);
    document.querySelector(".section4").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), lightgray 50% / cover no-repeat`
    document.querySelector('#sports').classList.add('hidden');
    bigtext.innerHTML = `
      <div class="sportslink">
          <a href="/casual/vibes" >Vibes</a>
          <a href="/casual/featured" >Featured</a>
      </div>
      `
    console.log(3)
    sportsorcasual = false
  }

  sportsorcasualfunc()
});

sportsorcasualfunc()

document.querySelector('#home-link').addEventListener('click', (event) => {
  if (sportsorcasual) {
    window.location = "/sports/";
  } else {
    window.location = "/casual/";
  }
});



function changehomepage(sportsorcasual) {
  const urlArray = window.location.pathname.split("/").filter(item => item !== '')
  const currentPath = urlArray.length == 1 ? urlArray[0].toLowerCase() : "";

  if (urlArray.length == 1 && (currentPath == "sports" || currentPath == "casual")) {
    let section = ""

    if (sportsorcasual) {
      section = "sport"
    } else {
      section = "casual"
    }

    if (section == "sport" && currentPath == "casual") {
      fetch('/sports/')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Could not fetch /sports/. Make sure you are hosting StridingRight with LiveServer, running python -m http.server, or using stridingright.net.`);
          }
          return response.text();
        })
        .then(htmlString => {
          const html = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('main').innerHTML;
          document.querySelector('main').innerHTML = html;
          openMenuLink();

          // if (!document.startViewTransition) {
          //   document.querySelector('main').innerHTML = html;
          //   openMenuLink();
          // } else {
          //   document.startViewTransition(() => {
          //     document.querySelector('main').innerHTML = html;
          //     openMenuLink();
          //   });
          // }

          window.history.replaceState({ page: 1 }, "Sports", "/Sports/");
          openMenuLink();
        })
        .catch(error => {
          console.error(`Could not fetch /sports/. Make sure you are hosting StridingRight with LiveServer, running python -m http.server, or using stridingright.net.`, error);
        });
    }

    if (section == "casual" && currentPath == "sports") {
      fetch('/casual/')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Could not fetch /casual/. Make sure you are hosting StridingRight with LiveServer, running python -m http.server, or using stridingright.net.`);
          }
          return response.text();
        })
        .then(htmlString => {
          const html = new DOMParser().parseFromString(htmlString, 'text/html').querySelector('main').innerHTML;
          document.querySelector('main').innerHTML = html;
          openMenuLink();

          // if (!document.startViewTransition) {
          //   document.querySelector('main').innerHTML = html;
          //   openMenuLink();
          // } else {
          //   document.startViewTransition(() => {
          //     document.querySelector('main').innerHTML = html;
          //     openMenuLink();
          //   });
          // }

          window.history.replaceState({ page: 1 }, "Casual", "/casual/");
          openMenuLink();
        })
        .catch(error => {
          console.error(`Could not fetch /casual/. Make sure you are hosting StridingRight with LiveServer, running python -m http.server, or using stridingright.net.`, error);
        });
    }
  }
  openMenuLink();
}





document.querySelector('.sliding-segmented-control').addEventListener('click', (event) => {
      if (event.target == document.querySelectorAll('.sliding-segmented-control .item')[0]) {
        document.querySelectorAll('.sliding-segmented-control .item')[0].style.color = "#000";
        document.querySelectorAll('.sliding-segmented-control .item')[1].style.color = "#fff";
        document.querySelector('.sliding-segmented-control .selected').style.setProperty('--translate', `0%`);
        document.querySelector('#sports').classList.remove('hidden');
        document.querySelector(".section4").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url('/static/images/headers/${footballel.textContent.toLocaleLowerCase()}.png') lightgray 50% / cover no-repeat`
        bigtext.innerHTML = `
          <div class="sportslink">
              <h1>
                  ${footballel.textContent}
              </h1>
              <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=all" >Shop All ${footballel.textContent}</a>
              <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=shoes" >Shoes</a>
              <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=gear" >Gear</a>
              <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=ball" >Balls</a>
              <div class="gap"></div>
              <a>Choosing your Gear</a>
              <a>Our ${footballel.textContent} Blog</a>
          </div>
          `
        sportsorcasual = true;
        changehomepage(sportsorcasual);
      }

      if (event.target == document.querySelectorAll('.sliding-segmented-control .item')[1]) {
        document.querySelectorAll('.sliding-segmented-control .item')[0].style.color = "#fff";
        document.querySelectorAll('.sliding-segmented-control .item')[1].style.color = "#000";
        document.querySelector('.sliding-segmented-control .selected').style.setProperty('--translate', `100%`);
        document.querySelector(".section4").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), lightgray 50% / cover no-repeat`
        document.querySelector('#sports').classList.add('hidden');
        bigtext.innerHTML = `
          <div class="sportslink">
              <a href="/casual/vibes" >Vibes</a>
              <a href="/casual/featured" >Featured</a>
          </div>
          `
        sportsorcasual = false;
        changehomepage(sportsorcasual);
      }
});






function animate(timestamp) {

  if (cooldown > 0) {
    cooldown = cooldown - 0.01
  }

  let footballel = document.querySelector(target);

  if (target !== pretarget) {
    try {
      document.querySelector(pretarget).style.color = "#000"
      let bigtext = document.querySelector('#bigtext')

      if (cooldown > 0) {
        document.querySelector(".section4").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url('/static/images/headers/${footballel.textContent.toLocaleLowerCase()}.png') lightgray 50% / cover no-repeat`
        bigtext.innerHTML = `
          <div class="sportslink">
              <h1>
                  ${footballel.textContent}
              </h1>
              <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=all" >Shop All ${footballel.textContent}</a>
              <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=shoes" >Shoes</a>
              <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=gear" >Gear</a>
              <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=ball" >Balls</a>
              <div class="gap"></div>
              <a>Choosing your Gear</a>
              <a>Our ${footballel.textContent} Blog</a>
          </div>
          `
      } else {
        cooldown = 1
        const activeAnimation = bigtext.animate([
          { opacity: 1, transform: 'translateY(0px)' },
          { opacity: 0, transform: 'translateY(-10px)' }
        ], {
          duration: 300,
          easing: 'ease-in'
        });

        activeAnimation.onfinish = () => {
          document.querySelector(".section4").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url('/static/images/headers/${footballel.textContent.toLocaleLowerCase()}.png') lightgray 50% / cover no-repeat`
          bigtext.innerHTML = `
            <div class="sportslink">
                <h1>
                    ${footballel.textContent}
                </h1>
                <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=all" >Shop All ${footballel.textContent}</a>
                <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=shoes" >Shoes</a>
                <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=gear" >Gear</a>
                <a href="/sports/${footballel.textContent.toLocaleLowerCase()}.html?type=ball" >Balls</a>
                <div class="gap"></div>
                <a>Choosing your Gear</a>
                <a>Our ${footballel.textContent} Blog</a>
            </div>
            `

          bigtext.animate([
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0px)' }
          ], {
            duration: 300,
            easing: 'ease-out'
         }); }
      }

    } catch (error) {
      // No need to handle error; Sometimes pretarget will be empty and that's fine.
    } finally {
      pretarget = target
    }
  };

  footballel.style.color = "#fff"

  const range = document.createRange();
  range.selectNodeContents(footballel);
  const football = range.getBoundingClientRect();
  const cursor = document.querySelector('#cursor');
  const container = document.querySelector('.section3').getBoundingClientRect();

  const RightwidthDifference = football.right - document.querySelector('.section3').getBoundingClientRect().right;
  const LeftwidthDifference = document.querySelector('.section3').getBoundingClientRect().left - football.left;

  let cursorWidth = football.width

  if (football.right > document.querySelector('.section3').getBoundingClientRect().right ) {
     cursorWidth = football.width - RightwidthDifference
   };

  if (document.querySelector('.section3').getBoundingClientRect().left > football.left) {
     cursorWidth = football.width - LeftwidthDifference
   };



  cursor.style.setProperty('--target-height', `${football.height / cursor.currentCSSZoom}px`);
  cursor.style.setProperty('--target-width', `${cursorWidth / cursor.currentCSSZoom}px`);
  cursor.style.setProperty('--target-top', `${(football.top - document.querySelector('#sports').getBoundingClientRect().top) / cursor.currentCSSZoom}px`);


  if (shopDropdownopen) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);

document.querySelector('.section3').addEventListener('scroll', (event) => {
  document.querySelector('#cursor').style.setProperty('--target-left', `0px`);
  document.querySelector('#cursor').style.setProperty('--target-left', `${(document.querySelector('#sports').getBoundingClientRect().left - cursor.getBoundingClientRect().left) / cursor.currentCSSZoom}px`);
});







const sports = document.querySelectorAll('.sportslink');

sports.forEach(sport => {
  sport.id = sport.textContent.replaceAll(' ', '').toUpperCase()
  sport.addEventListener('mouseenter', (event) => {
    target = `#${sport.id}`
  });

  sport.addEventListener('click', (event) => {
    target = `#${sport.id}`
  });
});


const trigger = document.querySelector('#shop-link');
const dropdown = document.querySelector('#shop-drop-down');

let hideTimeout = null;

function openMenuLink() {
  trigger.classList.add('underline')
  clearTimeout(hideTimeout);
  dropdown.classList.remove('hidden');
  requestAnimationFrame(animate);

  if (!shopDropdownopen) {
    shopDropdownopen = true
      dropdown.animate([
        { opacity: 1, transform: 'translateY(-700px)' },
        { opacity: 1, transform: 'translateY(0px)' }],
        { duration: 150, easing: 'ease-in' }
      );
  }
}

function keepMenuopen() {
  trigger.classList.add('underline')
  clearTimeout(hideTimeout);
  dropdown.classList.remove('hidden');
  shopDropdownopen = true
  requestAnimationFrame(animate);
}

function closeMenuWithDelay() {
  trigger.classList.remove('underline')
  hideTimeout = setTimeout(() => {
    shopDropdownopen = false
    const leaveanimation = dropdown.animate([
      { opacity: 1, transform: 'translateY(0px)' },
      { opacity: 1, transform: 'translateY(-700px)' }],
      { duration: 150, easing: 'ease-out' }
    );

    leaveanimation.onfinish = () => {
      dropdown.classList.add('hidden');
    }
  }, 200);
}

trigger.addEventListener('mouseenter', openMenuLink);
trigger.addEventListener('mouseleave', closeMenuWithDelay);

dropdown.addEventListener('mouseenter', keepMenuopen);
dropdown.addEventListener('mouseleave', closeMenuWithDelay);
