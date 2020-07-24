/** Dropzone configuration */
Dropzone.options.myDropForm = {
    paramName: 'profile',
    maxFilesize: 10, // 10MB
    accept: function(file, done) {
        if (file.name == "justinbieber.jpg") {
           done("Naha, you don't.");
        }
        else { done(); }
    }
}

/** Using native fetch API */
var fileUpload = document.querySelector("#fileUpload");
fileUpload.addEventListener("dragover", function(e){ e.preventDefault()});
fileUpload.addEventListener("drop", readFile, false);

function readFile(event){
    event.stopPropagation(); //Stops some browser from redirecting.
    event.preventDefault();
    
    const filelist = event.dataTransfer.files;
    const file = filelist[0];
    const formData = new FormData();
    formData.append('profile', file);
    fetch('/fileupload', {
        method: 'post',
        body: formData,
    })
    .then(res => res.text())
    .then(data => {
      $('#result').addClass('text-success');
      $('#result').text(data.toString());
    })
    .catch(err => {
      $('#result').addClass('text-danger');
      $('#result').text(err.toString());
    });
}

function uploadFetch() {
    const profileFile =  document.querySelector('#profile'); 
    const formData = new FormData();
    formData.append('profile', profileFile.files[0]);

    fetch('/fileupload', {
        method: 'post',
        body: formData,
      })
      .then(res => { 
        return res.text();
      })
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);
        $('#alert').text(data.toString());       
        $('#alert').addClass('text-success');
      })
      .catch(function (error) {
        console.error('Request failed', error);
        $('#alert').text(error.toString());
        $('#alert').addClass('text-danger');
      })
}