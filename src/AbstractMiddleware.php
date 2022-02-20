<?php

namespace ClarkWinkelmann\ReadonlyProfile;

use Flarum\Locale\Translator;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

abstract class AbstractMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $return = $this->route($request->getAttribute('routeName') ?: '', $request);

        if ($return) {
            return $return;
        }

        return $handler->handle($request);
    }

    abstract protected function route(string $routeName, ServerRequestInterface $request): ?ResponseInterface;

    protected function getSettings(): SettingsRepositoryInterface
    {
        return resolve(SettingsRepositoryInterface::class);
    }

    protected function getTranslator(): Translator
    {
        return resolve(Translator::class);
    }
}
