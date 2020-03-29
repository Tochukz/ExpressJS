const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');

function sendRequestWithToken() {
    sendRequest(csrfToken);
}

function sendRequestWithoutToken() {
    sendRequest('');
}

/* Function to test CSRF protection */
function sendRequest(token) {
    fetch('/api/csrf-test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-csrf-token': token
        },
        body: JSON.stringify({
            username: document.loginform.username.value,
            password: document.loginform.password.value,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error && data.error.status >= 400) {
          const errorDetails = `<p>Status: ${data.error.status} ${data.error.message} Code: ${data.error.code} </p>
                                <p>Please refresh the page and try again.</p>
                                <p style="display:none">${data.error.stack}</p>`;
          throw new Error(errorDetails);
        } else if (data.error) {
          throw new Error(data.error);
        }

        document.getElementById('formdiv').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('content').innerHTML = data.content + 
                             '<br /><a href="/csrf-fetch-test" class="btn btn-primary">Return</a>';
        document.getElementById('header').innerHTML = data.header;
        console.log(data);
    })
    .catch(err => {
      document.getElementById('error').innerHTML = err.message;
      document.getElementById('error').style.display = 'block';
      console.error(err);
    });
}

/* Function to test the method-override middleware */
function ajaxUpdate(formId) {
   const formInputs = document.querySelectorAll(`[form=${formId}]`);
   const requireFields = ['id', 'name', 'city'];
   const data = {}
   formInputs.forEach(input => {
        if(requireFields.includes(input.name)) {
          data[input.name] = input.value;
        }
    });
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-csrf-token': csrfToken,
            'X-HTTP-Method-Override': 'PUT'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        if (data.error && data.error.status >= 400) {
            const errorDetails = `<p>Status: ${data.error.status} ${data.error.message} Code: ${data.error.code} </p>
                                  <p>Please refresh the page and try again.</p>
                                  <p style="display:none">${data.error.stack}</p>`;
            throw new Error(errorDetails);
        } else if (data.error) {
            throw new Error(data.error);
        } else {
            document.getElementById('success').innerHTML = `<h6>Record Update</h6>
                                                            <p><b>ID</b> ${data.id} </p>
                                                            <p><b>Name</b> ${data.name}</p>
                                                            <p><b>City</b> ${data.city}</p>`;
            document.getElementById('success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('success').style.display = 'none';
            }, 3000);
        }
        
    })
    .catch(err => {
        document.getElementById('error').innerHTML = err;
        document.getElementById('error').style.display = 'block';
        console.error(err)
    });
}