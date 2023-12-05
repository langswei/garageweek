/* eslint-disable no-console */
import { loadScript } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {

    window.adobeid = {
        client_id: '43a4b082e5b84422b0e5166871697ca4',
        scope: 'AdobeID,openid',
        locale: 'en_US',
        environment: 'prod',
        useLocalStorage: false,
        autoValidateToken: true,
        onAccessToken: function (tokenInformation) {
        },
        onReauthAccessToken: function (reauthTokenInformation) {
        },
        onError: function (error) {
        },
        onAccessTokenHasExpired: function() {
        },
        onReady: function(appState) {

        },
        api_parameters: {
          grant_type: 'authorization_code',
        }
    };

    loadScript('https://auth.services.adobe.com/imslib/imslib.min.js');

    /*
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
    */

  }
  