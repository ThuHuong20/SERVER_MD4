import Mailgen from 'mailgen';

interface MailBody {
    productName: string;
    productWebUrl: string;
    receiverName: string;
    confirmLink: string;
}

function genEmailString(mailBody: MailBody) {
    let mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: mailBody.productName,
            link: mailBody.productWebUrl
        }
    });

    let email = {
        body: {
            name: 'John Appleseed',
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#DC4D2F',
                    text: 'Reset your password',
                    link: 'https://mailgen.js/reset?s=b350163a1a010d9729feb74992c1a010'
                }
            },
            outro: 'If you did not request a password reset, no further action is required on your part.'
        }
    };

    return mailGenerator.generate(email);
}

export default genEmailString;