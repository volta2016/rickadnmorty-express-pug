const express = require("express");
const app = express();

const pug = require("pug"); //call pug template engine

app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;

const charactersSerie = [
	{
		name: "Rick-Sanchez",
		species: "Human",
		image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	},
	{
		name: "Morty-Smith",
		species: "Human",
		image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
	},
	{
		name: "Summer-Smith",
		species: "Human",
		image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
	},
	{
		name: "Beth-Smith",
		species: "Human",
		image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
	},
];

app.get("/", (req, res) => {
	//res.send("index.html");
	res.render("index.pug", {
		titulo: "Rick and Morty Nuevos Episodios",
		texto: "Temprada numero 5!",
		imagen: "banner.jpg",
		characters: charactersSerie,
	});
});

app.get("/character/:name", (req, res) => {
	//to filter the object we are going to use element 0
	const dataCharacter = charactersSerie.filter((character) => {
		if (req.params.name == character.name) {
			return character;
		}
	})[0];
	res.render("character.pug", {
		character: req.params.name,
		data: dataCharacter,
	});
});

app.use((req, res) => {
	res.status(400);
	let error = req.originalUrl;
	res.render("404.pug", { texto: error }); //will send the page render
});

app.listen(port, () => {
	console.log("Servidor en el puerto", port);
});
