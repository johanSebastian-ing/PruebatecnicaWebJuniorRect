import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const baseurl = 'http://localhost:5153/api/employee';
  const [data, setData] = useState([]);
  const [documentoError, setDocumentoError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    documento: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
    genero: '',
  });
  const [searchCriteria, setSearchCriteria] = useState('');
  const [selectedOption, setSelectedOption] = useState('registrar');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'documento') {
      if (!/^[0-9]*$/.test(value)) {
        setDocumentoError(true);
      } else {
        setDocumentoError(false);
      }
    }
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleSearchInputChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const peticionesGet = async () => {
    try {
      const response = await axios.get(baseurl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const peticionesPost = async () => {
    try {
      if (!validateEmail(newEmployee.email)) {
        setEmailError(true);
        return;
      }
      const response = await axios.post(baseurl, newEmployee);
      setData([...data, response.data]);
      setNewEmployee({
        documento: '',
        nombre: '',
        apellidos: '',
        telefono: '',
        email: '',
        direccion: '',
        genero: '',
      });
      console.log('Empleado registrado exitosamente.');
     
    } catch (error) {
      console.log('Error al registrar empleado:', error);
    }
  };

  const searchEmployees = async () => {
    try {
      const response = await axios.post(
        `${baseurl}/search`,
        JSON.stringify(searchCriteria),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log('Error al buscar empleados:', error);
    }
  };

  const toggleOption = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  return (
    <div>
     
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Ing Sebastian Quilindo</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={`nav-link ${selectedOption === 'registrar' && 'active'}`}
                href="#"
                onClick={() => toggleOption('registrar')}
              >
                Registrar
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${selectedOption === 'filtrar' && 'active'}`}
                href="#"
                onClick={() => toggleOption('filtrar')}
              >
                Filtrar por Búsqueda
              </a>
            </li>
          </ul>
        </div>
      </nav>

   
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-12">
            {selectedOption === 'registrar' && (
              <div>
                
                <form
                  style={{
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.2)',
                  
                
                  
                    maxWidth: '300px',
                    
                    margin: '0 auto',
                  }}
                >
                  <div className="form-group">
                    <label>Documento:</label>
                    <div>
                      <input
                        type="text"
                        name="documento"
                        className="form-control"
                        style={{ width: '250px' }}
                        onChange={handleInputChange}
                        value={newEmployee.documento}
                        pattern="[0-9]*"
                      />
                    </div>
                  </div>

                  {documentoError && (
                    <div className="alert alert-danger">
                      El campo documento debe contener solo números.
                    </div>
                  )}

                  <div className="form-group">
                    <label>Nombre:</label>
                    <div>
                      <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        style={{ width: '250px' }}
                        onChange={handleInputChange}
                        value={newEmployee.nombre}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Apellidos:</label>
                    <div>
                      <input
                        type="text"
                        name="apellidos"
                        className="form-control"
                        style={{ width: '250px' }}
                        onChange={handleInputChange}
                        value={newEmployee.apellidos}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Teléfono:</label>
                    <div>
                      <input
                        type="text"
                        name="telefono"
                        className="form-control"
                        style={{ width: '250px' }}
                        onChange={handleInputChange}
                        value={newEmployee.telefono}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>E-Mail:</label>
                    <div>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        style={{ width: '250px' }}
                        onChange={handleInputChange}
                        value={newEmployee.email}
                      />
                    </div>
                  </div>

                  {emailError && (
                    <div className="alert alert-danger">
                      El correo electrónico no es válido.
                    </div>
                  )}

                  <div className="form-group">
                    <label>Dirección:</label>
                    <div>
                      <input
                        type="text"
                        name="direccion"
                        className="form-control"
                        style={{ width: '250px' }}
                        onChange={handleInputChange}
                        value={newEmployee.direccion}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Género:</label>
                    <div>
                      <input
                        type="text"
                        name="genero"
                        className="form-control"
                        style={{ width: '250px' }}
                        onChange={handleInputChange}
                        value={newEmployee.genero}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: '10px' }}
                        onClick={peticionesPost}
                      >
                        Registrar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {selectedOption === 'filtrar' && (
              <div>
                <h2>Filtrar por Búsqueda</h2>
                <div className="form-group">
                  <input
                    type="text"
                    name="searchCriteria"
                    className="form-control"
                    style={{ width: '200px' }}
                    placeholder="Criterio de búsqueda"
                    value={searchCriteria}
                    onChange={handleSearchInputChange}
                  />

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={searchEmployees}
                  >
                    Buscar
                  </button>
                </div>

                <h2>Lista de Empleados</h2>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>EmployeeID</th>
                      <th>Documento</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Teléfono</th>
                      <th>Email</th>
                      <th>Dirección</th>
                      <th>Género</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((employee) => (
                      <tr key={employee.employeeID}>
                        <td>{employee.employeeID}</td>
                        <td>{employee.documento}</td>
                        <td>{employee.nombre}</td>
                        <td>{employee.apellidos}</td>
                        <td>{employee.telefono}</td>
                        <td>{employee.email}</td>
                        <td>{employee.direccion}</td>
                        <td>{employee.genero}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

    <div></div>
      <footer className="bg-dark text-light text-center py-2">
        <p>Pie de Página</p>
      </footer>
    </div>
  );
}

export default App;
