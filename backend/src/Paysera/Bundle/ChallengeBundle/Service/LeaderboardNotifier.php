<?php

namespace Paysera\Bundle\ChallengeBundle\Service;

use Paysera\Bundle\ChallengeBundle\Entity\Solution;
use Pusher\Pusher;

class LeaderboardNotifier
{
    private $pusher;

    public function __construct(Pusher $pusher)
    {
        $this->pusher = $pusher;
    }

    public function notify(Solution $solution)
    {
        //TODO: implement Pusher notification
    }
}
