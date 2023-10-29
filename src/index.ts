import fetch from "node-fetch";
import prompts from "prompts";

(async function main() {
    const prompt = await prompts({
        type: 'text',
        name: 'url',
        message: 'Please enter website url (with http/https): ',
        validate: value => (value as string).toString().match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) ? true : false
    });

    const response = await fetch(prompt.url);
    const body = await response.text();

    const emailRegExp =
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

    const emails = body.match(emailRegExp) || [];

    const uniqueEmails = emails.filter((elem, index, self) => {
        return index === self.indexOf(elem);
    })

    console.log("Emails without job:");
    console.log(uniqueEmails.filter(email => !email.includes("job")))

    console.log("Emails with job:");
    console.log(uniqueEmails.filter(email => email.includes("job")))
})();