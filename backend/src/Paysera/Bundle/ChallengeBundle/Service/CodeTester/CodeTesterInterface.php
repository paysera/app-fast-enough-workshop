<?php

namespace Paysera\Bundle\ChallengeBundle\Service\CodeTester;

use Paysera\Bundle\ChallengeBundle\Entity\TestResult;
use Paysera\Bundle\ChallengeBundle\Entity\TestCase;

interface CodeTesterInterface
{
    public function test(string $code, TestCase $testCase): TestResult;
}
