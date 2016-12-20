dronedeploy.onload(function(){
  console.log('DroneDeploy Api: ', dronedeploy);
});

//Expandable section
var isExpanded = false;
  var upArrow = 'https://s3.amazonaws.com/drone-deploy-plugins/templates/login-example-imgs/arrow-up.svg';
  var downArrow = 'https://s3.amazonaws.com/drone-deploy-plugins/templates/login-example-imgs/arrow-down.svg';
  var expandArrow = document.querySelector('.expand-arrow');
  var expandBody = document.querySelector('.expand-section');
  var expandRow = document.querySelector('.expand-row');

  expandRow.addEventListener('click', function(){
    isExpanded = !isExpanded
    if (isExpanded){
      expandArrow.src = upArrow;
      expandBody.style.display = 'block';
    } else{
      expandArrow.src = downArrow;
      expandBody.style.display = 'none';
    }
  });

  // File path update
  var fileInputEvent = document.querySelector('.file-field input[type="file"]');
  var fileInputPath = document.querySelector('input.file-path');

  fileInputEvent.addEventListener('change', function(e) {
    var file = e.target.files[0];
    var file_name = file.name;
    fileInputPath.value = file_name;
  }); //fileInputEvent
