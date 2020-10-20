const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// Show input error msg
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid')
    }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() == '') {
            showError(input, `${getFeildName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

// Check input length 
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input, `${getFeildName(input)} must be at lease ${min} characters`
        )
    } else if (input.value.length > max) {
        showError(
            input, `${getFeildName(input)} must be less than ${max} characters`
        )
    } else {
        showSuccess(input)
    }
}

// Check passwords match 
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

// Get fieldname
// Create func 'getFeildName' with input param of 'input'
function getFeildName(input) {
    // return the captialized first character of the input id + the remaining character of the input id
    // example result = Username
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault()

    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    checkPasswordsMatch(password, password2)
})