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
        $data = [
            'message' => sprintf(
                'User "%s" just completed challenge "%s" with time "%s" seconds',
                $solution->getUserId(),
                $solution->getChallengeIdentifier(),
                $solution->getDuration()
            ),
            'challenge' => $solution->getChallengeIdentifier(),
            'duration' => (float)$solution->getDuration(),
            'date' => $solution->getDateCreated()->format('Y-m-d H:i:s'),
            'user' => $solution->getUserId(),
        ];

        $this->pusher->trigger('leaderboard', 'updated', $data);
    }
}
