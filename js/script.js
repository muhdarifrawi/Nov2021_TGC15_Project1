let navLink = document.getElementsByClassName("nav-link");

window.addEventListener('load', (event) => {
    console.log('script triggered');
    document.getElementsByClassName("nav-link")[0].classList.add("active");
    
    for (let i = 0; i < navLink.length; i++) {
        navLink[i].addEventListener('click', toggleActiveNav);
    }
  });


function toggleActiveNav(){
    for (let i = 0; i < navLink.length; i++) {
        navLink[i].classList.remove("active");
    }
    this.classList.add("active")
}