'use strict';

$(document).ready(function() {

  $("#myDropzone").dropzone({ url: "index.html" });
//   Dropzone.options.myDropzone= {
//     // url: 'upload.php',
//     url: 'index.html',
//     autoProcessQueue: false,
//     uploadMultiple: true,
//     parallelUploads: 5,
//     maxFiles: 5,
//     maxFilesize: 1,
//     acceptedFiles: '.doc, .pdf',
//     addRemoveLinks: true,
//     thumbnailWidth: 50,
//     thumbnailHeight: 50,
//     init: function() {
//         dzClosure = this; // Makes sure that 'this' is understood inside the functions below.

//         // for Dropzone to process the queue (instead of default form behavior):
//         document.getElementById("px-submit").addEventListener("click", function(e) {
//             // Make sure that the form isn't actually being sent.
//             e.preventDefault();
//             e.stopPropagation();
//             dzClosure.processQueue();
//         });

//         //send all the form data along with the files:
//         this.on("sendingmultiple", function(data, xhr, formData) {
//             formData.append("job_name", jQuery("#job_name").val());
//             formData.append("job_position", jQuery("#job_position").val());
//             formData.append("job_phone", jQuery("#job_phone").val());
//             formData.append("job_email", jQuery("#job_email").val());
//         });
//     }
// }

  var required = ['name', 'phone', 'job_name', 'job_position', 'job_phone', 'job_email'];

  var errorsTexts = 
  {
    email: 'Введите e-mail в формате ivanov@gmail.com',
    phone: 'Введите номер телефона в формате +65765766700',
    job_email: 'Введите e-mail в формате ivanov@gmail.com',
    job_phone: 'Введите номер телефона в формате +65765766700'
  };

  var setErrors = function(array) {
      
    $.each(array, function(index, val) {
      $('#valid-' + index).text(val);
      $('#' + index).addClass('input_error');
    })
  };

  var removeErrors = function() {
    $('.error-text').text('');
    $('input').removeClass('input_error');
  };

  var setError = function(fieldName) {
    $('#valid-' + fieldName).text(errorsTexts[fieldName]);
    $('#' + fieldName).addClass('input_error');
  }

  var setErrorForRequiredField = function(fieldName) {
    $('#valid-' + fieldName).text('Это обязательное поле');
    $('#' + fieldName).addClass('input_error');
  }

  var removeError = function(fieldName) {
    $('#valid-' + fieldName).text('');
    $('#' + fieldName).removeClass('input_error');
  };

  var validatePhoneNumber = function (value) {
    var array = value.split('+');

    if (array.length === 2 &&
        array[1].search('[0-9]{11}') === 0) {
      return true;
    } else {
      return false;
    }
  };

  $('input').blur(function() {
    var value = $(this).val();
    var name = $(this)[0].name;

    if (value !== '') {

      if (name === 'phone') {
        validatePhoneNumber(value) ? removeError(name) : setError(name);
      } else if (name === 'job_phone') {
        validatePhoneNumber(value) ? removeError(name) : setError(name);
      } else {
        removeError(name);
      }
    } else {
      $.each(required, function(index, val) {
        name == val ? setErrorForRequiredField(name) : '';
      })
    }
    
  });

  $('#application__form').submit(function(event) {
    var errors = {};
    var data = {};
    removeErrors();

    $(this).find('input').each(function() {
      data[$(this)[0].name] = $(this).val();
    })

    $.each(required, function(index, val) {
      if (data[val] === '') {
        errors[val] = 'Это обязательное поле';
      }
    })

    if (data['phone'] !== '') {
      var value = data['phone'];
      validatePhoneNumber(value) ? '' : errors['phone'] = 'Введите номер телефона в формате +65765766700';
    }

    if (!$.isEmptyObject(errors)) {
      setErrors(errors);
      event.preventDefault();
    } else {
    
    }
    
  });

  $('#job__form').submit(function(event) {
    var errors = {};
    var data = {};
    removeErrors();

    $(this).find('input').each(function() {
      data[$(this)[0].name] = $(this).val();
    })

    $.each(required, function(index, val) {
      if (data[val] === '') {
        errors[val] = 'Это обязательное поле';
      }
    })

    if (data['job_phone'] !== '') {
      var value = data['job_phone'];
      validatePhoneNumber(value) ? '' : errors['job_phone'] = 'Введите номер телефона в формате +65765766700';
    }

    if (!$.isEmptyObject(errors)) {
      setErrors(errors);
      event.preventDefault();
    } else {
      
    }
    
  });

});