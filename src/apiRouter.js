//imports
const express = require('express');
const api = require('./routes/apiController');
const user = require('./routes/userController');
const event = require('./routes/eventController');
const time = require('./routes/timeController');
const answer = require('./routes/answerController');

const apiRouter = express.Router();
const route = api.makeRoute;


//routing
exports.router = (function () {

    //USER ROUTING
    route(apiRouter, '/user/',                      api.GET,    api.userAction);
    /**
     * @api {post} /user/register Permet d'inscrire un utilisateur
     * @apiName register
     * @apiGroup Utilisateur
     *
     * @apiParam {Boolean} anon Est-ce une inscription anonyme ?
     * @apiParam {String} firstname Prenom de l'utilisateur.
     * @apiParam {String} lastName Nom de famille de l'utilisateur.
     * @apiParam {String} password Mod de passe de l'utilisateur.
     * @apiParam {String} mail Adresse email de l'utilisateur.
     */
    route(apiRouter, '/user/register',              api.POST,   user.register);
    /**
     * @api {post} /user/login Permet à l'utilisateur de se connecter
     * @apiName login
     * @apiGroup Utilisateur
     * @apiParam {String} mail Adresse email de l'utilisateur.
     * @apiParam {String} password Mod de passe de l'utilisateur.
     */
    route(apiRouter, '/user/login',                 api.POST,   user.login);
    /**
     * @api {get} /user/list Permet de lister tout les utilisateurs
     * @apiName list
     * @apiGroup Utilisateur
     * @apiSuccess {Utilisateur[]} Utilisateurs Liste de tout les utilisateurs
     * @apiError UsersNotFound Les utilisateurs n'ont pas été trouvés.
     */
    route(apiRouter, '/user/list',                  api.GET,    user.list);
    /**
     * @api {get} /user/:id Permet récupérer un utilisateur
     * @apiName getUser
     * @apiGroup Utilisateur
     * @apiParam {Number} id Identifiant de l'utilisateur.
     * @apiSuccess {Utilisateur} Utilisateur Utilisateur pour l'identifiant <code>id</code>
     * @apiError UserNotFound L'utilisateur n'a pas été trouvé ou n'existe pas.
     */
    route(apiRouter, '/user/:id',                   api.GET,    user.getUser);
    /**
     * @api {get} /user/:id/event/list Permet récupérer tous les évenements pour un utilisateur donné
     * @apiName getUserEvents
     * @apiGroup Utilisateur
     * @apiParam {Number} id Identifiant de l'utilisateur.
     * @apiSuccess {Evenement[]} Evenements Evenements créés par l'utilisateur ayant l'identifiant <code>id</code>
     * @apiError EventsnotFound Les évenements n'ont pas été trouvés.
     */
    route(apiRouter, '/user/:id/event/list',        api.GET,    user.getUserEvents);
    /**
     * @api {get} /user/:id/event/:idE Permet récupérer un evenement <code>idE</code> pour un utilisateur donné
     * @apiName getUserEvent
     * @apiGroup Utilisateur
     * @apiParam {Number} id Identifiant de l'utilisateur.
     * @apiParam {Number} idE Identifiant de l'évenement voulu.
     * @apiSuccess {Reponse} answers Réponses pour l'évenement <code>idE</code> créé par l'utilisateur <code>id</code>
     */
    route(apiRouter, '/user/:id/event/:idE',        api.GET,    user.getUserEvent);

    //EVENT ROUTING
    /**
     * @api {post} /event/create Permet créer un évenement
     * @apiName eventCreate
     * @apiGroup Evenement
     * @apiParam {Number} creator Identifiant de l'utilisateur créateur.
     * @apiParam {String} linkId URL unique
     * @apiParam {String} title Titre de l'evenement
     * @apiParam {String} location Lieu de l'évenement
     * @apiParam {String} description Description de l'évenement
     * @apiParam {Date} limitDate Date limite ou les participants peuvent choisir un créneau
     * @apiParam {String} status Status de l'évenement
     * @apiParam {Boolean} isPrivate Confidentialité de l'évenement
     * @apiParam {Number} finalDate Identifiant du créneau choisit
     */
    route(apiRouter, '/event/create',               api.POST,   event.create);
    /**
     * @api {get} /event/list Permet récupérer la liste de tous les evenements
     * @apiName getEventList
     * @apiGroup Evenement
     * @apiSuccess {Evenement[]} Evenements Liste de tous les evenements
     * @apiError EventsNotFound Les evenements n'ont pas été trouvés
     */
    route(apiRouter, '/event/list',                 api.GET,    event.list)
    /**
     * @api {get} /event/:id Permet récupérer un évenement
     * @apiName getEvent
     * @apiGroup Evenement
     * @apiParam {Number} id Identifiant de l'évenement.
     * @apiSuccess {Evenement} evenement Evenement pour l'identifiant <code>id</code>
     * @apiError EventNotFound L'evenement n'a pas été trouvé ou n'existe pas.
     */
    route(apiRouter, '/event/:id',                  api.GET,    event.getEvent);
    /**
     * @api {post} /event/:id/time/create Permet créer un créneau pour un évenement donné (Non implémenté)
     * @apiName timeCreate
     * @apiGroup Evenement
     * @apiParam {Number} idEvent Identifiant <code>id</code> de l'évenement auquel on ajoute un créneau
     * @apiParam {Date} beginDate Date de début du créneau
     * @apiParam {Date} endDate Date de fin du crénau
     * @apiError EventNotFound L'evenement n'a pas été trouvé ou n'existe pas.
     */
    route(apiRouter, '/event/:id/time/create',      api.POST,   time.create);
    /**
     * @api {patch} /event/:id/time/:idT Permet modifier un créneau donné pour un évenement donné (Non implémenté)
     * @apiName changeTime
     * @apiGroup Evenement
     * @apiParam {Date} beginDate Date de début du créneau
     * @apiParam {Date} endDate Date de fin du crénau
     * @apiError TimeNotFound Le créneau n'a pas été trouvé ou n'existe pas.
     */
    route(apiRouter, '/event/:id/time/:idT',        api.PATCH,  time.changeTime);
    /**
     * @api {post} /event/:id/time/:idT/answer Permet de créer une réponse pour un créneau donné dans un évenement donné (Non implémenté)
     * @apiName answerCreate
     * @apiGroup Evenement
     * @apiParam {Date} beginDate Date de début du créneau
     * @apiParam {Date} endDate Date de fin du crénau
     * @apiError EventNotFound L'evenement n'a pas été trouvé ou n'existe pas.
     * @apiError TimeNotFound Le créneau n'a pas été trouvé ou n'existe pas.
     */
    route(apiRouter, '/event/:id/time/:idT/answer', api.POST,   answer.create);
    /**
     * @api {patch} /event/:id/time/:idT/answer Permet de modifier une réponse pour un créneau donné dans un évenement donné (Non implémenté)
     * @apiName changeAnswer
     * @apiGroup Evenement
     * @apiParam {Date} beginDate Date de début du créneau
     * @apiParam {Date} endDate Date de fin du crénau
     * @apiError EventNotFound L'evenement n'a pas été trouvé ou n'existe pas.
     * @apiError TimeNotFound Le créneau n'a pas été trouvé ou n'existe pas.
     */
    route(apiRouter, '/event/:id/time/:idT/answer', api.PATCH,  answer.changeAnswer);

    //api routing
    route(apiRouter, '/version/',                   api.GET,    api.version);
    route(apiRouter, '',                            api.GET,    api.use);
    route(apiRouter, '*',                           api.GET,    api.badUrl);
    route(apiRouter, '*',                           api.POST,   api.badUrl);
    route(apiRouter, '*',                           api.PUT,    api.badUrl);
    route(apiRouter, '*',                           api.PATCH,  api.badUrl);

    return apiRouter;

})();

