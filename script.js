$(document).ready(function() {


  // Creation & remplissage du tableau HallOfFame
  var n = $("#visutext");
  var table = $("<table>");
  var tr = $("<tr>");
  var td = $("<td>");

  var tete = ["Rang", "Nom", "Score", "Temps"]
  for (var t of tete) {
    tr.append($("<td>").html(t));
  }

  table.append(tr);
  n.append(table);
  if ("classement" in localStorage) {
    Thof = JSON.parse(localStorage["classement"]);
    for (var r = 0; r < Thof.length; r++) {
      var tr = $("<tr>");
      var td = $("<td>");

      td.html((r + 1));
      td.attr("id", "rank");
      tr.append(td);

      if (Thof[r].score < 7) {
        var td = $("<td>").text(Thof[r].nom);
        td.attr("id", "name" + r);
        tr.append(td);
        var td = $("<td>").text(Thof[r].score);
        td.attr("id", "score" + r);
        tr.append(td);
        var td = $("<td>").text(Thof[r].temps);
        td.attr("id", "time" + r);

        table.append(tr.append(td));
      } else {
        var td = $("<td>").text("----");
        td.attr("id", "name" + r);
        tr.append(td);
        var td = $("<td>").text("----");
        td.attr("id", "score" + r);
        tr.append(td);
        var td = $("<td>").text("----");
        td.attr("id", "time" + r);

        table.append(tr.append(td));
      }
    }
  } else {
    for (var r = 0; r < 10; r++) {
      var tr = $("<tr>");
      var td = $("<td>");

      td.html((r + 1));
      td.attr("id", "rank");
      tr.append(td);
      var td = $("<td>").text("----");
      td.attr("id", "name" + r);
      tr.append(td);
      var td = $("<td>").text("----");
      td.attr("id", "score" + r);
      tr.append(td);
      var td = $("<td>").text("----");
      td.attr("id", "time" + r);
      table.append(tr.append(td));
    }
  }
  n.append(table);


  function Joueur() {
    this.nom = "";
    this.score = 10000;
    this.temps = 10000;
  }
  // variables
  var Thof;
  var tempsEcoule;
  var start;

  //liste de mots dans différentes catégories
  var categoriesMots = [
    ["afghanistan", "albanie", "algerie", "andorre", "angola", "azerbaidjan", "argentine", "australie", "autriche", "bahamas", "bahrein", "bangladesh", "armenie", "barbade", "belgique", "bermudes", "bhoutan", "bolivie", "botswana", "bresil", "belize", "bulgarie", "myanmar", "burundi", "belarus", "cambodge", "cameroun", "canada", "sri lanka", "tchad", "chili", "chine", "taiwan", "colombie", "comores", "mayotte", "croatie", "cuba", "chypre", "benin", "danemark", "equateur", "ethiopie", "erythree", "estonie", "fidji", "finlande", "france", "djibouti", "gabon", "georgie", "gambie", "palestine", "allemagne", "ghana", "gibraltar", "kiribati", "grece", "groenland", "grenade", "guadeloupe", "guam", "guatemala", "guinee", "guyana", "haiti", "honduras", "hongrie", "islande", "inde", "indonesie", "iran", "iraq", "irlande", "israel", "italie", "jamaique", "japon", "kazakhstan", "jordanie", "kenya", "kirghizistan", "laos", "liban", "lesotho", "lettonie", "liberia", "libye", "liechtenstein", "lituanie", "luxembourg", "macao", "madagascar", "malawi", "malaisie", "maldives", "mali", "malte", "martinique", "mauritanie", "maurice", "mexique", "monaco", "mongolie", "moldavie", "montserrat", "maroc", "mozambique", "oman", "namibie", "nauru", "nepal", "aruba", "vanuatu", "nicaragua", "niger", "nigeria", "norvege", "pakistan", "panama", "paraguay", "perou", "philippines"],

    ["foot", "tennis", "golf", "basket", "bowling", "ballet", "badminton", "aerobic", "boxe", "aikido", "judo", "karate", "aquagym", "crossfit", "cyclisme", "danse", "flechette", "hokey", "mma", "natation", "parcours"],

    ["pomme", "peche", "poire", "myrtille", "fraise", "figue", "ananas", "orange", "banane", "prune"],

    ["television", "garage", "restaurant", "sandwich", "biscuit", "elephant", "crocodile", "hamster", "tramway", "taxi", "ambulance", "scooter", "president", "abstention", "abstinence", "accessible", "humour", "idiot", "essence", "important", "internet", "international", "maths", "police", "simple", "sport", "imagination", "violet", "rose", "legal"],
  ];
  // choix aléatoire de catégorie et du mot à trouver

  var catRandom = categoriesMots[Math.floor((Math.random() * categoriesMots.length))];
  var motRandom = (catRandom[Math.floor((Math.random() * catRandom.length))]).toUpperCase();
  console.log(motRandom);

  // séparer les lettres du mot choisi au hasard
  var lettreMot = motRandom.split("");

  // affichage de la catégorie

  if ($.inArray("afghanistan", catRandom) > -1) {
    $(".category").text("La catégorie est pays");
  } else if ($.inArray("foot", catRandom) > -1) {
    $(".category").text("La catégorie est sports");
  } else if ($.inArray("pomme", catRandom) > -1) {
    $(".category").text("La catégorie est fruits");
  } else {
    $(".category").text("La catégorie est divers");
  }

  // mise en place du mot à trouver et cacher les lettres

  for (var i = 0; i < motRandom.length; i++) {
    $('#container').append('<div class="letter ' + i + '"></div>');
    $('#container').find(":nth-child(" + (i + 1) + ")").text(lettreMot[i]);
    $(".letter").css("color", "#ca481e"); // colorier les cases des lettres du mot à trouver
  }

  var erreurLettre = 0;
  start = new Date();

  // fonction boutton

  $("button").on("click", function() {
    $(this).addClass("used");
    $(this).prop("disabled", "true");
    var correspond = false;

    //verifier si la lettre cliqué fait partie du mot mystère
    var lettreClique = $(this).text();
    for (var i = 0; i < motRandom.length; i++) {
      if (lettreClique === motRandom.charAt(i)) {
        $('#container').find(":nth-child(" + (i + 1) + ")").css("color", "#EFEFEF").addClass("winner");
        correspond = true;
      }
    }
    // si le mot est bien trouvé
    var motTrouve = [];
    $(".letter").each(function(index) {
      if ($(this).hasClass("winner")) {
        motTrouve.push(index);
        if (motTrouve.length === lettreMot.length) {
          $("#container").hide();
          $("button").prop("disabled", "true");
          $(".category").text("Bravo ! vous avez trouvé le mot " + motRandom + " nombres d'erreurs " + erreurLettre);
          var end = new Date();
          tempsEcoule = Math.round((end.getTime() - start.getTime()) / 1000);
          console.log(tempsEcoule);
          if (!("classement" in localStorage)) {
            Thof = [];
            for (var i = 0; i < 10; i++) Thof[i] = new Joueur();
            localStorage.setItem("classement", JSON.stringify(Thof));
          } else {
            Thof = JSON.parse(localStorage["classement"]);
          }
          //remplissage tableau avec tri
          if (erreurLettre < Thof[9].score) {
            $("button").hide();
            $("#replay").hide();
            $("#pendu").hide();
            $(".category").append("<p>Bravo ! Vous faites partie du Hall Of Fame ! <br> ENTREZ VOTRE NOM</p>");
            $("#intext1").show();
            $("#intext1").one('change', function(event) {
              Thof[9].nom = $("#intext1").val();
              Thof[9].score = erreurLettre;
              Thof[9].temps = tempsEcoule;

              var joueur = Thof[9];
              Thof.sort(function(a, b) {
                return a.score - b.score
              });

              $("#intext1").val('');
              for (var i = 9; i > (Thof.indexOf(joueur) ); i--) {
                $("#name" + i).html($("#name" + (i - 1)).html());
                $("#score" + i).html($("#score" + (i - 1)).html());
                $("#time" + i).html($("#time" + (i - 1)).html());
              }
              $("#name" + (Thof.indexOf(joueur))).html(joueur.nom);
              $("#score" + (Thof.indexOf(joueur))).html(joueur.score);
              $("#time" + (Thof.indexOf(joueur))).html(joueur.temps);

              localStorage.setItem("classement", JSON.stringify(Thof));
            });
          }
          $("#replay").show();
          $("#replay").html("<br><button enabled class='play-again'> Une autre partie ? </button>");
        }

      }
    });
    //si le joueur clique sur la mauvaise lettre
    if (correspond === false) {
      $("#pendu").show();
      erreurLettre += 1;
      $("#pendu").attr("src", "img/" + erreurLettre + ".png");
    }
    // si il perd
    if (erreurLettre === 7) {
      $("#container").hide();
      $("button").prop("disabled", "true");
      $(".category").text("Perdu ! le mot à trouver été " + motRandom);
      $("#replay").html("<br><button enabled class='play-again'>Une autre partie ?</button>");

    }

    // Play again button
    $(".play-again").on("click", function() {
      location.reload();
    });

  });

});
