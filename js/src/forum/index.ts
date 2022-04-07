import {Child} from 'mithril';
import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import UserCard from 'flarum/forum/components/UserCard';
import LogInModal from 'flarum/forum/components/LogInModal';
import IndexPage from 'flarum/forum/components/IndexPage';
import PostStream from 'flarum/forum/components/PostStream';
import CommentPost from 'flarum/forum/components/CommentPost';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';

app.initializers.add('readonly-profile', () => {
    extend(HeaderSecondary.prototype, 'items', function (items) {
        if (app.forum.attribute('readonly-profile.disableLogin')) {
            items.remove('logIn');
        }
    });

    extend(IndexPage.prototype, 'sidebarItems', function (items) {
        if (
            !app.forum.attribute('readonly-profile.disableLogin') ||
            !items.has('newDiscussion') ||
            app.session.user
        ) {
            return;
        }

        const newDiscussionVdom = items.get('newDiscussion');

        // Force "new discussion" button to show "can't start discussion" for guests
        // because the default behaviour was to open the login modal which is no longer available
        newDiscussionVdom.attrs.disabled = true;
        newDiscussionVdom.children = app.translator.trans('core.forum.index.cannot_start_discussion_button');
    });

    extend(PostStream.prototype, 'view', function (vdom) {
        if (!vdom || !Array.isArray(vdom.children)) {
            // If the data format is unexpected, skip this feature
            return;
        }

        if (!app.forum.attribute('readonly-profile.disableLogin') || app.session.user) {
            // If we are not disabling login or if the user is already logged in, skip
            return;
        }

        // Remove the .PostStream-item containing ReplyPlaceholder
        const index = (vdom.children as Child[]).findIndex(item => item && typeof item === 'object' && item.attrs && item.attrs.key === 'reply');

        if (index !== -1) {
            vdom.children.splice(index, 1);
        }
    });

    extend(DiscussionControls, 'userControls', function (items) {
        if (
            !app.forum.attribute('readonly-profile.disableLogin') ||
            !items.has('reply') ||
            app.session.user
        ) {
            return;
        }

        const replyVdom = items.get('reply');

        // Keep the original button that says login to reply, but disable it
        replyVdom.attrs.disabled = true;
    });

    // Remove reply link for guests if login is disabled (it would bring up the login modal)
    extend(CommentPost.prototype, 'actionItems', function (items) {
        if (
            !app.forum.attribute('readonly-profile.disableLogin') ||
            !items.has('reply') ||
            app.session.user
        ) {
            return;
        }

        items.remove('reply');
    });

    const PostQuoteButton = flarum.core.compat['mentions/forum/fragments/PostQuoteButton'];

    // Because we can't easily remove the quote button for guests, we'll keep it but make it disabled state
    if (PostQuoteButton) {
        extend(PostQuoteButton.prototype, 'view', function (vdom) {
            if (
                !app.forum.attribute('readonly-profile.disableLogin') ||
                app.session.user
            ) {
                return;
            }

            // If the data format is unexpected, skip this feature
            if (!vdom || !vdom.attrs) {
                return;
            }

            // Disable quote button
            vdom.attrs.disabled = true;
        });
    }

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
