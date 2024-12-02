<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Products;
use App\Repository\ProductsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ProductsController extends AbstractController
{
    //Route to get all products
    #[Route('/api/products', name: 'list_product', methods: ['GET'])]
    public function getProducts(ProductsRepository $repository)
    {
        //Stocking all products in products
        $products = $repository->findAll();

        //Settting up an array that will stock the data of each product
        $data = [];

        //Only if they are no products yet
        if (!$products)
        {
            return new JsonResponse(['message' => "Vous n'avez pas encore créer de produits"]);
        }

        foreach ($products as $product)
        {
            //Storing the data of each product in data
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'categorie' => $product->getCategorie(),
                'price' => $product->getPrice(),
                'created_at' => $product->getCreatedAt(),
            ];
        }

        return new JsonResponse($data);
    }

    //Route to create a product
    #[Route('/api/create_product', name: 'create_product', methods: ['POST'])]
    public function createProduct(Request $request, EntityManagerInterface $entity)
    {
        //Get the data from the form
        $data = json_decode($request->getContent(), true);

        //Check if the form is not empty
        if (!$data)
        {
            return new JsonResponse(['message' => 'Veuillez à bien remplir le formulaire']);
        }

        //Create a new product
        $product = new Products();
        $product->setName($data['name']);
        $product->setDescription($data['description'] ?? '');
        $product->setCategorie($data['categorie']);
        $product->setPrice($data['price']);
        $product->setCreatedAt(new \DateTime('now'));
        $entity->persist($product);
        $entity->flush();
        return new JsonResponse(['message' => 'Produit crée']);
    }

    //Route to update a product
    #[Route('/api/update_product', name: 'update_product', methods: ['POST'])]
    public function updateProduct(Request $request, EntityManagerInterface $entity, ProductsRepository $repository)
    {
        //Get the data from the form
        $data = json_decode($request->getContent(), true);

        //Check if the form is not empty
        if (!$data)
        {
            return new JsonResponse(['message' => 'Pas de modificaton effectué']);
        }

        //Find the product by id
        $product = $repository->find($data['id']);

        //Checking if the product exist
        if (!$product)
        {
            return new JsonResponse(['message' => 'Produit pas trouvé']);
        }

        //Update the product
        $product->setName($data['name']);
        $product->setDescription($data['description'] ?? '');
        $product->setCategorie($data['categorie']);
        $product->setPrice($data['price']);
        $product->setCreatedAt(new \DateTime('now'));
        $entity->persist($product);
        $entity->flush();
        return new JsonResponse(['message' => 'Produit mis à jour']);
    }

    //Route to delete a product
    #[Route('/api/delete_product', name: 'delete_product', methods: ['DELETE'])]
    public function deleteProduct(Request $request, EntityManagerInterface $entity, ProductsRepository $repository)
    {
        //Get the data from the form
        $data = json_decode($request->getContent(), true);

        //Check if the form is not empty
        if (!$data)
        {
            return new JsonResponse(['message' => 'Pas de modificaton effectué']);
        }

        //Find the product by id
        $product = $repository->find($data['id']);

        //Checking if the product exist
        if (!$product)
        {
            return new JsonResponse(['message' => 'Produit pas trouvé']);
        }

        //Remove the product
        $entity->remove($product);
        $entity->flush();
        return new JsonResponse(['message' => 'Produit supprimé']);
    }
}
