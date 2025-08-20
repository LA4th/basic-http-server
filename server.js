import http from "http";

const port = 3000;
const host = `http://localhost:${port}/`;
let notes = [];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  // GET METHOD (Gets all notes)
  if(req.method === "GET" && req.url === "/notes") {
    res.writeHead(200);
    res.end(JSON.stringify(notes));
  }
  // POST DATA (Create notes)
  else if(req.method === "POST" && req.url === "/notes") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const note = JSON.parse(body);
        note.id = Date.now();
        notes.push(note);

        res.writeHead(201);
        res.end(JSON.stringify({message: "Add notes!", note}));
      } catch(err) {
        res.writeHead(404);
        res.end(JSON.stringify({erro: "Invalid JSON format"}));
      }
    });
  }
  // PUT DATA (Update note "PUT /notes/:id")
  else if(req.method === "PUT" && req.url.startsWith("/notes/")) {
    const id =parseInt(req.url.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const updated = JSON.parse(body);
        let note = notes.find((n) => {
          n.id === id;
        });
        if(!note) {
          res.writeHead(404);
          return res.end(JSON.stringify({error: "Note not found"}));
        }
        note.title = updated.title || note.title;
        note.content = updated.content || note.content;
        
        res.writeHead(200);
        res.end(JSON.stringify({message: "Note updated!"}));
      } 
      catch(err) {
        res.writeHead(404);
        res.end(JSON.stringify({error: "Invalid JSON format"}));
      }
    });
  }
});