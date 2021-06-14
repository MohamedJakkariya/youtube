const askOtpForm = document.getElementById('askOtpForm');

const country_code_input = document.getElementById('country_code');
const phone_input = document.getElementById('phone');

const notify_div = document.querySelector('.notify');
const notify_message_p = document.querySelector('.notify .message');

askOtpForm.addEventListener('submit', e => {
  e.preventDefault();

  fetch('/user/otp/send', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country_code: country_code_input.value,
      phone: phone_input.value
    })
  })
    .then(res => res.json())
    .then(res => {
      notify_div.classList.add('show');
      if (!res.result) {
        notify_message_p.innerHTML = res.error;
        notify_div.classList.add('error');
        return;
      }

      notify_message_p.innerHTML = res.message;

      notify_div.classList.remove('error');
      notify_div.classList.add('success');

      console.log(res);

      window.localStorage.setItem('customer_id', res.data.customer_id);

      setTimeout(() => {
        window.location.pathname = '/verify';
      }, 1000);
    });
});
