import Cookies from "js-cookie";

export default async function GetTableInfo(data) {
  let infoStore = null;

if (data === 5) {
    async function fetchData() {
      const response = await fetch(
        "http://localhost/A/controllers/apiEstudiantes.php?server=localhost&db=universidad&user=root&psw="
      );
      const data1 = await response.json();
      // Verificar si data1 tiene elementos
      if (data1 && data1.length > 0) {
        // Crear un objeto con los nombres de los campos
        const fieldNames = Object.keys(data1[0]).reduce((obj, key) => {
          obj[key] = key;
          return obj;
        }, {});
        // Insertar el objeto al principio del array data1
        data1.unshift(fieldNames);
      }

      return data1;
    }
    infoStore = await fetchData();
  } else {
    async function fetchData() {
      let enco = encodeURIComponent(data);
      let string =
        "https://reposteador.onrender.com/database-connection/"+Cookies.get("id-con")+"/query?query=" + enco+"&type=mysql";
      const response = await fetch(string);
      const data1 = await response.json();
      console.log(Cookies.get("id-con"));
      // Verificar si data1 tiene elementos
      if (data1 && data1.length > 0) {
        // Crear un objeto con los nombres de los campos
        const fieldNames = Object.keys(data1[0]).reduce((obj, key) => {
          obj[key] = key;
          return obj;
        }, {});
        // Insertar el objeto al principio del array data1
        data1.unshift(fieldNames);
      }

      return data1;
    }
    infoStore = await fetchData();
  }

  if (!infoStore) {
    throw new Error("No data found");
  }

  let tableHeaders = [];
  let tableRows = [];
  for (var i = 0; i < infoStore.length; i++) {
    const row = infoStore[i];
    if (i === 0) {
      for (const item in row) {
        tableHeaders.push(row[item]);
      }
    } else {
      let temp = [];
      for (const item in row) {
        temp.push(row[item]);
      }
      tableRows.push(temp);
    }
  }
  return { tableHeaders, tableRows };
}
