function qs(element) {
    return document.querySelector(element);
}

window.addEventListener("load", function () {
    let $user = qs("#usuario"),
        $userErrors = qs("#userErrors"),
        $email = qs("#email"),
        $emailErrors = qs("#emailErrors"),
        $postalCode = qs("#postalCode"),
        $postalCodeErrors = qs("#postalCodeErrors"),
        $rol = qs("#rol"),
        $rolErrors = qs("#rolErrors"),
        $form = qs("#formUser"),
        $formErrors =qs('#formErrors'),
        $cancel = qs("#cancel"), 
        regExNumeric = /^[+]?((\d+(\.\d*)?)|(\.\d+))$/,
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

        $user.addEventListener('blur', () => {
            switch (true) {
                case !$user.value.trim():
                    $userErrors.innerText = 'El campo usuario es obligatorio'
                    $user.classList.add('isInvalid')
                    break;
                case !regExAlpha.test($user.value):
                    $userErrors.innerText = 'Debes ingresar un usuario válido'
                    $user.classList.add('isInvalid')
                    break;
    
                default:
                    $user.classList.remove('isInvalid');
                    $user.classList.add('isValid');
                    $userErrors.innerHTML = ""
                    break;
            }
        })

        $email.addEventListener('blur', function () {
            switch (true) {
                case !$email.value.trim():
                    $emailErrors.innerHTML = 'El campo email es obligatorio';
                    $email.classList.add('isInvalid')
                    break;
                case !regExEmail.test($email.value):
                    $emailErrors.innerHTML = 'Debe ingresar un email válido';
                    $email.classList.add('isInvalid')
                    break
                default:
                    $email.classList.remove('isInvalid');
                    $email.classList.add('isValid');
                    $emailErrors.innerHTML = ''
                    break;
            }
        })

    $postalCode.addEventListener("blur", () => {
        switch (true) {
            case !$postalCode.value.trim():
                $postalCodeErrors.innerText =
                    "El campo de código postal no puede estar vacío";
                $postalCode.classList.add("isInvalid");
                break;
            case $postalCode.value.trim().length < 4:
                $postalCodeErrors.innerText = "El código postal debe tener 4 digitos";
                $postalCode.classList.add("isInvalid");
                break;

            case !regExNumeric.test($postalCode.value):
                $postalCodeErrors.innerText = "Debes ingresar caracteres numéricos";
                $postalCode.classList.add("isInvalid");
                break;

            default:
                $postalCode.classList.remove("isInvalid");
                $postalCode.classList.add("isValid");
                $postalCodeErrors.innerHTML = "";
                break;
        }
    })

    $rol.addEventListener('blur', function () {
        if (!$rol.value.trim()) {
            $rolErrors.innerHTML = 'Debe asignarle un rol al usuario';
            $rol.classList.add('isInvalid')
        } else {
            $rol.classList.remove('isInvalid');
            $rol.classList.add('isValid');
            $rolErrors.innerHTML = ''
        }
    })

    $rol.addEventListener('change', function () {
        if (!$rol.value.trim()) {
            $rolErrors.innerHTML = 'Debe asignarle un rol al usuario';
            $rol.classList.add('isInvalid')
        } else {
            $rol.classList.remove('isInvalid');
            $rol.classList.add('isValid');
            $rolErrors.innerHTML = ''
        }
    })

    $form.addEventListener("submit", function (event) {
        event.preventDefault();
        let error = false;
        let elementosForm = this.elements;

        for (let i = 0; i < elementosForm.length - 1; i++) {
            if (
                (elementosForm[i].value == "" &&
                    elementosForm[i].name !== "name" &&
                    elementosForm[i].name !== "lastname" &&
                    elementosForm[i].name !== "telephone" &&
                    elementosForm[i].name !== "direction" &&
                    elementosForm[i].name !== "location" &&
                    elementosForm[i].name !== "country" &&
                    elementosForm[i].name !== "province" &&
                    elementosForm[i] !== $cancel) ||
                elementosForm[i].classList.contains("isInvalid")
            ) {
                elementosForm[i].classList.add("isInvalid");
                $formErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if (!error) {
            console.log("Todo bien");
            $form.submit();
        }
    });
});
