// Menu items array
const menuItems = [
    { text: "Home", link: "#home" },
    { text: "Videos", link: "#videos" },
    { text: "Services", link: "#services" },
    { text: "Products", link: "#products" },
    { text: "Contact", link: "#contact" },
];

// Video Links
const videoLinks = [
    "https://www.youtube.com/embed/erEgovG9WBs",
    "https://www.youtube.com/embed/Sxxw3qtb3_g",
    "https://www.youtube.com/embed/eesqK59rhGA",
    "https://www.youtube.com/embed/CX_HyY3kbZw",
    "https://www.youtube.com/embed/ylbQrYhfa18",
    "https://www.youtube.com/embed/vpYct2npKD8"
];

// Service Data
const services = [
    { icon: "🌐", title: "Web Development" },
    { icon: "📱", title: "Mobile Development" },
    { icon: "🎨", title: "Graphic Design" },
    { icon: "🛠️", title: "Technical Support" }
];

// Product Data
const products = [
    { icon: "💻", title: "Laptop" },
    { icon: "📷", title: "Camera" },
    { icon: "🖨️", title: "Printer" },
    { icon: "📟", title: "Scanner" }
];

// Populate Navbar
const navBar = document.getElementById('nav-bar');
menuItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.link;
    link.textContent = item.text;
    navBar.appendChild(link);
});

// Add YouTube video cards
const videoContainer = document.getElementById('video-container');
videoLinks.forEach((link, index) => {
  const videoCard = document.createElement('div');
  videoCard.className = 'video-card';
  
  // Extract video ID from the URL
  const videoId = link.split('/').pop();
  
  videoCard.innerHTML = `
      <div id="player-${index}"></div>
      <button class="play-btn" onclick="togglePlay(${index})">Play</button>
  `;
  videoContainer.appendChild(videoCard);
});

// Add Service cards
const serviceContainer = document.getElementById('service-container');
services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.innerHTML = `<i>${service.icon}</i><h3>${service.title}</h3>`;
    serviceContainer.appendChild(serviceCard);
});

// Add Product cards
const productContainer = document.getElementById('product-container');
products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `<i>${product.icon}</i><h3>${product.title}</h3>`;
    productContainer.appendChild(productCard);
});

// YouTube Player API setup
let players = [];

// Initialize YouTube API when ready
function onYouTubeIframeAPIReady() {
  videoLinks.forEach((link, index) => {
    const videoId = link.split('/').pop();
    players[index] = new YT.Player(`player-${index}`, {
      height: '200',
      width: '100%',
      videoId: videoId,
      playerVars: {
        'playsinline': 1,
        'enablejsapi': 1
      }
    });
  });
}

// Toggle play/pause functionality
function togglePlay(index) {
  const player = players[index];
  const button = document.querySelector(`#player-${index}`).parentElement.querySelector('.play-btn');
  
  if (player && player.getPlayerState) {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      button.textContent = 'Play';
    } else {
      player.playVideo();
      button.textContent = 'Pause';
    }
  }
}


// Smooth scroll effect for nav links
document.querySelectorAll('#nav-bar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
