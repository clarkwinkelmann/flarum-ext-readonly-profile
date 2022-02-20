<?php

namespace ClarkWinkelmann\ReadonlyProfile;

use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ForumMiddleware extends AbstractMiddleware
{
    protected function route(string $routeName, ServerRequestInterface $request): ?ResponseInterface
    {
        switch ($routeName) {
            case 'login':
                if ($this->getSettings()->get('readonly-profile.disableLogin')) {
                    // We can't throw a ValidationException because the forum frontend cannot format those responses to JSON
                    return new JsonResponse([
                        'errors' => [
                            [
                                'status' => 422,
                                'code' => 'validation_error',
                                'detail' => $this->getTranslator()->trans('clarkwinkelmann-readonly-profile.api.blocked_actions.login'),
                                'source' => [
                                    'pointer' => 'data/attributes/identification'
                                ],
                            ],
                        ],
                    ], 422);
                }
                break;
        }

        return null;
    }
}
