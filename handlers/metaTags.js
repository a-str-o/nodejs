const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 5000;

exports.metaTag = (req,res) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log(req)
  const filePath = path.resolve(__dirname, "../../build", "index.html");
  console.log(filePath)
  res.set('Access-Control-Allow-Origin', '*');


    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
  
      data = data
      .replace(/__URL__/g, "https://www.agenz.ma/pricing")
        .replace(/__TITLE__/g, "Carte des prix")
        .replace(/__DESCRIPTION__/g, "Retrouvez les prix moyens au m² et les dernières transactions à proximité sur notre carte dynamique des prix");
    console.log(data)
    res.send(data)
    })

}
