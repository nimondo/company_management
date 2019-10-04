<?php
// src/AppBundle/Controller/ProductController.php
namespace TG\ManageBundle\Controller;

use TG\ManageBundle\Entity\Image;
use TG\ManageBundle\Form\ImageType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;

class ImageController extends Controller
{
    
}