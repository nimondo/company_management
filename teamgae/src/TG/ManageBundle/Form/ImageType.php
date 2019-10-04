<?php

namespace TG\ManageBundle\Form;

use TG\ManageBundleBundle\Entity\Image;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class ImageType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('filename', FileType::class, [
            'label' => 'Image)',

            // unmapped means that this field is not associated to any entity property
            'mapped' => false,

            // make it optional so you don't have to re-upload the PDF file
            // everytime you edit the Product details
            'required' => true,

            // unmapped fields can't define their validation using annotations
            // in the associated entity, so you can use the PHP constraint classes
            // 'constraints' => [
            //     new File([
            //         'maxSize' => '1024k',
            //         'mimeTypes' => [
            //             'application/pdf',
            //             'application/x-pdf',
            //         ],
            //         'mimeTypesMessage' => 'Please upload a valid PDF document',
            //     ])
            // ],
        ])
        // ...
    ;
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'TG\ManageBundle\Entity\Image'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'tg_managebundle_image';
    }


}
