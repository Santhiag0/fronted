import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Buttons from "./components/Buttons";
import SqlEditor from "./components/SqlEditor";
import Table from "./components/Table";

function App(id_database) {
  const [value, setValue] = useState("select * from estudiantes;");
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [query, setQuery] = useState("");
  const [defaults, setDefaults] = useState(1);
  const [csvData, setCSVData] = useState([]);
  const [id, setId] = useState(id_database);

  if (value === "") {
    toast.loading("Esperando Query");
        setValue(
      "-- Escribe aqui tu sentencia SQL."
    );
  }

  useEffect(() => {
    setDefaults(value);
  }, [value]);

  return (
    <div className="App">
    <div className="flex flex-wrap justify-center items-start w-full py-3">
      
      <div className="w-full lg:w-9/12">
        <div className="flex flex-wrap justify-center items-start w-full">
          <div className="w-full lg:w-9/12">
            <div className="flex w-full justify-between">
              <div className="font-bold text-center py-4 w-28 bg-gray-200">
                <p className="text-black">SENTENCIA SQL</p>
              </div>
              <Buttons
                setQuery={setQuery}
                setHeaders={setHeaders}
                setRows={setRows}
                value={value}
                setValue={setValue}
                setCSVData={setCSVData}
                setDefaults={setDefaults}
                defaults={defaults}
                conection={id}
              />
            </div>
            <SqlEditor value={value} setValue={setValue} />
          </div>
        </div>
        <Table query={query} headers={headers} rows={rows} csvData={csvData} />
      </div>
      <Toaster
        position="bottom-left"
        gutter={8}
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
    </div>
  );
}

export default App;
