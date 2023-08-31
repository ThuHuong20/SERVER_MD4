const data = {
    /* Mail */
    hello: "Hi",
    receiverName: "User Name",
    signature: "Have a good day",
    intro: `Thank you for joining the community ${process.env.APP_NAME}! We are very happy about that!`,
    instructionOne: "To verify the email for the account ",
    instructionTwo: " please click on the link below:",
    mailBtnText: "Confirm email",
    outro: "Need help or have questions? Just reply to this email, we'll be happy to help",
    /* api */
    modelErr: "Model err",
    controllerErr: "Controller err",
    userNameDuplicate: "Username already exists",
    emailNameDuplicate: "Emailname already exists",
    registerSucsess: "Register Sucssess",
    /* Middleware */
    ipAcceptDenine: "IP Address Not Accept"
}
export type TextType = typeof data;
export default data