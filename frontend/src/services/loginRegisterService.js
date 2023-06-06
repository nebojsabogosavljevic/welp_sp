const axios = require("axios");

export default {
    async login(username, password, userType) {
      const config = {
        method: 'POST',
        url: `http://localhost:8000/login/${userType}`,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            username: username,
            password: password,
        })
      };

      const response = await axios.request(config);
      return response.data;
    },
    async registerEmployee(name, surname, username, password, email, phone, city, country, address, idCardNumber, citizenship, languages) {
        const config = {
            method: 'POST',
            url: 'http://localhost:8000/register/employee',
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                name: name,
                surname: surname,
                username: username,
                password: password,
                email: email,
                phone: phone,
                city: city,
                country: country,
                address: address,
                idCardNumber: idCardNumber,
                citizenship: citizenship,
                languages: languages
            })
        };
      let response = await axios.request(config);
      console.log("asdasd", response);
      return response.data;
    },
    async registerEmployer(name, surname, username, password, email, phone, city, country, address) {
      const config = {
          method: 'POST',
          url: 'http://localhost:8000/register/employer',
          headers: {
              "Content-Type": "application/json",
          },
          data: JSON.stringify({
              name: name,
              surname: surname,
              username: username,
              password: password,
              email: email,
              phone: phone,
              city: city,
              country: country,
              address: address
          })
      };
    let response = await axios.request(config);
    console.log(response.data);
    return response.data;
  }
    
  }
  