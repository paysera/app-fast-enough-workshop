<?php

namespace Paysera\Bundle\ChallengeBundle\Entity;

class SolutionResult
{
    const STATE_PASSED = 'passed';
    const STATE_FAILED = 'failed';

    /**
     * @var string
     */
    private $state;

    /**
     * @var TestResult[]
     */
    private $testResults;

    public function __construct()
    {
        $this->testResults = [];
        $this->state = self::STATE_PASSED;
    }

    /**
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @param string $state
     *
     * @return $this
     */
    public function setState($state)
    {
        $this->state = $state;
        return $this;
    }

    /**
     * @return TestResult[]
     */
    public function getTestResults()
    {
        return $this->testResults;
    }

    /**
     * @param TestResult[] $testResults
     *
     * @return $this
     */
    public function setTestResults(array $testResults)
    {
        $this->testResults = $testResults;
        return $this;
    }

    /**
     * @param TestResult $testResult
     * @return $this
     */
    public function addTestResult($testResult)
    {
        $this->testResults[] = $testResult;
        return $this;
    }
}
