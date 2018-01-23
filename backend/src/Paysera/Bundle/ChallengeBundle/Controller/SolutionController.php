<?php

namespace Paysera\Bundle\ChallengeBundle\Controller;

use Doctrine\ORM\EntityManager;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Paysera\Bundle\ChallengeBundle\Entity\Solution;
use Paysera\Bundle\ChallengeBundle\Entity\SolutionResult;
use Paysera\Bundle\ChallengeBundle\Service\LeaderboardNotifier;
use Paysera\Bundle\ChallengeBundle\Service\SolutionManager;
use Paysera\Bundle\ChallengeBundle\Service\SolutionVerifier;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;

class SolutionController extends FOSRestController
{
    private $solutionVerifier;
    private $entityManager;
    private $solutionManager;
    private $leaderBoardNotifier;

    public function __construct(
        SolutionVerifier $solutionVerifier,
        EntityManager $entityManager,
        SolutionManager $solutionManager,
        LeaderboardNotifier $leaderBoardNotifier
    ) {
        $this->solutionVerifier = $solutionVerifier;
        $this->entityManager = $entityManager;
        $this->solutionManager = $solutionManager;
        $this->leaderBoardNotifier = $leaderBoardNotifier;
    }

    /**
     * @ParamConverter("solution", converter="fos_rest.request_body")
     * @Rest\Post("/solutions")
     * @param Solution $solution
     * @return Response
     */
    public function postSolutionAction(Solution $solution)
    {
        $solutionResult = $this->solutionVerifier->verifySolution($solution);

        if ($solutionResult->getState() === SolutionResult::STATE_PASSED) {
            $this->solutionManager->saveSolution($solution);
            $this->leaderBoardNotifier->notify($solution);
            $this->entityManager->flush();
        }

        $statusCode = $solutionResult->getState() === SolutionResult::STATE_PASSED
            ? Response::HTTP_OK
            : Response::HTTP_BAD_REQUEST
        ;

        return $this->handleView($this->view($solutionResult, $statusCode));
    }
}
