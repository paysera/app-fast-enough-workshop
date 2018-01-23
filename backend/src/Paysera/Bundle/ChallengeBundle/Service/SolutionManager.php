<?php

namespace Paysera\Bundle\ChallengeBundle\Service;

use Doctrine\ORM\EntityManager;
use Paysera\Bundle\ChallengeBundle\Entity\Solution;
use Paysera\Bundle\ChallengeBundle\Repository\SolutionRepository;

class SolutionManager
{
    private $solutionRepository;
    private $entityManager;

    public function __construct(
        SolutionRepository $solutionRepository,
        EntityManager $entityManager
    ) {
        $this->solutionRepository = $solutionRepository;
        $this->entityManager = $entityManager;
    }

    public function saveSolution(Solution $solution)
    {
        $existingSolution = $this->solutionRepository->findByChallengeAndUser(
            $solution->getChallengeIdentifier(),
            $solution->getUserId()
        );

        if ($existingSolution !== null) {
            $this->entityManager->remove($existingSolution);
        }

        $solution->setDateCreated(new \DateTime());
        $this->entityManager->persist($solution);
    }
}
