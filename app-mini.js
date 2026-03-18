// Minimal working app
console.log('[APP] Starting');

let currentLang = 'en';
let currentPage = 'home';

// Minimal translation function
function t(en, zh) {
  return currentLang === 'zh' ? zh : en;
}

// Minimal home page renderer
function renderHome() {
  console.log('[APP] renderHome called');
  return `
    <section class="hero" style="padding: 100px 32px; text-align: center;">
      <h1 style="font-size: 48px; margin-bottom: 20px; background: linear-gradient(135deg, #0057FF 0%, #60A5FA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        The Fastest Programmatic Advertising Platform
      </h1>
      <p style="font-size: 18px; color: #999; margin-bottom: 30px;">
        Proven to increase ROAS by 3.2x | Real-time bidding at scale
      </p>
      <div style="display: flex; gap: 20px; justify-content: center; margin-bottom: 40px;">
        <button onclick="alert('Contact')" style="padding: 12px 32px; background: #0057FF; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">Get Started Free</button>
        <button onclick="alert('Products')" style="padding: 12px 32px; background: none; border: 1px solid #0057FF; color: #0057FF; border-radius: 8px; font-size: 16px; cursor: pointer;">Explore Platforms</button>
      </div>
      <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
        <span style="padding: 8px 16px; background: rgba(0, 87, 255, 0.1); border: 1px solid rgba(0, 87, 255, 0.2); border-radius: 20px; font-size: 14px;">✓ 150+ Countries</span>
        <span style="padding: 8px 16px; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); border-radius: 20px; font-size: 14px; color: #34D399;">✓ 50B+ Daily Auctions</span>
        <span style="padding: 8px 16px; background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.2); border-radius: 20px; font-size: 14px; color: #C084FC;">✓ 50K+ Active Advertisers</span>
      </div>
    </section>

    <section style="padding: 80px 32px; background: #0F1629;">
      <div style="max-width: 1280px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px;">
          <div style="text-align: center;">
            <div style="font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #0057FF 0%, #60A5FA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">$12B+</div>
            <div style="margin-top: 12px; color: #999;">Annual Ad Spend Managed</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #0057FF 0%, #60A5FA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">50B+</div>
            <div style="margin-top: 12px; color: #999;">Daily Bid Requests</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #0057FF 0%, #60A5FA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">150+</div>
            <div style="margin-top: 12px; color: #999;">Countries & Territories</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #0057FF 0%, #60A5FA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">99.98%</div>
            <div style="margin-top: 12px; color: #999;">Platform Uptime SLA</div>
          </div>
        </div>
      </div>
    </section>

    <section style="padding: 80px 32px;">
      <div style="max-width: 1280px; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 36px; margin-bottom: 40px;">Our Platforms</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;">
          <div style="padding: 32px; background: #0F1629; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;">
            <h3 style="font-size: 24px; margin-bottom: 16px; color: #60A5FA;">NexBids DSP</h3>
            <p style="color: #999; margin-bottom: 20px;">AI-powered Demand-Side Platform for performance optimization</p>
            <button onclick="alert('DSP')" style="padding: 10px 24px; background: #0057FF; color: white; border: none; border-radius: 6px; cursor: pointer;">Learn More</button>
          </div>
          <div style="padding: 32px; background: #0F1629; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;">
            <h3 style="font-size: 24px; margin-bottom: 16px; color: #60A5FA;">NexBids ADX</h3>
            <p style="color: #999; margin-bottom: 20px;">High-performance ad exchange connecting premium supply & demand</p>
            <button onclick="alert('ADX')" style="padding: 10px 24px; background: #0057FF; color: white; border: none; border-radius: 6px; cursor: pointer;">Learn More</button>
          </div>
          <div style="padding: 32px; background: #0F1629; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;">
            <h3 style="font-size: 24px; margin-bottom: 16px; color: #60A5FA;">NexBids SSP</h3>
            <p style="color: #999; margin-bottom: 20px;">Supply-Side Platform for publishers to maximize revenue</p>
            <button onclick="alert('SSP')" style="padding: 10px 24px; background: #0057FF; color: white; border: none; border-radius: 6px; cursor: pointer;">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Minimal navigation builder
function buildNav() {
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
    navMenu.innerHTML = `
      <button onclick="navigate('home')" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">Home</button>
      <button onclick="alert('Solutions')" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">Solutions</button>
      <button onclick="alert('Products')" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">Products</button>
      <button onclick="alert('Technology')" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">Technology</button>
      <button onclick="alert('Resources')" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">Resources</button>
    `;
  }
}

// Minimal footer builder
function buildFooter() {
  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <div style="max-width: 1280px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; margin-bottom: 40px;">
          <div>
            <h4 style="margin-bottom: 12px; font-weight: 700;">Solutions</h4>
            <ul style="list-style: none;">
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">For Advertisers</a></li>
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">For Publishers</a></li>
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">For Agencies</a></li>
            </ul>
          </div>
          <div>
            <h4 style="margin-bottom: 12px; font-weight: 700;">Products</h4>
            <ul style="list-style: none;">
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">NexBids DSP</a></li>
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">NexBids ADX</a></li>
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">NexBids SSP</a></li>
            </ul>
          </div>
          <div>
            <h4 style="margin-bottom: 12px; font-weight: 700;">Company</h4>
            <ul style="list-style: none;">
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">About</a></li>
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">Careers</a></li>
              <li><a style="color: #999; text-decoration: none; cursor: pointer;">Contact</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center; color: #666;">
          <p>&copy; 2025 NexBids Inc. All rights reserved.</p>
        </div>
      </div>
    `;
  }
}

// Render function
function renderPage(page) {
  console.log('[APP] renderPage:', page);
  const container = document.getElementById('pageContainer');
  if (container) {
    const html = renderHome();
    container.innerHTML = html;
    console.log('[APP] Page rendered successfully');
  }
}

// Navigate function
function navigate(page) {
  console.log('[APP] navigate:', page);
  currentPage = page;
  renderPage(page);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('[APP] DOMContentLoaded');
  buildNav();
  buildFooter();
  renderPage('home');
  console.log('[APP] Initialization complete');
});

console.log('[APP] Script loaded');
