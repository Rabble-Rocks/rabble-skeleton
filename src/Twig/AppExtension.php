<?php

namespace App\Twig;

use Symfony\Component\Routing\RequestContextAwareInterface;
use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

class AppExtension extends AbstractExtension implements GlobalsInterface
{
    private RequestContextAwareInterface $contextAware;

    public function __construct(RequestContextAwareInterface $contextAware)
    {
        $this->contextAware = $contextAware;
    }

    public function getGlobals(): array
    {
        return [
            'context' => $this->contextAware->getContext(),
        ];
    }
}
