<?php

namespace TG\ManageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use TG\ManageBundle\Entity\Entreprise;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('TGManageBundle:Default:index.html.twig');
    }
    /**
    * @Rest\Post("/entreprises")
    * @Rest\View()
	*/
	public function addEntreAction(Request $request)
    {
        return [
            'payload' => [
                $request->get("nom"),
                $request->get("logo")
                 ]
        ];
        // $entreprise = new Entreprise();
        // $entreprise->setNom('edem')->setSiteWeb('https//afiamala.com')->setLogo('edem');
        // $data= $this->get('jms_serializer')->serialize($entreprise ,'json');
        // dump($data); die;
    // $em = $this->getDoctrine()->getManager();
    // $em->persist($entreprise);
    // $em->flush();

    // return $entreprise;
    // On r�cup�re notre objet Paginator

    // $data= $this->get('jms_serializer')->deserialize($request->getContent(), 'array','json');
    // $entreprise = new Entreprise();
    // $form = $this->get('form.factory')->create(EntrepriseType::class,$entreprise);
    // $form->submit($data);
    // $em = $this->getDoctrine()->getManager();
    // $em->persist($entreprise);
    // $em->flush();

    // return $entreprise->getId();
    // return $data;
    // //return $this->view($entreprise, Response:: HTTP_CREATED);

    }
}
