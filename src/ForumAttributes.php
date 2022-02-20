<?php

namespace ClarkWinkelmann\ReadonlyProfile;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer): array
    {
        $attributes = [];

        foreach ([
                     'disableLogin',
                     'disableEmailChange',
                     'disablePasswordChange',
                     'disableAvatarEdit',
                 ] as $setting) {
            $key = "readonly-profile.$setting";

            if ($this->settings->get($key)) {
                // Admins can still edit all avatars
                if ($setting === 'disableAvatarEdit' && $serializer->getActor()->isAdmin()) {
                    continue;
                }

                $attributes[$key] = 1;
            }
        }

        return $attributes;
    }
}
