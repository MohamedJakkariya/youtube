const router = require('express').Router();
const usersJson = require('../json/users.json');
const { nanoid } = require('nanoid');

const users = usersJson;

/**
 * @description To send otp to customers
 * @access public
 */
router.post('/otp/send', (req, res) => {
  const { country_code, phone } = req.body;

  // ! Validations
  if (!country_code || !phone) return res.status(400).json({ error: 'Fill all the fields.', result: false });

  console.log('users : ', users);

  const check_user = users.filter(user => user.phone === phone && user.country_code === country_code);

  // TODO: Generate new otp
  const otp = Math.floor(Math.random() * 10000 + 10000);
  const new_customer_id = nanoid(6);

  // TODO: Check user for insertion
  if (!check_user.length) {
    const new_user = {
      id: new_customer_id,
      phone,
      country_code,
      otp,
      is_verified: false,
      name: 'user'
    };

    users.push(new_user);
  }

  // TODO: Use some third party service to send the otp. Ex. twilio
  // twilio.sendSms(otp)

  console.log('Users : ', users);

  return res.status(200).json({
    result: true,
    message: 'Verification code sent successfully.',
    data: {
      customer_id: new_customer_id,
      sms: `Your verification code is ${otp}`
    }
  });
});

/**
 * @description To verify the customer otp
 * @access public
 */
router.post('/otp/verify', (req, res) => {
  const { otp, customer_id } = req.body;

  // ! Validations
  if (!otp || !customer_id) return res.status(400).json({ error: 'Fill all the fields.', result: false });

  const check_user = users.filter(user => user.otp === otp && user.id === customer_id);

  // TODO: Check user for insertion
  if (!check_user.length) return res.status(400).json({ error: 'Invalid otp.', result: false });

  //   TODO: Find index of specific object using findIndex method.
  const objIndex = users.findIndex(obj => obj.id == check_user[0].id);

  console.log('Before udpate : ', users[objIndex]);

  // TODO: Update verification status
  users[objIndex].is_verified = true;

  console.log('After udpate : ', users[objIndex]);

  return res.status(200).json({ message: 'Verification successfully.', result: true });
});

module.exports = router;
