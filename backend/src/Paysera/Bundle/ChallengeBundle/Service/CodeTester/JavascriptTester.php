<?php

namespace Paysera\Bundle\ChallengeBundle\Service\CodeTester;

use Paysera\Bundle\ChallengeBundle\Entity\TestResult;
use Paysera\Bundle\ChallengeBundle\Entity\TestCase;

class JavascriptTester implements CodeTesterInterface
{
    public function test(string $code, TestCase $testCase): TestResult
    {
        $jsCode = sprintf(
            '
                const solution = %s;
                solution(%s);
            ',
            $code,
            implode(', ', $testCase->getArguments())
        );

        $v8 = new \V8Js();
        $result = new TestResult();

        try {
            $return = $v8->executeString($jsCode);
        } catch (\V8JsScriptException $exception) {
            return $result
                ->setState(TestResult::STATE_FAILED)
                ->setMessage($exception->getMessage())
            ;
        }

        if (sprintf('%f', $return) === sprintf('%f', $testCase->getResult())) {
            return $result
                ->setState(TestResult::STATE_PASSED)
                ->setMessage(sprintf('Test passed asserting %s is equal to %s', $testCase->getResult(), $return))
            ;
        }

        return $result
            ->setState(TestResult::STATE_FAILED)
            ->setMessage(sprintf('Test failed asserting %s is equal to %s', $testCase->getResult(), $return))
        ;
    }
}
