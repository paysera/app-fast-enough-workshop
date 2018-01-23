<?php

namespace Paysera\Bundle\ChallengeBundle\Service;

use Paysera\Bundle\ChallengeBundle\Entity\Challenge;
use Paysera\Bundle\ChallengeBundle\Entity\TestCase;

class ChallengeProvider
{
    private $challenges;

    public function __construct(array $challenges)
    {
        $this->challenges = $challenges;
    }

    /**
     * @return Challenge[]
     */
    public function getChallenges()
    {
        $challenges = [];

        foreach ($this->challenges as $challengeData) {
            $challenge = new Challenge();
            $challenge
                ->setIdentifier($challengeData['identifier'])
                ->setDescription($challengeData['description'])
            ;
            foreach ($challengeData['test_cases'] as $testCaseData) {
                $testCase = new TestCase();
                $testCase
                    ->setResult($testCaseData['result'])
                    ->setArguments($testCaseData['arguments'])
                ;
                $challenge->addTestCase($testCase);
            }

            $challenges[] = $challenge;
        }

        return $challenges;
    }

    public function getChallenge(string $identifier)
    {
        foreach ($this->getChallenges() as $challenge) {
            if ($challenge->getIdentifier() === $identifier) {
                return $challenge;
            }
        }

        return null;
    }
}
