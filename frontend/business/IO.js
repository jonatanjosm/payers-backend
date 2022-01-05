/**
 * IO
 */
export class IO {
    static urlbase = 'http://localhost:3030/api/';
    static token = null;
    /**
     * Filtro para las peticiones
     * @param {*} data
     * @param {*} name
     * @param {*} method
     */
    static query(data, name, method) {
      return new Promise((resolve, reject) => {
        let response = IO.fetch(data, name, method);
        response.then((response) => {
          if (response) {
            resolve(response);
          } else {
            resolve([]);
          }
        });
      });
    }
    /**
     * Generar la petición REST
     * @param {*} data
     * @param {*} name
     * @param {*} method
     */
    static fetch(data, name, method) {
      let headers = {
        'Content-Type': 'application/json',
      };
  
      if (IO.token) {
        headers.token = IO.token;
      }
      
      return new Promise((resolveRequest) => {
        let query = {
          method: method,
          headers: headers,
        };
  
        console.log(data);
  
        if (data != null) {
          query.body = JSON.stringify(data);
        }
        console.log(`${IO.urlbase}${name}`);

        fetch(`${IO.urlbase}${name}`, query)
          .then((response) => {
            if (response.status == 403) {
              resolveRequest({error: response.status});
              console.log('Error 403');
            }
            if (response.status === 400) {
              resolveRequest({error: response.status, response: response});
              console.log('Error 400');
            } else {
              try {
                var responseData = response.json();
  
                responseData.then((responsejson) => {
                  if (responsejson) {
                    resolveRequest(responsejson);
                  }
                  resolveRequest({});
                });
              } catch (err) {
                console.error('error haciendo parse de la respuesta', err);
              }
            }
          })
          .catch(function (err) {
            console.error('error peticion', err);
          });
      });
    }

}
  