<?php

namespace ClarkWinkelmann\ReadonlyProfile;

use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ApiMiddleware extends AbstractMiddleware
{
    protected function route(string $routeName, ServerRequestInterface $request): ?ResponseInterface
    {
        switch ($routeName) {
            // For avatar edit, we can't hook into the policy because the isSameUser check is hard-coded in the command handler
            case 'users.avatar.upload':
            case 'users.avatar.delete':
                if (!RequestUtil::getActor($request)->isAdmin() && $this->getSettings()->get('readonly-profile.disableAvatarEdit')) {
                    throw new ValidationException([
                        'avatar' => $this->getTranslator()->trans('clarkwinkelmann-readonly-profile.api.blocked_actions.avatar'),
                    ]);
                }
                break;
            case 'token':
                if ($this->getSettings()->get('readonly-profile.disableAccessTokens')) {
                    throw new ValidationException([
                        'identification' => $this->getTranslator()->trans('clarkwinkelmann-readonly-profile.api.blocked_actions.accessToken'),
                    ]);
                }
                break;
            case 'forgot':
                if ($this->getSettings()->get('readonly-profile.disablePasswordChange')) {
                    throw new ValidationException([
                        'identification' => $this->getTranslator()->trans('clarkwinkelmann-readonly-profile.api.blocked_actions.password'),
                    ]);
                }
                break;
        }

        return null;
    }
}
