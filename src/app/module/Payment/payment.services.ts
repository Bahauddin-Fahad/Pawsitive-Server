/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from 'path';
import { readFileSync } from 'fs';
import { verifyPayment } from '../../utils/payment';
import { ModelUser } from '../User/user.model';

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await ModelUser.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'Paid',
      },
      {
        new: true,
      },
    );
    message = 'Your payment has been successfully processed!';
  } else {
    message = 'Payment Failed!';
  }

  const filePath = join(__dirname, '../../../../confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
