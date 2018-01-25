<?php

namespace Paysera\Bundle\ChallengeBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Paysera\Bundle\ChallengeBundle\Entity\LeaderboardEntry;
use Paysera\Bundle\ChallengeBundle\Entity\Solution;
use Paysera\Bundle\ChallengeBundle\Repository\SolutionRepository;
use Symfony\Component\HttpFoundation\Response;

class LeaderboardController extends FOSRestController
{

    private $solutionRepository;

    public function __construct(SolutionRepository $solutionRepository)
    {
        $this->solutionRepository = $solutionRepository;
    }

    /**
     * @Rest\Get("/leaderboard")
     * @return Response
     */
    public function getLeaderboardAction()
    {
        $leaderboard = array_map(
            function(Solution $solution) {
                return (new LeaderboardEntry())
                    ->setUser($solution->getUserId())
                    ->setChallenge($solution->getChallengeIdentifier())
                    ->setDuration($solution->getDuration())
                ;
            },
            $this->solutionRepository->findAllOrdered()
        );
        return $this->handleView($this->view($leaderboard));
    }
}
