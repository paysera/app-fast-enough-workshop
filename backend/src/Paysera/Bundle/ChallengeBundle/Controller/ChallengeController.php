<?php

namespace Paysera\Bundle\ChallengeBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Paysera\Bundle\ChallengeBundle\Service\ChallengeProvider;
use Symfony\Component\HttpFoundation\Response;

class ChallengeController extends FOSRestController
{
    private $challengeProvider;

    public function __construct(ChallengeProvider $challengeProvider)
    {
        $this->challengeProvider = $challengeProvider;
    }

    /**
     * @Rest\Get("/challenges")
     * @return Response
     */
    public function getChallengesAction()
    {
        return $this->handleView($this->view($this->challengeProvider->getChallenges()));
    }
}
