const functions = require("firebase-functions");
const express = require('express');
const path = require('path')
const fs = require('fs')

exports.home= (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const filePath = path.resolve(__dirname, "./../../build", "index.html");
    console.log(filePath)
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        }
    
        data = data
        .replace(/__URL__/g, "https://www.agenz.ma/")
          .replace(/__TITLE__/g, "Leader de l'estimation immobilière en ligne au Maroc")
          .replace(/__DESCRIPTION__/g, "Informez vous sur le marché de l'immobilier au maroc et estimez votre bien immobilier instantanéement, gratuitement et en deux minutes");
      console.log(data)
      res.send(data)
      })
  
  };