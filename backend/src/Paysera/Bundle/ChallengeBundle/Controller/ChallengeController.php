<?php

namespace Paysera\Bundle\ChallengeBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Response;

class ChallengeController extends FOSRestController
{
    /**
     * @Rest\Get("/challenges")
     * @return Response
     */
    public function getChallengesAction()
    {
        //TODO: return Challenges
    }
}
