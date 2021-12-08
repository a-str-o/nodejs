const functions = require("firebase-functions");
const express = require('express');
const path = require('path')
const fs = require('fs')

exports.estimation = (req,res) => {
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
        .replace(/__URL__/g, "https://www.agenz.ma/contact")
        .replace(/___TITLE___/g, "Estimation")
          .replace(/__TITLE__/g, "Estimation en ligne de biens immobiliers")
          .replace(/__DESCRIPTION__/g, "agenz, leader de l'information sur le marché immobilier au Maroc estime votre bien immobilier, gratuitement et en deux minutes sur agenz.ma");
      console.log(data)
      res.send(data)
      })
  
  };