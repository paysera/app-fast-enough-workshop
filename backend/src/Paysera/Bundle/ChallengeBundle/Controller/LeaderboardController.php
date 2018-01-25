<?php

namespace Paysera\Bundle\ChallengeBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Response;

class LeaderboardController extends FOSRestController
{
    /**
     * @Rest\Get("/leaderboard")
     * @return Response
     */
    public function getLeaderboardAction()
    {
        //TODO: get leaderboards
    }
}
