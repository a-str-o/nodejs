const functions = require("firebase-functions");
const express = require('express');
const path = require('path')
const fs = require('fs')

exports.pricing = (req,res) => {
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
        .replace(/__URL__/g, "https://www.agenz.ma/pricing")
        .replace(/___TITLE___/g, "Carte des prix")
          .replace(/__TITLE__/g, "Carte des prix")
          .replace(/__DESCRIPTION__/g, "Retrouvez les prix moyens au m² et les dernières transactions à proximité sur notre carte dynamique des prix");
      console.log(data)
      res.send(data)
      })
  
  };