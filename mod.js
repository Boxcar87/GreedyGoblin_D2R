const fs = require('fs');
const path = require('path');

const Files = getFilesRecursively('./data');
for (const file of Files){
  let jsonData = D2RMM.readJson(file)
  file = file.slice(6)
  D2RMM.writeJson(file, jsonData);
}

function getFilesRecursively(directory) {
  let files = [];
  const entries = fs.readdirSync(directory); // Reads the current directory's entries

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry); // Joins the directory path with the entry name
    const stat = fs.statSync(absolutePath); // Gets file statistics

    if (stat.isDirectory()) {
      files.push(...getFilesRecursively(absolutePath)); // Recursively call the function for subdirectories
    } else {
      files.push(absolutePath); // Add the file path to the list
    }
  }

  return files;
}