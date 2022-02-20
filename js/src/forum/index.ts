import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import UserCard from 'flarum/forum/components/UserCard';
import LogInModal from 'flarum/forum/components/LogInModal';

app.initializers.add('readonly-profile', () => {
    extend(HeaderSecondary.prototype, 'items', function (items) {
        if (app.forum.attribute('readonly-profile.disableLogin')) {
            items.remove('logIn');
        }
    });

    extend(SettingsPage.prototype, 'accountItems', function (items) {
        if (app.forum.attribute('readonly-profile.disableEmailChange')) {
            items.remove('changeEmail');
        }
        if (app.forum.attribute('readonly-profile.disablePasswordChange')) {
            items.remove('changePassword');
        }
    });

    extend(UserCard, 'initAttrs', function (returnValue, attrs: any) {
        if (app.forum.attribute('readonly-profile.disableAvatarEdit')) {
            attrs.editable = false;
        }
    });

    extend(LogInModal.prototype, 'footer', function (vdom) {
        if (!app.forum.attribute('readonly-profile.disablePasswordChange')) {
            return;
        }

        // Remove forgot password link
        if (
            Array.isArray(vdom) &&
            vdom.length &&
            vdom[0] &&
            vdom[0].attrs &&
            vdom[0].attrs.className === 'LogInModal-forgotPassword'
        ) {
            vdom.splice(0, 1);
        }
    });
});
