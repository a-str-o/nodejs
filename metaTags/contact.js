const functions = require("firebase-functions");
const express = require('express');
const path = require('path')
const fs = require('fs')
const cors = require('cors');
const corsHandler = cors({origin: true});


exports.contact= (req,res) => {
//   if (req.method === 'OPTIONS') {
//     res.end();
//  }
  corsHandler(req,res, () =>{
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Max-Age', '3600');
    console.log(res.hasHeader('Access-Control-Allow-Origin'))
    console.log(res.getHeader('Access-Control-Allow-Origin'))


    const filePath = path.resolve(__dirname, "./../../build", "index.html");
    console.log(filePath)
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.send(err)
        }
        else {
    
        data = data
        .replace(/__URL__/g, "https://www.agenz.ma/contact")
        .replace(/___TITLE___/g, "Contact")
          .replace(/__TITLE__/g, "Contact")
          .replace(/__DESCRIPTION__/g, "Contactez agenz, leader de l'estimation immobilière en ligne au maroc");
      console.log(data)
      res.send(data)  }
      })
   
    });
  
  };