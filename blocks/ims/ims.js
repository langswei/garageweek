/* eslint-disable no-console */
import { loadScript } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {

    window.adobeid = {
        client_id: 'garage-week-ims',
        scope: 'AdobeID,openid,additonal_info.ownerOrg',
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
            window.adobeIMS.signIn();
          }
        }
    };

    loadScript('https://auth-stg1.services.adobe.com/imslib/imslib.min.js');

    
    setTimeout(async () => {
      console.log(window.adobeIMS.getAccessToken());
      console.log('profile:' + JSON.stringify(window.adobeIMS.getProfile()));
      console.log('json:' + JSON.stringify(window.adobeIMS.getAccessToken()));
      console.log('tokeninfo:' + window.adobeIMS.getAccessToken().token);
      //console.log('test:' + window.adobeIMS.);

      // check for organizations
      const orgUrl = new URL('https://ims-na1-stg1.adobelogin.com/ims/organizations/v1?client_id=garage-week-ims');
      await fetch(orgUrl, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + window.adobeIMS.getAccessToken().token,
        },
      }).then((response) => {
      console.log(JSON.stringify(response));
      }).catch(() => {
        console.log('IMS check not successful.');
      });
    }, 3000);

  }
  