Installation

Backend(Symfony)
Pour installer tous les modules vous devez faire la commande suivante: 
composer install

N'oubliez pas d'être dans le dossier Server avant d'effectuer les installations
Pour y accéder il vous suffit d'effectuer cette commande:
cd Server


Frontend(React)
Pour installer les modules de react vous devez avant tout être dans le dossier Client et exécuter la commande suivante:
npm install

Pour accéder au dossier Client vous devez exécuter cette commande:
cd Client


Liaison base de données
Maintenant que les installations sont effectués vous devez créer une base de données et remplacé db_user par votre utilisateur, password par votre mot de passe et db_name par le nom de votre base de données.



Lancement des serveurs
A présent on va lancer dans un premier temps le backend donc dans le dossier Server. Pour le lancer vous devez écrire cette commande:
symfony server:start
Si tout à bien fonctionné vous pouvez tester en allant sur votre navigateur et allé à l'adresse suivante localhost:8000 si vous avez une page symfony qui apparaît celà signifie que le server est bien lancé.
Passons dès à présent au frontend, dans le dossier Client vous devez écrire cette commande:
npm start
Comme pour le backend vous pouvez vérifier si vous avez quelque chose à l'adresse localhost:3000. Si tout à bien fonctionner vous arrivez sur la première page.


Fonctionnalités
Vous êtes maintenant sur le site mais comme vous le voyez il n'y a pas grand chose. La première étape est de créer une catégorie pour ce faire vous devez cliquer sur liste des catégories puis sur ajouter, vous remplisez le nom de la catégorie et vous créer la catégorie.
Maintenant que la catégorie est crée on peut faire de même pour les produits, accéder à la création de produits via le bouton ajouter. Remplisser le formulaire comme cet exemple Nom: Produit, Description du produit: Exemple de produit, Prix: 1.00 vous pouvez également l'écrire comme ceci 1 et enfin sélectionner la catégorie que vous avez crée pour finaliser la création.
Vous pouvez le modifier en changeant les champs et en appuyant sur le bouton mettre à jour qui est à côté du produit(On ne peut modifier qu'un seul produit à la fois). Vous pouvez faire de même avec les catégories.
Sur votre barre de navigation vous trouverez la liste des catégories, les catégories que vous avez crée et le logo Teach'r, si vous cliquer sur une catégorie que vous avez crée celà vous redirigera vers une page qui contient uniquement les produits de la catégorie. En appuyant sur Teach'r vous retournerez sur la page d'accueil. 
