<?php
namespace TG\ManageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use FOS\RestBundle\Controller\Annotations as Rest; // alias pour toutes les annotations
use TG\ManageBundle\Entity\Entreprise;
use TG\ManageBundle\Entity\Employe;
use TG\ManageBundle\Form\EntrepriseType;
use TG\ManageBundle\Form\EmployeType;
use TG\ManageBundle\Entity\Image;
use TG\ManageBundle\Form\ImageType;

class ManageController extends Controller
{
     /**
     * @Rest\View()
     * @Rest\Post("/entreprises")
     */
    public function postEntreprisesAction(Request $request)
    {
         
    $data= $this->get('jms_serializer')->deserialize($request->getContent(), 'array','json');
    $entreprise = new Entreprise();
    $form = $this->get('form.factory')->create(EntrepriseType::class,$entreprise);
    $form->submit($data);
    $em = $this->getDoctrine()->getManager();
    $em->persist($entreprise);
    $em->flush();
    $formatted = [
        'id' => $entreprise->getId(),
        'nom' => $entreprise->getNom(),
        'email' => $entreprise->getEmail(),
        'logo' => $entreprise->getLogo(),
        'siteWeb' => $entreprise->getSiteWeb(),
     ];
        return new JsonResponse($formatted, Response::HTTP_CREATED);
    }
    /**
     * @Rest\Get("/entreprises")
     */
    public function getPlacesAction(Request $request)
    {
        $entreprises = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Entreprise')
                ->findAll();
        /* @var $entreprises Place[] */

        $formatted = [];
        foreach ($entreprises as $entreprise) {
            $formatted[] = [
               'id' => $entreprise->getId(),
               'nom' => $entreprise->getNom(),
               'email' => $entreprise->getEmail(),
               'logo' => $entreprise->getLogo(),
               'siteWeb' => $entreprise->getSiteWeb(),
            ];
        }

        return new JsonResponse($formatted);
    }
    /**
     * @Rest\Get("/entreprises/{id}")
     */
    public function getPlaceAction(Request $request)
    {
        $entreprise = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Entreprise')
                ->find($request->get('id')); // L'identifiant en tant que paramétre n'est plus nécessaire
                if (empty($entreprise)) {
                    return new JsonResponse(['message' => 'Entreprise not found'], Response::HTTP_NOT_FOUND);
                }
        
        $formatted = [
            'id' => $entreprise->getId(),
            'nom' => $entreprise->getNom(),
            'email' => $entreprise->getEmail(),
            'logo' => $entreprise->getLogo(),
            'siteWeb' => $entreprise->getSiteWeb(),
                ];
        
                return new JsonResponse($formatted);
    }
    /**
     * @Rest\View()
     * @Rest\Put("/entreprises")
     */
    public function updateEntreAction(Request $request)
    {
        $entreprise = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Entreprise')
                ->find($request->get('id')); // L'identifiant en tant que paramètre n'est plus nécessaire
        /* @var $entreprise Place */

        if (empty($entreprise)) {
            return new JsonResponse(['message' => 'Place not found'], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(EntrepriseType::class, $entreprise);

        $form->submit($request->request->all());

        if ($form) {
            $em = $this->get('doctrine.orm.entity_manager');
            // l'entité vient de la base, donc le merge n'est pas nécessaire.
            // il est utilisé juste par soucis de clarté
            $em->merge($entreprise);
            $em->flush();
            return new JsonResponse(['message' => 'MODIFICATION EFFECTUEE'], Response::HTTP_CREATED);
        } else {
            return new JsonResponse(['message' => 'FORMULAIRE NON VALIDE'], Response::HTTP_CREATED);
        }
    }
    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/entreprises/{id}")
     */
    public function removePlaceAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $place = $em->getRepository('TGManageBundle:Entreprise')
                    ->find($request->get('id'));
        /* @var $place Place */

        $em->remove($place);
        $em->flush();
        return new JsonResponse(['message' => 'ok'], Response::HTTP_OK);
    }
    /**
     * @Rest\View()
     * @Rest\Post("/employes")
     */
    public function postEmployesAction(Request $request)
    {
    $em = $this->get('doctrine.orm.entity_manager');
    $entre = $em->getRepository('TGManageBundle:Entreprise')
                    ->find($request->get('entreprise_id')); 
    $data= $this->get('jms_serializer')->deserialize($request->getContent(), 'array','json');
    $employe = new Employe();
    $form = $this->get('form.factory')->create(EmployeType::class,$employe);
    $form->submit($data);
    $em->persist($employe->setEntreprise($entre));
    $em->flush();

    $entreprise = [
                    'id' =>$employe->getEntreprise()->getId(),
                    'nom' =>$employe->getEntreprise()->getNom(),
                    'logo' =>$employe->getEntreprise()->getLogo(),
                    'email'=>$employe->getEntreprise()->getEmail(),
                    'siteWeb'=>$employe->getEntreprise()->getSiteWeb(),
                ];
        $formatted = [
            'id' => $employe->getId(),
            'nom' => $employe->getNom(),
            'prenom' => $employe->getPrenom(),
            'email' => $employe->getEmail(),
            'telephone' => $employe->getTelephone(),
            'entreprise_id' => $entreprise,
                ];
        return new JsonResponse($formatted);
    }
    /**
     * @Rest\Get("/employes/{id}")
     */
    public function getEmployeAction(Request $request)
    {
        $employe = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Employe')
                ->find($request->get('id')); // L'identifiant en tant que paramétre n'est plus nécessaire
                if (empty($employe)) {
                    return new JsonResponse(['message' => 'Employe not found'], Response::HTTP_NOT_FOUND);
                }
            $entreprise = [
                    'id' =>$employe->getEntreprise()->getId(),
                    'nom' =>$employe->getEntreprise()->getNom(),
                    'logo' =>$employe->getEntreprise()->getLogo(),
                    'email'=>$employe->getEntreprise()->getEmail(),
                    'siteWeb'=>$employe->getEntreprise()->getSiteWeb(),
                ];
        $formatted = [
            'id' => $employe->getId(),
            'nom' => $employe->getNom(),
            'prenom' => $employe->getPrenom(),
            'email' => $employe->getEmail(),
            'telephone' => $employe->getTelephone(),
            'entreprise_id' => $entreprise,
                ];
        
                return new JsonResponse($formatted);
    }
     /**
     * @Rest\Get("/employesentre/{id}")
     */
    public function getEmployeEntreAction(Request $request)
    {
        $entreprise = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Entreprise')
                ->find($request->get('id'));
                 // L'identifiant en tant que paramétre n'est plus nécessaire
                if (empty($entreprise)) {
                    return new JsonResponse(['message' => 'Entreprise not found'], Response::HTTP_NOT_FOUND);
                }

        $employes = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Employe')
                ->findByEntreprise($entreprise);
        
                $formatted = [];
                foreach ($employes as $employe) {
                    $formatted[] = [
                       'id' => $employe->getId(),
                       'nom' => $employe->getNom(),
                       'prenom' => $employe->getPrenom(),
                       'email' => $employe->getEmail(),
                       'telephone' => $employe->getTelephone(),
                    ];
                }
        
                return new JsonResponse($formatted);
    }
    /**
     * @Rest\Get("/employes")
     */
    public function getEmployesAction(Request $request)
    {
        $employes = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Employe')
                ->findAll();
        /* @var $entreprises Place[] */

        $formatted = [];
        foreach ($employes as $employe) {
            $entreprise = [
                'id' =>$employe->getEntreprise()->getId(),
                'nom' =>$employe->getEntreprise()->getNom(),
                'logo' =>$employe->getEntreprise()->getLogo(),
                'email'=>$employe->getEntreprise()->getEmail(),
                'siteWeb'=>$employe->getEntreprise()->getSiteWeb(),
            ];
            $formatted[] = [
                'id' => $employe->getId(),
                'nom' => $employe->getNom(),
                'prenom' => $employe->getPrenom(),
                'email' => $employe->getEmail(),
                'telephone' => $employe->getTelephone(),
               'entreprise_id' => $entreprise,
            ];
        }

        return new JsonResponse($formatted);
    }
    /**
     * @Rest\View()
     * @Rest\Put("/employes")
     */
    public function updateEmployeAction(Request $request)
    {
        $employe = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Employe')
                ->find($request->get('id'));
        $entreprise = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:Entreprise')
                ->find($request->get('entreprise_id'));
                 // L'identifiant en tant que paramètre n'est plus nécessaire
        /* @var $entreprise Place */

        if (empty($employe)) {
            return new JsonResponse(['message' => 'Employe not found'], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(EmployeType::class, $employe);
        $form->submit($request->request->all());

        if ($form) {
            $em = $this->get('doctrine.orm.entity_manager');
            // l'entité vient de la base, donc le merge n'est pas nécessaire.
            // il est utilisé juste par soucis de clarté
            // dump($entreprise); die;
            $employe->setEntreprise($entreprise);
            $em->merge($employe);
            $em->flush();
            return new JsonResponse(['message' => 'MODIFICATION EFFECTUEE'], Response::HTTP_CREATED);
        } else {
            return new JsonResponse(['message' => 'FORMULAIRE NON VALIDE'], Response::HTTP_CREATED);
        }
    }
    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/employes/{id}")
     */
    public function removeEmployeAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $employe = $em->getRepository('TGManageBundle:Employe')
                    ->find($request->get('id'));
        /* @var $place Place */

        $em->remove($employe);
        $em->flush();
        return new JsonResponse(['message' => 'ok'], Response::HTTP_OK);
    }
    /**
     * @Rest\View()
     * @Rest\Post("/upload")
     */
    public function uploadAction(Request $request)
    {
        $data= $request->files->get('file');
        // return new JsonResponse($data);
        $product = new Image();
        $form = $this->createForm(ImageType::class, $product);
        // $form->handleRequest($request);
        $form->submit($data);
        if ($form->isSubmitted() ) {
            /** @var UploadedFile $brochureFile */
            $brochureFile = $data;
            //return new JsonResponse(['message' => $brochureFile], Response::HTTP_CREATED);

            // this condition is needed because the 'brochure' field is not required
            // so the PDF file must be processed only when a file is uploaded
            if ($brochureFile) {
                $originalFilename = pathinfo($brochureFile->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$brochureFile->guessExtension();

                // Move the file to the directory where brochures are stored
                try {
                    $brochureFile->move(
                        $this->getParameter('brochures_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    // ... handle exception if something happens during file upload
                }

                // updates the 'brochureFilename' property to store the PDF file name
                // instead of its contents
                $product->setFilename($newFilename);
            }

            // ... persist the $product variable or any other work

            return new JsonResponse(['message' => $newFilename], Response::HTTP_CREATED);
        }
        return new JsonResponse(['message' => 'non ok'], Response::HTTP_CREATED);
    }
}
