// Importation des dépendances
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Création de l'application Express
const app = express();
const server = http.createServer(app);

// Configuration de CORS
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Configuration de Socket.io avec le serveur HTTP

// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:5173", // Remplacez ceci par l'URL de votre application front-end
//     methods: ["GET", "POST"],
//   },
// });

const io = socketIo(server);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

const connectedUsers = [];
function randomColorForUser() {
  const colors = [
    "text-blue-400",
    "text-indigo-400",
    "text-purple-400",
    "text-pink-400",
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-green-400",
    "text-teal-400",
    "text-cyan-400",
    "text-amber-400",
    "text-lime-400",
    "text-emerald-400",
    "text-sky-400",
    "text-fuchsia-400",
    "text-rose-400",
  ];

  var randomIndex = Math.floor(Math.random() * colors.length);
  var randomColor = colors[randomIndex];
  return randomColor;
}

function randomName() {
  const pseudos = [
    "NinjaWarrior",
    "CyberGeek",
    "DarkKnight",
    "PixelMaster",
    "CodeNinja",
    "GameChanger",
    "StarGazer",
    "TechWhiz",
    "SunnyDaze",
    "LunaEclipse",
    "DreamWeaver",
    "DigitalNomad",
    "CosmicVoyager",
    "CryptoWizard",
    "WebSlinger",
    "PixelPirate",
    "CodeJockey",
    "ByteBender",
    "CrimsonViper",
    "PhantomRider",
    "ShadowCaster",
    "EternalFlame",
    "NeonNebula",
    "GalacticHero",
    "BinaryBard",
    "EnigmaSolver",
    "DataDiva",
    "GameFreak",
    "VRVoyager",
    "AstralSurfer",
    "TechnoTitan",
    "StarWalker",
    "PixelPioneer",
    "CyberSamurai",
    "SkyScanner",
    "WebSorcerer",
    "CodeCrusader",
    "LaserLion",
    "QuantumQueen",
    "AlphaWolf",
    "BetaBot",
    "CosmicDancer",
    "DataDragon",
    "SolarSorcerer",
    "BinaryNomad",
    "PixelProdigy",
    "FutureFusion",
    "InfinityGuru",
    "RetroRebel",
    "DigitalDynamo",
  ];
  var randomIndex = Math.floor(Math.random() * pseudos.length);
  var randomName = pseudos[randomIndex];
  return randomName;
}

// Gestion des connexions des clients
io.on("connection", (socket) => {
  console.log("Nouvelle connexion établie");
  console.log(socket.id);
  var name = randomName();
  connectedUsers.push({
    id: socket.id,
    name: name,
    color: randomColorForUser(),
    img: `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${name}`,
  });
  io.emit("userConnected", connectedUsers);

  // Gestion de l'événement d'envoi de message
  socket.on("message", (data) => {
    console.log("Nouveau message reçu :", data);

    // Diffuser le message à tous les clients connectés
    io.emit("message", data);
  });

  // Gestion de la déconnexion d'un client
  socket.on("disconnect", () => {
    console.log("Client déconnecté");

    // Retirer l'utilisateur de la liste des utilisateurs connectés
    const index = connectedUsers.findIndex(
      (element) => element.id === socket.id
    );
    if (index !== -1) {
      connectedUsers.splice(index, 1);
    }
    // Émettre un événement pour informer le front-end
    io.emit("userDisconnected", connectedUsers);
  });
});

// Démarrage du serveur sur le port 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
