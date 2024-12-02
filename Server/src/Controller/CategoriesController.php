<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Categories;
use App\Repository\CategoriesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CategoriesController extends AbstractController
{
    #[Route('/api/categories', name: 'list_categories')]
    public function getCategories(CategoriesRepository $repository)
    {
        //Stocking all categories in categories
        $categories = $repository->findAll();

        //Settting up an array that will stock the data of each categorie
        $data = [];

        //Only if they are no categories yet
        if (!$categories)
        {
            return new JsonResponse(['message' => "Vous n'avez pas encore créer de catégories"]);
        }

        foreach ($categories as $categorie)
        {
            //Storing the data of each categorie in data
            $data[] = [
                'id' => $categorie->getId(),
                'name' => $categorie->getName(),
            ];
        }

        return new JsonResponse($data);
    }

    //Route to create a categorie
    #[Route('/api/create_categorie', name: 'create_categorie', methods: ['POST'])]
    public function createCategorie(Request $request, EntityManagerInterface $entity)
    {
        //Get the data from the form
        $data = json_decode($request->getContent(), true);

        //Check if the form is not empty
        if (!$data)
        {
            return new JsonResponse(['message' => 'Veuillez à bien remplir le formulaire']);
        }

        //Create a new categorie
        $categorie = new Categories();
        $categorie->setName($data['name']);
        $entity->persist($categorie);
        $entity->flush();
        return new JsonResponse(['message' => 'Catégorie crée']);
    }

    //Route to update a categgorie
    #[Route('/api/update_categorie', name: 'update_categorie', methods: ['POST'])]
    public function updateCategorie(Request $request, EntityManagerInterface $entity, CategoriesRepository $repository)
    {
        //Get the data from the form
        $data = json_decode($request->getContent(), true);

        //Check if the form is not empty
        if (!$data)
        {
            return new JsonResponse(['message' => 'Pas de modificaton effectué']);
        }

        //Find the categorie by id
        $categorie = $repository->find($data['id']);

        //Checking if the categorie exist
        if (!$categorie)
        {
            return new JsonResponse(['message' => 'Catégorie pas trouvé']);
        }

        //Update the categorie
        $categorie->setName($data['name']);
        $entity->persist($categorie);
        $entity->flush();
        return new JsonResponse(['message' => 'Catégorie mis à jour']);
    }

    //Route to delete a categorie
    #[Route('/api/delete_categorie', name: 'delete_categorie', methods: ['DELETE'])]
    public function deleteCategorie(Request $request, EntityManagerInterface $entity, CategoriesRepository $repository)
    {
        //Get the data from the form
        $data = json_decode($request->getContent(), true);

        //Check if the form is not empty
        if (!$data)
        {
            return new JsonResponse(['message' => 'Pas de modificaton effectué']);
        }

        //Find the categorie by id
        $categorie = $repository->find($data['id']);

        //Checking if the categorie exist
        if (!$categorie)
        {
            return new JsonResponse(['message' => 'Catégorie pas trouvé']);
        }

        //Remove the categorie
        $entity->remove($categorie);
        $entity->flush();
        return new JsonResponse(['message' => 'Categorie supprimé']);
    }
}
