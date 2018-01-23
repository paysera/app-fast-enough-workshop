<?php

namespace Paysera\Bundle\ChallengeBundle\Entity;

class Challenge
{
    /**
     * @var string
     */
    private $identifier;

    /**
     * @var string
     */
    private $description;

    /**
     * @var TestCase[]
     */
    private $testCases;

    public function __construct()
    {
        $this->testCases = [];
    }

    /**
     * @return string
     */
    public function getIdentifier()
    {
        return $this->identifier;
    }

    /**
     * @param string $identifier
     *
     * @return $this
     */
    public function setIdentifier($identifier)
    {
        $this->identifier = $identifier;
        return $this;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     *
     * @return $this
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return TestCase[]
     */
    public function getTestCases()
    {
        return $this->testCases;
    }

    /**
     * @param TestCase[] $testCases
     *
     * @return $this
     */
    public function setTestCases($testCases)
    {
        $this->testCases = $testCases;
        return $this;
    }

    /**
     * @param TestCase $testCase
     * @return $this
     */
    public function addTestCase($testCase)
    {
        $this->testCases[] = $testCase;
        return $this;
    }
}
