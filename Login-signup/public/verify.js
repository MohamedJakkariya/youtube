const verifyOtpForm = document.getElementById('verifyOtpForm');
const otp_input = document.getElementById('otp');

const notify_div = document.querySelector('.notify');
const notify_message_p = document.querySelector('.notify .message');

verifyOtpForm.addEventListener('submit', e => {
  e.preventDefault();

  const customer_id = window.localStorage.getItem('customer_id');

  fetch('/user/otp/verify', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customer_id,
      otp: +otp_input.value
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

      // TODO: Show response
      notify_message_p.innerHTML = res.message;

      notify_div.classList.remove('error');
      notify_div.classList.add('success');

      console.log(res);

      window.location = '/dashboard';
    });
});
