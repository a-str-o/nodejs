const functions = require("firebase-functions");
const express = require('express');
const path = require('path')
const fs = require('fs')

exports.estimationShare = (req,res) => {
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
        .replace(/__URL__/g, "https://www.agenz.ma/estimations")
        .replace(/___TITLE___/g, "Mon estimation")
          .replace(/__TITLE__/g, "Mon bien estimé")
          .replace(/__DESCRIPTION__/g, "Découvrez l'estimation de ce bien, réalisée en ligne gratuitement sur agenz.ma");
      console.log(data)
      res.send(data)
      })
  
  };