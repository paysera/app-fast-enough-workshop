<?php

namespace Paysera\Bundle\ChallengeBundle\Entity;

class TestCase
{
    /**
     * @var string[]
     */
    private $arguments;

    /**
     * @var string
     */
    private $result;

    /**
     * @return string[]
     */
    public function getArguments()
    {
        return $this->arguments;
    }

    /**
     * @param string[] $arguments
     *
     * @return $this
     */
    public function setArguments($arguments)
    {
        $this->arguments = $arguments;
        return $this;
    }

    /**
     * @return string
     */
    public function getResult()
    {
        return $this->result;
    }

    /**
     * @param string $result
     *
     * @return $this
     */
    public function setResult($result)
    {
        $this->result = $result;
        return $this;
    }
}
