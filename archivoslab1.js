//modulos y paquetes necesarios
const readLineSync = require("readline-sync");
const fs = require("fs");
const XLSX = require("xlsx");

//comienzo del programa
const opt = readLineSync.question(
  `Bienvenid@, elija una opcion:
      1)Leer un archivo
      2)Crear un archivo 
      3)Convertir formato de un archivo:
      `
);

//Lectura de archivo
if (opt === "1") {
  fileName = readLineSync.question(
    "Coloque el archivo en la carpeta raiz y escriba su nombre con extension en consola: "
  );
  const fileContent = fs.readFileSync(fileName);
  console.log(fileContent.toString());

//Creacion de archivo
} else if (opt === "2") {
  fileName = readLineSync.question("Escriba el nombre de su archivo: ");
  console.log(`--------------------------------------------------
                  Indicaciones:
                  1. Para terminar la linea y realizar un salto pulse enter.
                  2. Para terminar de escribir el contenido del archivos escriba: .saveandexit.
                  ----------------------------------------------------
                  `);
  newLine = "";
  content = "";
  while (newLine !== ".saveandexit.") {
    newLine = readLineSync.question("");
    //evitar que se añada .saveandexit. al contenido
    if (newLine !== ".saveandexit.") {
      content += newLine + "\n";
    }
  }

  //se guarda el contenido en el archivo
  fileToWrite = fileName + ".txt";
  fs.writeFile(fileToWrite, content, (err) => {
    if (err) throw err;

    console.log(`Archivo ${fileToWrite} guardado exitosamente :)`);
  });


  //conversiones
} else if (opt === "3") {
  console.log(`-----------------------------------------------------------
  Coloque el archivo que desee transformar en el directorio raiz del proyecto
  -----------------------------------------------------------`);
  const conversOpt = readLineSync.question(`Elija una conversion:
  1)xlsx a csv
  2)csv a xlsx
  3)json a xlsx
  4)json a csv
  5)xlsx a json
  6)csv a json
  `);

  const inputFilename = readLineSync.question(
    "Escriba el nombre del archivo que desea convertir sin extension: "
  );
  const outputFilename = readLineSync.question(
    "Escriba el nombre del nuevo archivo sin extension: "
  );

  if (conversOpt === "1") {
    const workBook = XLSX.readFile(inputFilename + ".xlsx");
    XLSX.writeFile(workBook, outputFilename + ".csv", { bookType: "csv" });
    console.log(`Archivo ${outputFilename} guardado exitosamente :)`);

  } else if (conversOpt === "2") {
    const workBook = XLSX.readFile(inputFilename + ".csv");
    XLSX.writeFile(workBook, outputFilename + ".xlsx", { bookType: "xlsx" });
    console.log(`Archivo ${outputFilename} guardado exitosamente :)`);

  } else if (conversOpt === "3") {
    var data = require("./" + inputFilename + ".json");
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Hoja1");
    XLSX.writeFile(workBook, outputFilename + ".xlsx");
    console.log(`Archivo ${outputFilename} guardado exitosamente :)`);

  } else if (conversOpt === "4") {
    var data = require("./" + inputFilename + ".json");
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Hoja1");
    XLSX.writeFile(workBook, outputFilename + ".csv", { bookType: "csv" });
    console.log(`Archivo ${outputFilename} guardado exitosamente :)`);

  } else if (conversOpt === "5") {
    const workBook = XLSX.readFile(inputFilename + ".xlsx");
    var jsonData = XLSX.utils.sheet_to_json(
      workBook.Sheets[workBook.SheetNames[0]]
    );
    fs.writeFile(outputFilename + ".json", JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      console.log(`Archivo ${outputFilename} guardado exitosamente :)`);
    });

  } else if (conversOpt === "6") {
    const workBook = XLSX.readFile(inputFilename + ".csv");
    var jsonData = XLSX.utils.sheet_to_json(
      workBook.Sheets[workBook.SheetNames[0]]
    );
    fs.writeFile(outputFilename + ".json", JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      console.log(`Archivo ${outputFilename} guardado exitosamente :)`);
    });
  } else {
    console.log("Error: por favor seleccione una opción válida");
  }
} else {
  console.log("Error: por favor seleccione una opción válida");
}
