var Signup = (function() {

    // instance variables
    var
        name,
        email,
        password,
        confirm_password,

        first_requirement,
        second_requirement,
        third_requirement,

        email_regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        upcase_regex = /(?=.*[A-Z])/,
        digits_regex = /(?=.*\d)/,

        valid_border = "1px solid #17D499",
        invalid_border = "1px solid #F79682",
        valid_requirement = "#1FE6A8",
        invalid_requirement = "#F79682"
    ;

    function init() {
        // bind these DOM elements into instance variables
        name = document.getElementById("name");
        email = document.getElementById("email");
        password = document.getElementById("password");
        confirm_password = document.getElementById("confirm_password");
        first_requirement = document.getElementById("first_requirement");
        second_requirement = document.getElementById("second_requirement");
        third_requirement = document.getElementById("third_requirement"); 

        var form = document.getElementById("signup_form");

        form.addEventListener("submit", function(e) {
            return submit(e);
        });

        initialize_onkeyup_validations();
    }

    function verify_name() {
        if (name.value == "") {
            name.style.border = invalid_border;
            return false;
        } else {
            name.style.border = valid_border;
            return true;
        }
    }

    function verify_email() {
        if (email.value == "" || !email.value.match(email_regex)) {
            email.style.border = invalid_border;
            return false;
        } else {
            email.style.border = valid_border;
            return true;
        }
    }

    // renders strength bar
    function render_strength(strength) {
        var
            low = document.getElementById("low"),
            medium = document.getElementById("medium"),
            high = document.getElementById("high"),
            default_color = "#EAEAF4",
            low_color = "#F79682",
            medium_color = "#F7BC1C",
            high_color = "#1FE6A8"
        ;

        if (strength == 0) {
            low.style.background = default_color;
            medium.style.background = default_color;
            high.style.background = default_color;
        } else if (strength == 1) {
            low.style.background = low_color;
            medium.style.background = default_color;
            high.style.background = default_color;
        } else if (strength == 2) {
            low.style.background = medium_color;
            medium.style.background = medium_color;
            high.style.background = default_color;
        } else if (strength == 3) {
            low.style.background = high_color;
            medium.style.background = high_color;
            high.style.background = high_color;
        }
    }

    function verify_password() {

        var strength = 0;

        if (password.value == "") {
            first_requirement.style.color = invalid_requirement;
            second_requirement.style.color = invalid_requirement;
            third_requirement.style.color = invalid_requirement;
        }

        // at least six chars
        if (password.value.length >= 6) {
            first_requirement.style.color = valid_requirement;
            strength++;
        } else {
            first_requirement.style.color = invalid_requirement;
        }

        // at least one upcase letter
        if (password.value.match(upcase_regex)) {
            second_requirement.style.color = valid_requirement;
            strength++;
        } else {
            second_requirement.style.color = invalid_requirement;
        }

        // at least one digit
        if (password.value.match(digits_regex)) {
            third_requirement.style.color = valid_requirement;
            strength++;
        } else {
            third_requirement.style.color = invalid_requirement;
        }

        // strength bar fn
        render_strength(strength);

        // returns in order to allow validation
        if (password.value.length >= 6 && password.value.match(upcase_regex) && password.value.match(digits_regex)) {
            password.style.border = valid_border;
            return true;
        } else {
            password.style.border = invalid_border;
            return false;
        }
    }

    function verify_confirm_password() {
        if (confirm_password.value == password.value && confirm_password.value.length >= 6 && confirm_password.value.match(upcase_regex) && confirm_password.value.match(digits_regex)) {
            confirm_password.style.border = valid_border;
            return true;
        } else {
            confirm_password.style.border = invalid_border;
            return false;
        }
    }

    // this will mark as valid or invalid on "keyup" event of elements
    function initialize_onkeyup_validations() {

        // validates Name
        name.addEventListener("keyup", function() {
            verify_name();
        });

        email.addEventListener("keyup", function() {
            verify_email();
        });

        password.addEventListener("keyup", function() {
            verify_password();
        });

        confirm_password.addEventListener("keyup", function() {
            verify_confirm_password();
        });

    }


    function submit(e) {
        verify_name();
        verify_email();
        verify_password();
        verify_confirm_password();

        var valid = verify_name() && verify_email() && verify_password() && verify_confirm_password();

        

        if (valid) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    }  

    return {
        init: init
    }

})();

Signup.init();