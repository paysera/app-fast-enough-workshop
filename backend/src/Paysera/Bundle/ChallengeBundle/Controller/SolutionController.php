<?php

namespace Paysera\Bundle\ChallengeBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Paysera\Bundle\ChallengeBundle\Entity\Solution;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;

class SolutionController extends FOSRestController
{
    /**
     * @ParamConverter("solution", converter="fos_rest.request_body")
     * @Rest\Post("/solutions")
     * @param Solution $solution
     * @return Response
     */
    public function postSolutionAction(Solution $solution)
    {
        //TODO: check solution
    }
}
