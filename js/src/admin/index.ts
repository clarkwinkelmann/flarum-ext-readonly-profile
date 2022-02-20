import app from 'flarum/admin/app';

app.initializers.add('readonly-profile', () => {
    app.extensionData
        .for('clarkwinkelmann-readonly-profile')
        .registerSetting({
            setting: 'readonly-profile.disableLogin',
            type: 'boolean',
            label: app.translator.trans('clarkwinkelmann-readonly-profile.admin.settings.disableLogin'),
        })
        .registerSetting({
            setting: 'readonly-profile.disableAccessTokens',
            type: 'boolean',
            label: app.translator.trans('clarkwinkelmann-readonly-profile.admin.settings.disableAccessTokens'),
        })
        .registerSetting({
            setting: 'readonly-profile.disableEmailChange',
            type: 'boolean',
            label: app.translator.trans('clarkwinkelmann-readonly-profile.admin.settings.disableEmailChange'),
        })
        .registerSetting({
            setting: 'readonly-profile.disablePasswordChange',
            type: 'boolean',
            label: app.translator.trans('clarkwinkelmann-readonly-profile.admin.settings.disablePasswordChange'),
        })
        .registerSetting({
            setting: 'readonly-profile.disableAvatarEdit',
            type: 'boolean',
            label: app.translator.trans('clarkwinkelmann-readonly-profile.admin.settings.disableAvatarEdit'),
        });
});
