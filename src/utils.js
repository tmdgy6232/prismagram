import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendSecretMail = (adress, secret) => {
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const APIKEY = process.env.MAILGUN_APIKEY;
  const option = {
    apiKey: APIKEY,
    domain: DOMAIN,
    auth: {
      apiKey: APIKEY,
      domain: DOMAIN,
    },
  };
  const mg = mailgun(option);
  const data = {
    from: "seulgi@prismagram.com",
    to: adress,
    subject: "Login Secret for Prismagram",
    html: `Hello! Your login secret it ${secret}. <br/> Copt paste on the app/website to log in`,
  };
  const sendMail = () => {
    mg.messages().send(data, function(error, body) {
      console.log(body);
    });
  };
  return sendMail;
};
