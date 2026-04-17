(function () {
	// 1. Configuration
	const scriptTag = document.currentScript;

	// Dynamically find the base URL (e.g., https://buildrail.com or http://localhost:3000)
	// this extracts everything before "/widget.js"
	const scriptSrc = scriptTag.src;
	const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));

	const tenantId = scriptTag.getAttribute('data-tenant-id');

	if (!tenantId) {
		console.error('BUILDRAIL Widget: Missing data-tenant-id attribute.');
		return;
	}

	// 2. Create the Styles for the floating button and iframe container
	const style = document.createElement('style');
	style.innerHTML = `
    #buildrail-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #buildrail-iframe-wrapper {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 380px;
      height: 600px;
      max-height: calc(100vh - 120px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.15);
      border-radius: 16px;
      overflow: hidden;
      display: none;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(10px);
    }
    #buildrail-iframe-wrapper.open {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }
    #buildrail-toggle-btn {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: #000;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform 0.2s ease;
    }
    #buildrail-toggle-btn:hover {
      transform: scale(1.05);
    }
    @media (max-width: 450px) {
      #buildrail-iframe-wrapper {
        width: calc(100vw - 40px);
        right: 0;
      }
    }
  `;
	document.head.appendChild(style);

	// 3. Create the HTML Structure
	const container = document.createElement('div');
	container.id = 'buildrail-widget-container';

	container.innerHTML = `
    <div id="buildrail-iframe-wrapper">
      <iframe 
        src="${baseUrl}/widget/${tenantId}" 
        style="width: 100%; height: 100%; border: none;"
        id="buildrail-widget-iframe"
      ></iframe>
    </div>
    <div id="buildrail-toggle-btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
    </div>
  `;

	document.body.appendChild(container);
	// 4. Toggle Logic
	const btn = document.getElementById('buildrail-toggle-btn');
	const wrapper = document.getElementById('buildrail-iframe-wrapper');
	let isOpen = false;

	btn.onclick = function () {
		isOpen = !isOpen;
		if (isOpen) {
			wrapper.classList.add('open');
			btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
		} else {
			wrapper.classList.remove('open');
			btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`;
		}
	};
})();
