<?php

namespace Paysera\Bundle\ChallengeBundle\Entity;

class Solution
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $challengeIdentifier;

    /**
     * @var string
     */
    private $solution;

    /**
     * @var string
     */
    private $userId;

    /**
     * @var float
     */
    private $duration;

    /**
     * @var \DateTime
     */
    private $dateCreated;

    public function __construct()
    {
        $this->dateCreated = new \DateTime();
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getChallengeIdentifier()
    {
        return $this->challengeIdentifier;
    }

    /**
     * @param string $challengeIdentifier
     *
     * @return $this
     */
    public function setChallengeIdentifier($challengeIdentifier)
    {
        $this->challengeIdentifier = $challengeIdentifier;
        return $this;
    }

    /**
     * @return string
     */
    public function getSolution()
    {
        return $this->solution;
    }

    /**
     * @param string $solution
     *
     * @return $this
     */
    public function setSolution($solution)
    {
        $this->solution = $solution;
        return $this;
    }

    /**
     * @return string
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * @param string $userId
     *
     * @return $this
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;
        return $this;
    }

    /**
     * @return float
     */
    public function getDuration()
    {
        return $this->duration;
    }

    /**
     * @param float $duration
     *
     * @return $this
     */
    public function setDuration($duration)
    {
        $this->duration = $duration;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDateCreated()
    {
        return $this->dateCreated;
    }

    /**
     * @param \DateTime $dateCreated
     *
     * @return $this
     */
    public function setDateCreated($dateCreated)
    {
        $this->dateCreated = $dateCreated;
        return $this;
    }
}
