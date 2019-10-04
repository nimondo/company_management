# code challenge 

## Le test consiste à créer une interface d’administration pour gérer les entreprises et leurs employés.
#### 1- La table de la base de données des sociétés comprend les champs suivants : Nom (obligatoire), email, logo (minimum 100 × 100), site Web.
#### 2- La table de base Employees comprend les champs suivants : prenom (obligatoire), nom de famille (obligatoire), societe (clé étrangère de la société), email, téléphone

#### 3- Utiliser les migrations de base de données pour créer les schémas ci-dessus
#### 4- Stocker les logos des entreprises dans le dossier de stockage /public/uploads /logo et les rendre accessibles au public

#### 5- Créer des API pour effectuer le CRUD des entités de la base,
#### 6- Créer un interface web en client JavaScript (Angular, VueJs etc. …) Pour manipuler les entités.

### En gros, avec cet exercice simple, nous voulons voir compétences de base du développeur en :

## Architecture MVC
## Auth
## Contrôleurs CRUD et de ressources
## Gestion des entités et Relations
## Base de données migrations
## Formulaire de validation et demandes
## Gestion de fichiers
## Base de base Bootstrap
## Pagination

# Une fois fini, utilisez la branche Master pour faire votre commit. 


# TeamGAE challenge 

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Intro](#intro)
- [Requirements](#requirements)
- [Installation](#installation)
- [Instruction](#instruction)

## Intro

This project sets up a company and employee management.
Reporting tool that prints out reports (in plain text) based on the data in the database

1.Backend :RestFul Api for CRUD on Company and Employee. Technologie is PHP(Symfony: fosrest, nelmio)

2.Frontend: Angular 8/ngxpaginate, ng select, toast

3.Backend: Restful Api for admin : PHP/Symfony : fosrest, nelmio

## Requirements	

### required

Php: 7.1.26
MySQL : 5.7.24
WAMP latest
NodeJS latest
composer
to run the app

## Installation

### Install Wamp

Copy teamgae directory files in www
**Virtual host:** Create virtual host named "teamgae"
**Composer:** make composer update to install symfony depencies
**Mysql:** create database named "teamgae" and instal the sql file in teamgae directory
Run the server

### Install Nodejs

**Nodejs cmd or other:** cd into teamgaeWeb directory. use npm install command to install the angular depencies and then use ng serve command to run the server.

## Instructions

### Start the Wamp server and run angular app

### Logged in

use "user" for username and "userpass" for password to log as admin and perform task. You can create also another user in manager menu.
[(Back to TOC)](#table-of-contents)
