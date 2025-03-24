import { ChemicalServer } from "chemicaljs";
import express from "express";
import httpProxy from "http-proxy";
import path from "node:path";
import compression from "compression";

const cdnProxy = httpProxy.createProxyServer();
const [app, listen] = new ChemicalServer({
  default: 'uv',
  uv: true,
  scramjet: true,
  rh: true
});
const port = process.env.PORT || 8181;

app.disable("x-powered-by");

app.use(
  express.static("dist", {
    index: "index.html",
    extensions: ["html"],
  })
);
app.use(compression());
app.serveChemical();

app.use("/cdn", (req, res) => {
  cdnProxy.web(req, res, {
    target: "https://gms.parcoil.com/",
    changeOrigin: true,
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

app.use((req, res) => {
  res.status(404);
  res.send("404 Error");
});

listen(port, () => {
  console.log(`Starlight Running on port: ${port}`);
});
