<?php

namespace TG\ManageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use TG\ManageBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use TG\ManageBundle\Form\UserType;

class SecurityController extends Controller
{
    /**
     * @Rest\View()
     * @Rest\Put("/login")
     */
    public function loginAction(Request $request){
        $password= $request->get("password");
        $username= $request->get("username");
        $date = \time();
        $npass = \sha1($password);
        $token = \sha1($date.$username);
        $user = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:User')
                ->findOneByUsername($username);
        $pass = $user->getPassword();
        if($pass==$npass){
            $em = $this->get('doctrine.orm.entity_manager');
            $em->merge($user->setToken($token)->setTokenExpriry(1));
            $em->flush();
            $formatted = [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'username' => $user->getUsername(),
                'token' => $token
             ];
            // $response = new Response();
            // $response->setContent(json_encode($formatted));
            // $response->headers->set('Content-Type', 'application/json');
            // // Allow all websites
            // $response->headers->set('Access-Control-Allow-Origin', '*');
            // $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');  
            // return $response;
           return new JsonResponse($formatted, Response::HTTP_OK);
        }else{
            return new JsonResponse(['message' => 'Identifiants invalides'], Response::HTTP_OK);
        }
    }
    /**
     * @Rest\View()
     * @Rest\Put("/logout")
     */
    public function logoutAction(Request $request){
        $token= $request->get("token");
        $user = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:User')
                ->findOneByToken($token);
        $em = $this->get('doctrine.orm.entity_manager');
        $em->merge($user->setTokenExpriry(0));
        $em->flush();
        return new JsonResponse(['logout' => "ok"], Response::HTTP_OK);
    }
    /**
     * @Rest\View()
     * @Rest\Put("/login_check")
     */
    public function loginCheckAction(Request $request){
        $token= $request->get("token");
        $user = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:User')
                ->findOneByToken($token);
        $check= $user->getTokenExpriry();
        if($check==1){
            return new JsonResponse(['check' => "ok"], Response::HTTP_OK);
        }else{
            return new JsonResponse(['check' => "no"], Response::HTTP_OK);
        }
    }
    /**
     * @Rest\View()
     * @Rest\Post("/registre")
     */
    public function registrationAction(Request $request){
        $password= $request->get("password");
        $username= $request->get("username");
        $update= new \Datetime;
        $date = \time();
        $npass = \sha1($password);
        $token = \sha1($date.$username);
        $data= $this->get('jms_serializer')->deserialize($request->getContent(), 'array','json');
        $user = new User();
        $form = $this->get('form.factory')->create(UserType::class,$user);
        $form->submit($data);
        $em = $this->getDoctrine()->getManager();
        $em->persist($user->setPassword($npass)->setToken($token)->setTokenExpriry(0)->setUpdateDate($update));
        $em->flush();
        return new JsonResponse(['message' => 'ok'], Response::HTTP_OK);
    }
    /**
     * @Rest\View()
     * @Rest\Put("/manageuser")
     */
    public function updateUserAction(Request $request)
    {
        $token= $request->get("token");
        $user = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:User')
                ->findOneByToken($token);
                 // L'identifiant en tant que paramètre n'est plus nécessaire
        /* @var $entreprise Place */

        if (empty($user)) {
            return new JsonResponse(['message' => 'user not found'], Response::HTTP_NOT_FOUND);
        }
        if($request->get("name")){
            $user->setName($request->get("name"));
        }
        if($request->get("email")){
            $user->setEmail($request->get("email"));
        }
        $data = json_encode($user);
        $form = $this->createForm(UserType::class, $user);

        $form->submit($data);

        if ($form) {
            $em = $this->get('doctrine.orm.entity_manager');
            // l'entité vient de la base, donc le merge n'est pas nécessaire.
            // il est utilisé juste par soucis de clarté
            $em->merge($user);
            $em->flush();
            return new JsonResponse(['message' => 'ok'], Response::HTTP_CREATED);
        } else {
            return new JsonResponse(['message' => 'FORMULAIRE NON VALIDE'], Response::HTTP_CREATED);
        }
    }
    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/manageuser")
     */
    public function removeUserAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $username= $request->get("username");
        $user = $this->get('doctrine.orm.entity_manager')
                ->getRepository('TGManageBundle:User')
                ->findOneByUsername($username);
        /* @var $place Place */

        $em->remove($user);
        $em->flush();
        return new JsonResponse(['message' => 'ok'], Response::HTTP_OK);
    }
}