<?php

namespace ClarkWinkelmann\ReadonlyProfile;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\User\Event\Saving;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Middleware('forum'))
        ->add(ForumMiddleware::class),
    (new Extend\Middleware('api'))
        ->add(ApiMiddleware::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    (new Extend\Event())
        ->listen(Saving::class, SaveUser::class),
];
