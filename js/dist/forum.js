(()=>{var e={n:o=>{var r=o&&o.__esModule?()=>o.default:()=>o;return e.d(r,{a:r}),r},d:(o,r)=>{for(var t in r)e.o(r,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:r[t]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};(()=>{"use strict";e.r(o);const r=flarum.core.compat["forum/app"];var t=e.n(r);const n=flarum.core.compat["common/extend"],a=flarum.core.compat["forum/components/SettingsPage"];var s=e.n(a);const i=flarum.core.compat["forum/components/HeaderSecondary"];var l=e.n(i);const c=flarum.core.compat["forum/components/UserCard"];var u=e.n(c);const d=flarum.core.compat["forum/components/LogInModal"];var m=e.n(d);const f=flarum.core.compat["forum/components/IndexPage"];var p=e.n(f);const y=flarum.core.compat["forum/components/PostStream"];var b=e.n(y);const g=flarum.core.compat["forum/utils/DiscussionControls"];var v=e.n(g);t().initializers.add("readonly-profile",(function(){(0,n.extend)(l().prototype,"items",(function(e){t().forum.attribute("readonly-profile.disableLogin")&&e.remove("logIn")})),(0,n.extend)(p().prototype,"sidebarItems",(function(e){if(t().forum.attribute("readonly-profile.disableLogin")&&e.has("newDiscussion")&&!t().session.user){var o=e.get("newDiscussion");o.attrs.disabled=!0,o.children=t().translator.trans("core.forum.index.cannot_start_discussion_button")}})),(0,n.extend)(b().prototype,"view",(function(e){if(e&&Array.isArray(e.children)&&t().forum.attribute("readonly-profile.disableLogin")&&!t().session.user){var o=e.children.findIndex((function(e){return e&&"object"==typeof e&&e.attrs&&"reply"===e.attrs.key}));-1!==o&&e.children.splice(o,1)}})),(0,n.extend)(v(),"userControls",(function(e){t().forum.attribute("readonly-profile.disableLogin")&&e.has("reply")&&!t().session.user&&(e.get("reply").attrs.disabled=!0)})),(0,n.extend)(s().prototype,"accountItems",(function(e){t().forum.attribute("readonly-profile.disableEmailChange")&&e.remove("changeEmail"),t().forum.attribute("readonly-profile.disablePasswordChange")&&e.remove("changePassword")})),(0,n.extend)(u(),"initAttrs",(function(e,o){t().forum.attribute("readonly-profile.disableAvatarEdit")&&(o.editable=!1)})),(0,n.extend)(m().prototype,"footer",(function(e){t().forum.attribute("readonly-profile.disablePasswordChange")&&Array.isArray(e)&&e.length&&e[0]&&e[0].attrs&&"LogInModal-forgotPassword"===e[0].attrs.className&&e.splice(0,1)}))}))})(),module.exports=o})();
//# sourceMappingURL=forum.js.map