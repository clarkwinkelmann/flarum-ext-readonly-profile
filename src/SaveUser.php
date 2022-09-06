<?php

namespace ClarkWinkelmann\ReadonlyProfile;

use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveUser
{
    public function handle(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if ($event->user->exists && array_key_exists('email', $attributes) && !$event->actor->isAdmin()) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = resolve(SettingsRepositoryInterface::class);

            if (!$settings->get('readonly-profile.disableEmailChange')) {
                return;
            }

            /**
             * @var $translator Translator
             */
            $translator = resolve(Translator::class);

            throw new ValidationException([
                'identification' => $translator->trans('clarkwinkelmann-readonly-profile.api.blocked_actions.email'),
            ]);
        }
    }
}
