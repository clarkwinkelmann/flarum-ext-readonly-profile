# Readonly profile

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/clarkwinkelmann/flarum-ext-readonly-profile/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/clarkwinkelmann/flarum-ext-readonly-profile.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-readonly-profile) [![Total Downloads](https://img.shields.io/packagist/dt/clarkwinkelmann/flarum-ext-readonly-profile.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-readonly-profile) [![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/clarkwinkelmann)

This extension removes the ability for users to perform various actions on the forum.
It removes both the UI controls and disables the underlying REST API endpoints.

This is intended for forums where administrators are the only person editing user profiles or to be used in custom integrations where the data is synced from a different platform.

Available options:

- **Disable Login**: disable regular login endpoint, but preserve ability to create access tokens. Sessions can still be started through the use of manually created remember tokens.
- **Disable Access Token Creation**: completely disables ability to create regular and remember access tokens. This makes it impossible to start new sessions. **Disable Login** is implicit with this option. API keys are not affected.
- **Disable Email Change**: disables regular email change requests. Admins can still edit other users.
- **Disable Password Change and Reset**: disables regular password edit. Admins can still set a password on other users.
- **Disable Avatar Edit**: disables avatar upload and removal. Admins can still use the endpoint.

If you enable **Disable Login** or **Disable Access Token Creation** you will lock yourself out of the forum if no other login/authentication system is in place.
To recover access to the forum in case of an issue you need to either:

- Use an API Key to disable the settings or extension through the REST API.
- Disable the setting or extension by manually editing the database.
- Removing the Composer package.

If you use an external login system and have set a random password on Flarum user accounts, **Disable Login**, **Disable Access Token Creation** and **Disable Email Change** aren't strictly needed because users cannot use these endpoints without knowing the Flarum user password anyway.
You could just hide the buttons from the UI with CSS and it would be enough.

## Installation

    composer require clarkwinkelmann/flarum-ext-readonly-profile

## Support

This extension is under **minimal maintenance**.

It was developed for a client and released as open-source for the benefit of the community.
I might publish simple bugfixes or compatibility updates for free.

You can [contact me](https://clarkwinkelmann.com/flarum) to sponsor additional features or updates.

Support is offered on a "best effort" basis through the Flarum community thread.

**Sponsors**: Dater.com

## Links

- [GitHub](https://github.com/clarkwinkelmann/flarum-ext-readonly-profile)
- [Packagist](https://packagist.org/packages/clarkwinkelmann/flarum-ext-readonly-profile)
- [Discuss](https://discuss.flarum.org/d/30633)
