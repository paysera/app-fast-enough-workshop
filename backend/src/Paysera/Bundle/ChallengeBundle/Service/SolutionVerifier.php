<?php

namespace Paysera\Bundle\ChallengeBundle\Service;

use Paysera\Bundle\ChallengeBundle\Entity\Solution;
use Paysera\Bundle\ChallengeBundle\Entity\SolutionResult;
use Paysera\Bundle\ChallengeBundle\Entity\TestResult;
use Paysera\Bundle\ChallengeBundle\Service\CodeTester\CodeTesterInterface;

class SolutionVerifier
{
    private $challengeProvider;
    private $codeTester;

    public function __construct(
        ChallengeProvider $challengeProvider,
        CodeTesterInterface $codeTester
    ) {
        $this->challengeProvider = $challengeProvider;
        $this->codeTester = $codeTester;
    }

    public function verifySolution(Solution $solution)
    {
        $challenge = $this->challengeProvider->getChallenge($solution->getChallengeIdentifier());

        $result = new SolutionResult();
        foreach ($challenge->getTestCases() as $testCase) {
            $testResult = $this->codeTester->test($solution->getSolution(), $testCase);
            $result->addTestResult($testResult);
            if ($testResult->getState() === TestResult::STATE_FAILED) {
                $result->setState(SolutionResult::STATE_FAILED);
            }
        }

        return $result;
    }
}
