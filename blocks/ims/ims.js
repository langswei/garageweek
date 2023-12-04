/* eslint-disable no-console */
// import { readBlockConfig } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
    // const cfg = readBlockConfig(block);
    block.innerHTML = '';
  
    // check for authentication
    const preview = new URL('https://admin.hlx.page/auth/adobe');
    await fetch(preview, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      console.log(JSON.stringify(response));
    }).catch(() => {
      console.log('IMS check not successful.');
    });
  

  }
  