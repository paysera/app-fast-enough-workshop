<?php

namespace Paysera\Bundle\ChallengeBundle\Entity;

class TestResult
{
    const STATE_PASSED = 'passed';
    const STATE_FAILED = 'failed';

    /**
     * @var string
     */
    private $state;

    /**
     * @var string
     */
    private $message;

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
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param string $message
     *
     * @return $this
     */
    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }
}
