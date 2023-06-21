

(function(){
  emailjs.init("_GbtDFLFwsEsFwsMA");
})();

const form = document.forms.form;
const name = form.name;
const phone = form.phone;
const mail = form.email;
const btn = form.querySelector('.form__btn');
const inps = form.querySelectorAll('.form__input');

// phone.value = '+380'

function sendMail() {

  const serviseId = 'service_itx9com';
  const templateID = 'template_uoddxgo';

  const params = {
    name: document.querySelector('[name="name"]').value,
    email: document.querySelector('[name="email"]').value,
    phone: document.querySelector('[name="phone"]').value,

    code: document.querySelector('.iti__active').querySelector('.iti__dial-code').textContent,
    country: document.querySelector('.iti__active').querySelector('.iti__country-name').textContent,
  }
  

  
  emailjs.send(serviseId, templateID, params) 
  .then(res => {
    document.querySelector('[name="name"]').value = '';
    document.querySelector('[name="email"]').value = '';
    document.querySelector('[name="phone"]').value = '';

    console.log(res);
    alert('Your message is sent')
  })
  .catch(err => console.log(err));
};


// ---------------- Check Form ----------------------------

function checkMail(mail) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase())
};


form.addEventListener('submit' , e => {
  e.preventDefault();

  const nameVal = name.value;
  const phoneVal = phone.value;
  const mailVal = mail.value;
  const typeName = /[^a-zA-zа-яёА-ЯЁ\s]/.test(nameVal);

  const iti = intlTelInput(phone);
  const number = iti.isValidNumber();
  
  inps.forEach(inp => !inp.value ? inp.classList.add('error-inp') : inp.classList.remove('error-inp') );
  (typeName || !nameVal) ? name.classList.add('error-inp') : name.classList.remove('error-inp');
  (!number || !phoneVal) ? phone.classList.add('error-inp') : phone.classList.remove('error-inp');
  (!checkMail(mailVal)) ? mail.classList.add('error-inp') : mail.classList.remove('error-inp');

  const goodVal = Array.from(inps).some(inp => inp.classList.contains('error-inp'));

  if(!goodVal) {
    sendMail();
  } 

})

//-----------------------Input Form-------------------------------

window.intlTelInput(phone, {
  nationalMode: false,
  autoInsertDialCode: true,

  initialCountry: "auto",
  geoIpLookup: callback => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => callback(data.country_code))
      .catch(() => callback("us"));
  },

  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
  
});

