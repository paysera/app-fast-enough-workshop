<?php

namespace Paysera\Bundle\ChallengeBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Paysera\Bundle\ChallengeBundle\Entity\Solution;

class SolutionRepository extends EntityRepository
{
    /**
     * @param string $challengeIdentifier
     * @param string $userId
     * @return Solution|null
     */
    public function findByChallengeAndUser($challengeIdentifier, $userId)
    {
        return $this->createQueryBuilder('s')
            ->where('s.challengeIdentifier = :challenge_identifier')
            ->andWhere('s.userId = :user_id')
            ->setParameters([
                'challenge_identifier' => $challengeIdentifier,
                'user_id' => $userId,
            ])
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
