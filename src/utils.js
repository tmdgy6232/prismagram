import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendSecretMail = (adress, secret) => {
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const APIKEY = process.env.MAILGUN_APIKEY;

  const auth = {
    auth: {
      api_key: APIKEY,
      domain: DOMAIN,
    },
  };

  const nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail(
    {
      from: "seulgi@prismagram.com",
      to: adress,
      subject: "Login Secret for Prismagram",
      html: `Hello! Your login secret is <strong>${secret}</strong>. <br/> Copt paste on the app/website to log in`,
    },
    (err, info) => {
      if (err) {
        console.log(`Error : ${err}`);
      } else {
        console.log(`Response : ${info}`);
      }
    }
  );
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
