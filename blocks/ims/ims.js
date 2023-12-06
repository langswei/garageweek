/* eslint-disable no-console */
import { loadScript } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {

    window.adobeid = {
        client_id: 'garage-week-ims',
        scope: 'AdobeID,openid',
        locale: 'en_US',
        environment: 'stg1',
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
          if (!window.adobeIMS.isSignedInUser()) {
            //window.adobeIMS.signIn();
          }
        }
    };

    loadScript('https://auth-stg1.services.adobe.com/imslib/imslib.min.js');

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

    setTimeout(async () => {
      console.log(window.adobeIMS.getAccessToken());
      console.log('json:' + JSON.stringify(window.adobeIMS.getAccessToken()));
      console.log('tokeninfo:' + window.adobeIMS.getAccessToken().token);
      //console.log('test:' + window.adobeIMS.);

      // check for organizations
      /* */
      const orgUrly = new URL('https://ims-na1-stg1.adobelogin.com/ims/organizations/v1');
      await fetch(orgUrly, {
        method: 'GET',
        headers: {
          'Host': 'ims-na1-stg1.adobelogin.com',
          Accept: '*/*',
          'Authorization': 'Bearer ' + window.adobeIMS.getAccessToken().token,
        },
      }).then((response) => {
      console.log(JSON.stringify(response));
      }).catch(() => {
        console.log('IMS check not successful.');
      });
      /* */
    }, 3000);

  }
  