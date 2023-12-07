/* eslint-disable no-console */
import { loadScript } from '../../scripts/aem.js';

async function showProfile(block) {
  const profile = await window.adobeIMS.getProfile();
  block.querySelector('#userinfo').innerHTML = `
    ${profile.displayName}
    <br>
    ${profile.email}
    <br>
    IMS Org Id: ${profile.ownerOrg}
  `;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {

    window.adobeid = {
        client_id: 'garage-week-ims',
        scope: 'AdobeID,openid,additional_info.ownerOrg,read_organizations',
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
            block.querySelector('#signin').classList.remove('hide');
            block.querySelector('#userinfo').classList.add('hide');
            block.querySelector('#signout').classList.add('hide');
          } else {
            showProfile(block);
            block.querySelector('#userinfo').classList.remove('hide');
            block.querySelector('#signout').classList.remove('hide');
            block.querySelector('#signin').classList.add('hide');
          }
        }
    };

    loadScript('https://auth-stg1.services.adobe.com/imslib/imslib.min.js');

    block.innerHTML = `
      Who are you?
      <div id='signin' class='hide'><a href='javascript:window.adobeIMS.signIn();'>Sign In</a></div>
      <div id='userinfo' class='hide'></div>
      <div id='signout' class='hide'><a href='javascript:window.adobeIMS.signOut();'>Sign Out</a></div>
    `;
  }
  